<template>
  <div class="text-center">
    <div class="inline-block bg-gradient-to-br from-amber-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-amber-500/20">
      <div class="text-2xl text-slate-300 mb-2">{{ gregorianDate }}</div>
      <div class="text-5xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">{{ hijriDate }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  hijriDate: {
    type: String,
    default: ''
  }
})

const gregorianDate = ref('')

onMounted(() => {
  const now = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  gregorianDate.value = now.toLocaleDateString('en-US', options)
})
</script>
