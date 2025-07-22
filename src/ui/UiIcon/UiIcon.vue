<script setup>
import {defineProps} from 'vue'; 
defineProps({
    name: {
        type: String,
        required: true,
    }
})
</script>
  
<template>
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#icon-${name}`" />
    </svg>
  </template>
  
<style scoped>
    .icon {
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>