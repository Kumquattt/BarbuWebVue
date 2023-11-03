<script setup lang="ts">
import { TurnScores } from './objectsAndConstants/GameClass'
import { GamesTypes } from './objectsAndConstants/GamesTypes'
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'

import { ref } from 'vue'

defineProps<{
  turnScores: TurnScores
}>()

//const turnScores = defineProps(['turnScores'])

var selectedGame = ref('') // ref = reactive state -- todo make object for score
const test = 'teeest'
const testRef = ref('teeestRef')

function onChange(event: DropdownChangeEvent) {
  //turnScores.game = event.value
}
</script>

<style scoped></style>

<template>
  <tr>
    {{
      turnScores.turn
    }}-<Dropdown
      v-model="selectedGame"
      :options="GamesTypes"
      :onChange="$emit('updateTurnGame', selectedGame)"
    />
  </tr>
  <tr
    v-for="playerScore in turnScores.scores"
    :playerScore="playerScore"
    :key="playerScore.player"
  ></tr>
</template>
