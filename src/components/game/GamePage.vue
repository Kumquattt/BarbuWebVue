<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import GameTurn from './GameTurn.vue'
import { Game, PlayerScore, TurnScores } from './objectsAndConstants/GameClass'
import PlayerScoreRow from './PlayerScoreRow.vue'

defineProps<{
  msg: string // Name later ?
}>()

const game = ref(new Game()) // ref() ?

// Todo : check reg. if all thos computed are required
const lastTurn: ComputedRef<TurnScores> = computed(() => game.value.getLastTurn())

const currentPlayerComputed = computed(() => game.value.getCurrentDeciderPlayer())
const currentGameComputed = computed(() => game.value.getCurrentGame())

function tryAddPlayer(event: any): boolean {
  const wasAdded = game.value.addPlayer(event.target.value) //TODO warning si déjà présent
  event.target.value = ''
  return wasAdded
}

function updateTurnGame(turn: number, turnGame: string) {
  console.log(turn + '' + turnGame)
  game.value.updateTurn(turn, turnGame)
}

function updateTurnPlayerScore(turn: number, playerScore: PlayerScore) {
  console.log(turn + '' + playerScore)
}

function load10players() {
  const fakeEvent = { target: { value: '' } }
  for (let i = 0; i < 10; i++) {
    fakeEvent.target.value = 'p' + i
    tryAddPlayer(fakeEvent)
  }
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
  background-color: rgb(209, 209, 209);
  border: 1px dashed;
  display: grid;
  grid-template: 1fr 1fr 4fr / 2fr 1fr 1fr;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */ /* ==> TODO responsive ?*/
  div {
    min-height: 20px;
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
  }
}
</style>

<template>
  <div><input type="button" v-on:click="load10players" value="TEST - Add 10 players" /></div>

  <div class="container game-header">
    <div>Tour: {{ currentPlayerComputed }}</div>
    <div>Jeu: {{ currentGameComputed }}</div>
  </div>

  <div class="game-table">
    <div class="table-players container">
      <PlayerScoreRow
        v-for="playerScore in game.players"
        :playerScore="playerScore"
        :key="playerScore.player"
      />
      <input class="input-add-player" v-on:blur="tryAddPlayer" />
      <!-- detect enter key ?-->
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
        @update-turn-player-score="updateTurnPlayerScore"
      />
      <!-- @update-score="updateTurnPlayerScore" kebab-case converti en CamelCase automatiquemeet-->
    </div>
  </div>

  <div style="margin-top: 50px">{{ game }}</div>
</template>
