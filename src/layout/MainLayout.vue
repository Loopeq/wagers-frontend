<script setup>
import AppHeader from '@/components/header/AppHeader.vue';
</script>
<template>
  <AppHeader />
  <div class="container">
      <router-view v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
            <component :key="route.name" :is="Component"></component>
        </Transition>
      </router-view>
  </div>
</template>
<style scoped lang="scss">
  .container{ 
    padding: var(--container-padding);
    padding-top: var(--header-height);
  }
</style>
  
