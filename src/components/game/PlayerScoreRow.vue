<script setup lang="ts">
import type { PlayerScore } from './objectsAndConstants/GameClass'

defineProps<{
  playerScore: PlayerScore
}>()
</script>

<style scoped>
.scoreRow {
}
</style>

<template>
  <div class="scoreRow">{{ playerScore.player }} - {{ playerScore.score }}</div>
</template>
