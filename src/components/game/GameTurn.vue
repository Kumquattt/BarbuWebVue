<script setup lang="ts">
import { TurnScores } from './objectsAndConstants/GameClass'
import { GamesTypes } from './objectsAndConstants/GamesTypes'

import { ref } from 'vue'

defineProps<{
  turnScores: TurnScores
}>()

//const turnScores = defineProps(['turnScores'])

var selectedGame = ref('') // ref = reactive state -- todo make object for score
const test = 'teeest'
const testRef = ref('teeestRef')
</script>

<template>
  <tr>
    <Listbox v-model="selectedGame" :options="GamesTypes" />
    <p>{{ GamesTypes }}</p>
  </tr>
</template>

<style scoped></style>
./objectsAndConstants/GameClass
