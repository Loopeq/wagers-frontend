<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  show: Boolean,
  closable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:show']);

const isMouseDownInside = ref(false);

function onMouseDown(event) {
  isMouseDownInside.value = event.target.closest('.modal-content') !== null;
}

function onMouseUp(event) {
  const mouseUpInside = event.target.closest('.modal-content') !== null;
  if (!isMouseDownInside.value && !mouseUpInside) {
    closeModal();
  }
  isMouseDownInside.value = false;
}

function closeModal() {
  if (props.closable) emit('update:show', false);
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @mousedown="onMouseDown" @mouseup="onMouseUp">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  pointer-events: auto;
}

.modal-content {
  background-color: var(--eerie-black);
  color: var(--floral-white);
  padding: 20px 35px;
  border-radius: var(--border-radius-medium);
  min-width: 320px;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.6);
  animation: modalFade 0.2s ease-out;
}

@keyframes modalFade {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
