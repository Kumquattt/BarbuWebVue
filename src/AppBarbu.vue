<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainMenu from './components/MainMenu.vue'
import GamePageVue from './components/game/GamePage.vue'
import Button from 'primevue/button';
</script>

<style>

</style>

<template>
  <header>
    <div class="wrapper">
      <MainHeader msg="BARBU" />
      <Button><router-link to="/">Home</router-link></Button>
      <Button><router-link to="/menu">Menu</router-link></Button>
      <Button><router-link to="/game">Game</router-link></Button>
      <Button><router-link to="/test">Test</router-link></Button>
    </div>
  </header>

  <main>
    <!-- <GamePageVue msg="test" /> -->
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
