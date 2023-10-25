<script setup lang="ts">
import type { PlayerScore } from './objectsAndConstants/GameClass'

defineProps<{
  playerScore: PlayerScore
}>()
</script>

<template>
  <tr>
    <span>{{ playerScore.player }} - {{ playerScore.score }}</span>
  </tr>
</template>

<style scoped></style>
