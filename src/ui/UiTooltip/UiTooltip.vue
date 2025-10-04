<template>
    <teleport to="body">
      <transition name="fade">
        <div
          v-if="visible"
          class="ui-tooltip"
          :style="{ top: position.y + 'px', left: position.x + 'px' }"
        >
          {{ text }}
        </div>
      </transition>
    </teleport>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    visible: Boolean,
    text: String,
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  });
  </script>
  
  <style scoped>
  .ui-tooltip {
    position: fixed;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    padding: 6px 10px;
    font-size: 12px;
    border-radius: 4px;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.15s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  