<script setup>
import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
    },
})
</script>

<template>
<button class="form-button" type="submit">
    <slot />
</button>
</template>

<style lang="scss" scoped>
  .form-button {
    padding: 14px 0;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    background-color: var(--flame);
    color: var(--floral-white);
    border-radius: var(--border-radius-medium);
    transition: background-color 0.3s ease;
    text-align: center;
    cursor: pointer;
  
    &:hover {
      background-color: var(--flame-70);
    }
  }
</style>