<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
})

const icons = import.meta.glob('@/assets/icons/*.svg', { eager: true })

const IconComponent = icons[`/src/assets/icons/${props.name}.svg`]?.default
</script>

<template>
  <component v-if="IconComponent" :is="IconComponent" class="icon" />
</template>

<style scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
