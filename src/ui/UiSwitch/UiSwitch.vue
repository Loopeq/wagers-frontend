<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Boolean,
  id: String,
})

const isChecked = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<template>
<div class="container">
  <label class="switch"><input :id="id" type="checkbox" :checked="isChecked" v-model="isChecked" />    <div></div>
  </label>
</div>
</template>

<style lang="scss" scoped>

.container {
  height: 20px;
  text-align: center;
}

.switch input {
  position: absolute;
  opacity: 0;
}

/**
 * 1. Adjust this to size
 */

.switch {
  display: inline-block;
  font-size: 20px; /* 1 */
  height: 1em;
  width: 2em;
  background: var(--black-olive-75);
  border-radius: 1em;
}

.switch div {
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background: #FFF;
  box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.3);
  -webkit-transition: all 300ms;
     -moz-transition: all 300ms;
          transition: all 300ms;
}

.switch input:checked + div {
  -webkit-transform: translate3d(100%, 0, 0);
     -moz-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
}

.switch:has(input:checked) {
  background: var(--flame-70);
}
</style>