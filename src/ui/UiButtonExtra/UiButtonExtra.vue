<script setup>
import { defineProps } from 'vue';

defineProps({
  variant: {
    type: String,
    default: 'primary', // primary | secondary
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  size: {
    type: String,
    default: 'default', // default | stretch
    validator: (value) => ['default', 'stretch'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="ui-button"
    :class="[`ui-button--${variant}`, `ui-button--${size}`]"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.ui-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1.5rem;
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
  transition: background-color 0.23s ease, color 0.23s ease;
  border: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &--primary {
    background-color: var(--flame);
    color: var(--floral-white);
    border: 1px solid var(--flame);

    &:hover:not(:disabled) {
      background-color: var(--flame-70);
    }
  }

  &--secondary {
    background-color: var(--floral-white-30);
    color: #fff;
    border: 1px solid var(--floral-white-30);

    &:hover:not(:disabled) {
        background-color: rgba(255,255,255,.45);
    }

    &:disabled {
      background-color: var(--floral-white-80);
      color: var(--eerie-black);
      opacity: 0.5;
    }
  }

  &--stretch{
    width: 100%;
  }
}
</style>