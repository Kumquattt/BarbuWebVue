<script setup lang="ts">
import { computed, ref, type ComputedRef, watch, type Ref } from 'vue'
import Button from 'primevue/button'
import GameTurn from './GameTurn.vue'

import { GamesTypes } from './objectsAndConstants/GamesTypes'
import { Game, PlayerScore, TurnScores } from './objectsAndConstants/GameClass'
import { GameType } from './objectsAndConstants/GamesTypes'
import PlayerScoreRow from './PlayerScoreRow.vue'
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'
import { useLocalStorage } from '@vueuse/core' 

import Slider from 'primevue/slider'

import './GamePage.css'

defineProps<{
  msg: string // Name later ?
}>()

const gameStore = useLocalStorage('game-storage', new Game())
const game: Ref<Game> = ref(gameStore.value ? Game.from(gameStore.value) : new Game())
watch(game, (g) => gameStore.value = g)
function reset() {game.value = new Game()}

// Todo : check reg. if all those computed are required
const lastTurn: ComputedRef<TurnScores> = computed(() => game.value.getLastTurn())
const lastPlayingTurn: ComputedRef<TurnScores> = computed(() => game.value.getLastPlayingTurn())
const lastTurnGame: ComputedRef<GameType> = computed(() => lastTurn.value.game)

// Opti - maybe unec
const currentPlayerComputed: ComputedRef<string> = computed(() =>
  game.value.getCurrentDeciderPlayer()
)
const currentGameComputed: ComputedRef<GameType> = computed(() => game.value.getCurrentGame())
const playersComputed: ComputedRef<string[]> = computed(() => game.value.getPlayers())

var leftMenuReduced = ref(false);

// ADD GAMES
watch(lastTurnGame, () => {
  //console.log(`DEBUG - watch lastTurn, id = ${lastTurnGame.value.id}`)
  if ('' != lastTurnGame.value.id) {
    game.value.addTurn('')
  }
})

function tryAddPlayer(event: any): boolean {
  const wasAdded = game.value.addPlayer(event.target.value) //TODO warning si déjà présent
  event.target.value = ''
  return wasAdded
}

function updatePlayerTotalScore(player: string) {
  //console.log(`updatePlayerTotalScore ${player}`)
  game.value.updatePlayerTotalScore(player)
}

function toggleExpand() {
  leftMenuReduced.value = !leftMenuReduced.value;
  console.log("menu reduced = " + leftMenuReduced.value);
}

function loadXplayers(nb: number) {
  const fakeEvent = { target: { value: '' } }
  for (let i = 0; i < nb; i++) {
    fakeEvent.target.value = 'p' + i
    tryAddPlayer(fakeEvent)
  }
}
// loadXplayers(3)

function loadXgames(nb: number) {
  for (let i = 0; i < nb; i++) {
    game.value.updateTurn(lastTurn.value.turn, GameType.types[0])
  }
}
// loadXgames(10)
</script>

<style scoped></style>

<!-- TODO Sub components -->
<template>
  <!-- <div><input type="button" v-on:click="loadXplayers(10)" value="TEST - Add 10 players" /></div>
  <div><input type="button" v-on:click="loadXgames(10)" value="TEST - Add 10 games" /></div> -->

  <div class="game-header">
    <div>Tour: {{ currentPlayerComputed }}</div>
    <div>Jeu: {{ currentGameComputed.label }}</div>
    <div><button v-on:click="reset">Reset</button></div>
  </div>

  <div id="game-table">
    <div class="hamburger" v-on:click="toggleExpand">☰</div>

    <div class="table-header">
      <!--TODO: display selecting players for each turn !! -->
      <!-- <div>Joueuse: {{ currentPlayerComputed }}</div> -->
      <!-- <Dropdown
        :options="playersComputed"
        :onChange="console.log('onChange: Dropdown playersComputed ')"
        class=""
      /> -->
    </div>

    <div class="table-players" :class="{ 'reduced': leftMenuReduced, 'expanded': !leftMenuReduced}">
      <div
        class="player score-row"
        v-for="playerScore in game.players"
        :playerScore="playerScore"
        :key="playerScore.player"
      >
        <span class="player-name">{{ playerScore.player }}</span>
        <span class="player-score">{{ playerScore.score }}</span>
      </div>
      <input
        class="input-add-player score-row"
        v-on:blur="tryAddPlayer"
        v-on:keyup.enter="tryAddPlayer"
      />
    </div>

    <div class="table-scores">
      <div class="score-column" v-for="turnScores in game.turns" :key="turnScores.turn">
        <!-- <span class="index">{{ turnScores.turn }}</span> -->
        <!-- TODO: change options to remaining games -->
        <div class="game-player-selector">
          <Dropdown
            v-model="turnScores.deciderPlayer"
            :options="playersComputed"
            :onChange="console.log('onChange: Dropdown playersComputed ')"
            class="dropdown"
            dropdownIcon="null"
          />
        </div>
        <div class="game-player-selector">
          <Dropdown
            v-model="turnScores.game"
            :options="GameType.types"
            optionLabel="id"
            class="dropdown"
            dropdownIcon="null"
          />
        </div>
        <!--:onChange="updateTurnGame(turnScores.turn, 'event.value')"-->

        <div
          class="score-row player-turn-score"
          v-for="playerScore in turnScores.scores"
          :playerScore="playerScore"
          :key="playerScore.player"
        >
          <Dropdown
            class="score"
            v-model="playerScore.score"
            :options="turnScores.game.possibleScores.map(String)"
            @change="updatePlayerTotalScore(playerScore.player)"
            :disabled="turnScores.game.isNull"
            dropdownIcon="null"
          /><!--:model-value="playerScore.score"-->
        </div>
      </div>
      <!--kebab-case converti en CamelCase automatiquement-->
    </div>
  </div>

  <!-- <div style="margin-top: 50px">{{ game.turns.flatMap((t) => `${t.turn} ${t.game.id}`) }}</div>

  <div style="margin-top: 50px">{{ game }}</div> -->
</template>
