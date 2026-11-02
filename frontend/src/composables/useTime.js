import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment'
import { io } from 'socket.io-client'

export function useTime() {
  const isLoading = ref(true)
  const currentTime = ref(moment().format('HH:mm:ss'))
  const currentZone = ref(moment().format('zz'))
  const savedTimes = ref([])
  const toast = ref({ show: false, message: '', type: 'success' })
  
  let timer = null
  let socket = null

  const showToast = (message, type = 'success') => {
    toast.value = { show: true, message, type }
    setTimeout(() => { toast.value.show = false }, 3000)
  }

  onMounted(async () => {
    timer = setInterval(() => {
      currentTime.value = moment().format('HH:mm:ss')
    }, 1000)

    try {
      const res = await fetch('/api/times')
      const json = await res.json()
      if (json.length) savedTimes.value = json
    } catch (e) {
      showToast('Ошибка загрузки данных', 'error')
    }

    socket = io({
      path: '/api/socket.io',
      transports: ['websocket', 'polling']
    })

    socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    socket.on('time_added', (newRecord) => {
      if (!savedTimes.value.find(t => t.id === newRecord.id)) {
        savedTimes.value.unshift(newRecord)
        showToast(`Новое время ${newRecord.time} добавлено`, 'success')
      }
    })

    socket.on('time_deleted', (deletedId) => {
      savedTimes.value = savedTimes.value.filter(t => t.id !== Number(deletedId))
    })
  })

  onUnmounted(() => {
    clearInterval(timer)
    if (socket) socket.disconnect()
  })
  
  const saveTime = async () => {
    const time = currentTime.value
    try {
      await fetch('/api/times', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time }),
      })
    } catch (e) {
      showToast('Ошибка сохранения', 'error')
    }
  }

  const deleteTime = async (id) => {
    try {
      await fetch(`/api/time/${id}`, { method: 'DELETE' })
    } catch (e) {
      showToast('Ошибка удаления', 'error')
    }
  }

  return { currentTime, currentZone, savedTimes, toast, saveTime, deleteTime }
}