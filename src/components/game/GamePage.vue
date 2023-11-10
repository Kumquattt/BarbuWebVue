<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import GameTurn from './GameTurn.vue'
import { Game, TurnScores } from './objectsAndConstants/GameClass'
import PlayerScoreRow from './PlayerScoreRow.vue'

defineProps<{
  msg: string // Name later ?
}>()

const game = ref(new Game()) // ref() ?

// Todo : check reg. if all thos computed are required
const numberOfTurns: ComputedRef<number> = computed(() => game.value.turns.length)
const lastTurn: ComputedRef<TurnScores> = computed(() => game.value.turns[numberOfTurns.value - 1])

const currentPlayerComputed = computed(() => lastTurn.value.player_turn)
const currentGameComputed = computed(() => lastTurn.value.game)

function tryAddPlayer(event: any): boolean {
  //Todo trouver comment accéder à la value d'une target d'un Event
  const wasAdded = game.value.addPlayer(event.target.value) //TODO warning si déjà présent
  event.target.value = ''
  return wasAdded
}

function updateTurnGame(game: string) {
  console.log(game)
}

function updateTurnPlayerScore(name: string, score: number) {
  console.log(name + score)
}
</script>

<style scoped>
* {
  /* border: 1px dashed green; */
}
.container {
  display: flex;
}

.game-header {
  div {
    min-width: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .header-content {
  }
}

.game-table {
  border: 1px dashed;
  display: grid;
  grid-template: 1fr 1fr 4fr / 2fr 1fr 1fr;
  div {
    min-height: 20px;
    min-width: 100px;
  }

  /* TODO séparer en 2*/
  .table-header {
    background-color: aqua;
    grid-area: 1 / 2 / span 1 / -1;
    div {
      min-width: 100px;
    }
  }
  .table-players {
    background-color: lightsalmon;
    grid-area: 3 / 1 / 3 / -1;
    min-width: 100px;
    flex-direction: column;
  }
  .table-scores {
    background-color: lightyellow;
    grid-area: 2 / 2 / -1 / -1;
    flex-direction: column;
  }
}
</style>

<template>
  <div class="container game-header">
    <div>Tour: {{ currentPlayerComputed }}</div>
    <div>Jeu: {{ currentGameComputed }}</div>
  </div>

  <div class="game-table container">
    <div class="table-players container">
      <PlayerScoreRow
        v-for="playerScore in game.players"
        :playerScore="playerScore"
        :key="playerScore.player"
      />
      <input class="input-add-player" v-on:blur="tryAddPlayer" />
    </div>

    <div class="table-header container">
      <div>Joueuse: {{}}</div>
      <div>Jeu: {{}}</div>
    </div>

    <div class="table-scores container">
      <GameTurn
        v-for="turnScores in game.turns"
        :turnScores="turnScores"
        :key="turnScores.turn"
        @update-turn-game="updateTurnGame"
      />
      <!-- @update-score="updateTurnPlayerScore" kebab-case converti en CamelCase automatiquemeet-->
    </div>
  </div>

  <div style="margin-top: 50px">{{ game }}</div>
</template>
