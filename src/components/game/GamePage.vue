<script setup lang="ts">
import { computed, ref, type ComputedRef, watch } from 'vue'
import GameTurn from './GameTurn.vue'

import { GamesTypes } from './objectsAndConstants/GamesTypes'
import { Game, PlayerScore, TurnScores } from './objectsAndConstants/GameClass'
import { GameType } from './objectsAndConstants/GamesTypes'
import PlayerScoreRow from './PlayerScoreRow.vue'
import Dropdown, { type DropdownChangeEvent } from 'primevue/dropdown'

defineProps<{
  msg: string // Name later ?
}>()

const game = ref(new Game()) // ref() ?

// Todo : check reg. if all those computed are required
const lastTurnGame: ComputedRef<GameType> = computed(() => game.value.getLastTurn().game)

// Opti - maybe unec
const currentPlayerComputed: ComputedRef<string> = computed(() => game.value.getCurrentDeciderPlayer())
const currentGameComputed: ComputedRef<GameType> = computed(() => game.value.getCurrentGame())
const playersComputed: ComputedRef<string[]> = computed(() => game.value.getPlayers())

watch(lastTurnGame, () => {
  console.log(`DEBUG - watch lastTurnGame, id = ${lastTurnGame.value.id}`)
  if('' != lastTurnGame.value.id) {
    game.value.addTurn('')
  }  
})

function tryAddPlayer(event: any): boolean {
  const wasAdded = game.value.addPlayer(event.target.value) //TODO warning si déjà présent
  event.target.value = ''
  return wasAdded
}

function updateTurnGame(turn: number, gameType: GameType) {
  console.log(`MAIN updateTurnGame:`)
  console.log(turn)
  console.log(gameType)
  game.value.updateTurn(turn, gameType)
}

function updatePlayerTotalScore(player: string) {
  console.log(`updatePlayerTotalScore ${player}`)
  game.value.updatePlayerTotalScore(player)
}

function loadXplayers(nb: number) {
  const fakeEvent = { target: { value: '' } }
  for (let i = 0; i < nb; i++) {
    fakeEvent.target.value = 'p' + i
    tryAddPlayer(fakeEvent)
  }
}
loadXplayers(1)
</script>

<style scoped>
* {
  /* border: 1px dashed green; */
}

.game-header {
  display: flex;
  div {
    min-width: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

#game-table {
  background-color: rgb(209, 209, 209);
  border: 1px dashed;

  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 3rem 4rem 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'filler header'
    'filler gameSelectors'
    'players scores';

  .table-header {
    background-color: aqua;

    grid-area: header;
    display: flex;
    
  }

  .table-game-selectors {
    background-color: lightgreen;
    grid-area: gameSelectors;
    display: flex;

    .index {
      vertical-align: super;
      font-size: 0.75em;
    }


    
  }

  /* VARIABLES */
  --scores-row-width: 4rem;
  --scores-row-height: 3rem;

  .score-column {
    width: var(--scores-row-width);

    .dropdown {
      max-width: 80%;
    }
  }

  .score-row {
    height: var(--scores-row-height);
  }

  .table-players {
    background-color: lightsalmon;

    grid-area: players;

    display: flex;
    flex-direction: column;
  }

  .table-scores {
    background-color: lightyellow;

    grid-area: scores;
    display: flex;
    flex-direction: row;

    .score {
      height: 80%;
      width: 80%;

    }
  }

  .game-selector {
    display: flex;
    align-items: center;
    justify-content: center;

    .dropdown {
      width: 80%;
      height: 80%;
    }
  }

  .player-turn-score {
    background-color: blueviolet;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

<template>
  <div><input type="button" v-on:click="loadXplayers(10)" value="TEST - Add 10 players" /></div>

  <div class="game-header">
    <div>Tour: {{ currentPlayerComputed }}</div>
    <div>Jeu: {{ currentGameComputed }}</div>
  </div>

  <div id="game-table">
    <div class="filler"></div>

    <div class="table-players">
      <PlayerScoreRow
        class="score-row"
        v-for="playerScore in game.players"
        :playerScore="playerScore"
        :key="playerScore.player"
      />
      <input
        class="input-add-player score-row"
        v-on:blur="tryAddPlayer"
        v-on:keyup.enter="tryAddPlayer"
      />
    </div>

    <div class="table-header">
      <!--TODO: display selecting players for each turn !! -->
      <div>Joueuse: {{currentPlayerComputed}} </div>
      <Dropdown :options="playersComputed" :onChange="console.log('onChange: Dropdown playersComputed ')" class="" />
    </div>

    <div class="table-game-selectors">
      <div class="game-selector score-column" v-for="turnScores in game.turns" :key="turnScores.turn">
        <!-- <span class="index">{{ turnScores.turn }}</span> -->
        <!-- TODO: change options to remaining games -->
        <Dropdown
          class="dropdown"
          v-model="turnScores.game"
          :options="GameType.types"
          optionLabel="id"
          dropdownIcon=null
        />
        <!--:onChange="updateTurnGame(turnScores.turn, 'event.value')"-->
      </div>
    </div>

    <div class="table-scores">
      <div class="score-column" v-for="turnScores in game.turns" :key="turnScores.turn">
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
            @change="updatePlayerTotalScore(playerScore.player); console.log($event.value)"
            :disabled="turnScores.game.isNull"
            dropdownIcon=null
            /><!--:model-value="playerScore.score"-->
        </div>
      </div>

      <!-- <GameTurn
        class="score-row"
        v-for="turnScores in game.turns"
        :turnScores="turnScores"
        :key="turnScores.turn"
        @update-turn-game="updateTurnGame"
        @update-turn-player-score="updatePlayerTotalScore"
      /> -->
      <!--kebab-case converti en CamelCase automatiquement-->
    </div>
  </div>
  
  <div style="margin-top: 50px">{{ game.turns.flatMap(t => `${t.turn} ${t.game.id}`) }}</div>

  <div style="margin-top: 50px">{{ game }}</div>
</template>
