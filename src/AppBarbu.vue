<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainMenu from './components/MainMenu.vue'
import GamePageVue from './components/game/GamePage.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <MainHeader msg="BARBU" />
    </div>
  </header>

  <main>
    <!-- <MainMenu /> -->
    <GamePageVue msg="test" />
  </main>
</template>

<style scoped></style>
