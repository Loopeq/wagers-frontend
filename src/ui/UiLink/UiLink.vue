<script setup>
import { defineProps } from 'vue';

defineProps({
  link: {
    type: String,
  },
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
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <a
    class="ui-link"
    :href="loading || disabled ? null : link"
    target="_blank"
    :class="[
      `ui-link--${variant}`,
      `ui-link--${size}`,
      { 'ui-link--loading': loading }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="!loading">
      <slot />
    </span>
    <span v-else class="spinner"></span>
  </a>
</template>

<style lang="scss" scoped>
.ui-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 15px;
  font-size: 12px;
  font-weight: 600;
  line-height: 140%;
  cursor: pointer;
  transition: background-color 0.23s ease, color 0.23s ease;
  border: none;
  border-radius: 5px;
  text-decoration: unset;
  position: relative;

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

  &--stretch {
    width: 100%;
  }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
