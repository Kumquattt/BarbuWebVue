<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainMenu from './components/MainMenu.vue'
import GamePageVue from './components/game/GamePage.vue'

import Button from 'primevue/button'
</script>

<style></style>

<template>
  <main>
    <MainHeader msg="BARBU" />
    <!-- <GamePageVue msg="test" /> -->
    <!-- <router-link to="/"><Button>Home</Button></router-link>
    <router-link to="/menu"><Button>Menu</Button></router-link>
    <router-link to="/game"><Button>Game</Button></router-link>
    <router-link to="/test"><Button>Test</Button></router-link> -->

    <router-view />
  </main>
</template>

<style scoped></style>
