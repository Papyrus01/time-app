<script setup>
defineProps({
  savedTimes: Array
})

defineEmits(['delete'])
</script>

<template>
  <div class="flex flex-col bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 h-full overflow-hidden">
    <div class="flex justify-between items-center mb-4 shrink-0">
      <h2 class="text-gray-200 text-lg font-semibold uppercase tracking-wider">История</h2>
      <span class="bg-white/20 text-sm px-3 py-1 rounded-full text-white">{{ savedTimes.length }} записей</span>
    </div>

    <div v-if="savedTimes.length === 0" class="text-center py-10 text-gray-300 flex-grow flex items-center justify-center">
      <p>Здесь пока пусто.</p>
    </div>

    <div class="overflow-y-auto pr-2 custom-scrollbar flex-grow">
      <TransitionGroup name="list" tag="ul" class="space-y-3">
        <li v-for="item in savedTimes" :key="item.id" class="flex justify-between items-center bg-white/5 hover:bg-white/15 border border-white/5 rounded-xl p-4 transition-colors group">
          <div class="flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
            <span class="font-mono text-lg text-white font-medium">{{ item.time }}</span>
          </div>
          <button @click="$emit('delete', item.id)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-400/20 p-2 rounded-lg transition-all" title="Удалить">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.3s ease; }
.list-enter-from { opacity: 0; transform: translateX(-30px); }
.list-leave-to { opacity: 0; transform: translateX(30px) scale(0.9); }
.list-move { transition: transform 0.3s ease; }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
</style>