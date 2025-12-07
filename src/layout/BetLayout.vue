<script setup>
import AppHeaderBet from '@/components/header/AppHeaderBet.vue';
</script>
<template>
  <AppHeaderBet />
  <div class="container">
      <router-view v-slot="{ Component, route }">
            <component :key="route.name" :is="Component"></component>
      </router-view>
  </div>
</template>
<style scoped lang="scss">
  .container{ 
    padding: var(--container-padding);
    padding-top: var(--header-bet-height);
  }
</style>