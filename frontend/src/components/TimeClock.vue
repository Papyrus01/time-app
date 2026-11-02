<script setup>
import moment from 'moment'

defineProps({
  currentTime: String,
  currentZone: String,
  toast: Object
})

defineEmits(['save'])
</script>

<template>
  <div class="flex flex-col items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative h-full">
    
    <!-- Тост -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="translate-y-2 opacity-0" enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="toast.show" 
           class="absolute top-4 left-4 right-4 p-3 rounded-xl text-sm text-center font-medium shadow-2xl border backdrop-blur-xl flex items-center justify-center gap-2 text-white transition-all"
           :class="toast.type === 'success' ? 'bg-sky-500/80 border-sky-400/50 shadow-sky-500/20' : 'bg-rose-500/80 border-rose-400/50 shadow-rose-500/20'">
        {{ toast.message }}
      </div>
    </Transition>

    <h1 class="text-7xl font-bold font-['JetBrains_Mono'] tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center leading-none mb-2">
      {{ currentTime }}
    </h1>
    <p class="text-white/80 text-lg font-semibold uppercase tracking-[0.2em] mb-10 drop-shadow-md">
      {{ currentZone }} (UTC{{ moment().format('Z') }})
    </p>

    <button @click="$emit('save')" class="w-full py-4 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-500/30 flex justify-center items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
      Сохранить время
    </button>
  </div>
</template>