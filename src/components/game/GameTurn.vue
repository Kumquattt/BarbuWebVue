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

<style scoped>
.column {
  min-width: 30px;
}

.turn {
  min-height: 1em;
}

.game {
  font-size: 0.75em;
}

.index {
  vertical-align: super;
  font-size: 0.75em;
}

.score {
  -moz-appearance: textfield;
  height: 1em;
  width: 100%;
}
</style>

<template>
  <div class="column">
    <!-- <div class="turn">
      <span class="index">{{ turnScores.turn }}</span>
      <Dropdown
        v-model="selectedGame"
        :options="GamesTypes"
        :onChange="$emit('updateTurnGame', turnScores.turn, selectedGame)"
        class="game"
      />
    </div> -->
    <div
      class="scoreRow"
      v-for="playerScore in turnScores.scores"
      :playerScore="playerScore"
      :key="playerScore.player"
    >
      <!--TODO: add 'list' attribute according to selected game-->
      <input
        class="score"
        v-model="playerScore.score"
        @change="$emit('updateTurnPlayerScore', turnScores.turn, playerScore)"
        type="number"
      />
    </div>
  </div>
</template>
