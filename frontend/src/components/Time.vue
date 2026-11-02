<script setup>
import { ref, computed } from 'vue'
import { useTime } from '../composables/useTime'
import TimeClock from './TimeClock.vue'
import HistoryList from './HistoryList.vue'

import bgDay from '../assets/day.jpg'
import bgNight from '../assets/night.jpg'

const { currentTime, currentZone, savedTimes, toast, saveTime, deleteTime } = useTime()

// Логика темы
const isDarkTheme = ref(true)
const bgImage = computed(() => isDarkTheme.value ? `url(${bgNight})` : `url(${bgDay})`)
</script>

<template>
  <div 
    class="min-h-screen relative flex items-center justify-center p-8 transition-all duration-700 bg-cover bg-center"
    :style="{ backgroundImage: bgImage }"
  >
    <!-- Слой затемнения и блюра -->
    <div class="absolute inset-0 backdrop-blur-md bg-black/30 transition-colors duration-700"></div>

    <!-- Переключатель темы -->
    <button 
      @click="isDarkTheme = !isDarkTheme"
      class="absolute top-8 right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 shadow-lg text-white transition-all transform hover:scale-110"
      title="Сменить тему"
    >
      <svg v-if="isDarkTheme" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    </button>

    <!-- Сетка -->
    <div class="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch h-[600px]">
      <TimeClock 
        :currentTime="currentTime" 
        :currentZone="currentZone" 
        :toast="toast" 
        @save="saveTime" 
      />
      
      <HistoryList 
        :savedTimes="savedTimes" 
        @delete="deleteTime" 
      />
    </div>
  </div>
</template>