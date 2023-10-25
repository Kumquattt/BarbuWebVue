<script setup lang="ts">
import MenuItem from './MenuItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
</script>

<template>
  <MenuItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Jouer</template>
    <template #link>partie</template>
  </MenuItem>
  <MenuItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Parties</template>
  </MenuItem>
</template>
