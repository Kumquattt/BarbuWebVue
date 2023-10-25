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
  return game.value.addPlayer(event.target.value) //TODO warning si déjà présent
}
</script>

<template>
  <div>{{ game.turns }}</div>

  <div class="game-header">
    <div>Tour: {{ currentPlayerComputed }}</div>
    <div>Jeu: {{ currentGameComputed }}</div>
  </div>

  <div class="game-table">
    <table>
      <!-- TODO trouver tableau de framework -->
      <tbody>
        <tr>
          <td>--</td>
          <td>
            Joueuse: {{}} Sel game: {{}}
            <!-- TODO -->
          </td>
        </tr>
        <tr>
          ==
        </tr>
        <tr>
          <td>
            <PlayerScoreRow
              v-for="playerScore in game.players"
              :playerScore="playerScore"
              :key="playerScore.player"
            />
            <tr>
              <input class="input-add-player" v-on:blur="tryAddPlayer" />
            </tr>
          </td>
          <GameTurn
            v-for="turnScores in game.turns"
            :turnScores="turnScores"
            :key="turnScores.turn"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
