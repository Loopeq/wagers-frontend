<script setup>
import { defineProps, defineEmits } from 'vue';

defineEmits(['update:modelValue'])
defineProps({
    modelValue: String,
    placeholder: String,
    type: String,
    disabled: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="input-container">
        <input 
            :type="type" 
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="ui-input"
            autocomplete="off" 
            autocorrect="off" 
            autocapitalize="none" 
            spellcheck="false"    
        >
        <div class="icon-right">
            <slot name="icon-right" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.input-container {
  position: relative;
}

.input-container input {
  background-color: #fff;
  padding: 15px;
  padding-right: 3rem;
  line-height: 1.25rem;
  width: 300px;
  border: 1px solid var(--timberwolf);
  border-radius: var(--border-radius-medium);
}

.ui-input{
    font-size: 12px;
    width: 100%;
    padding-right: 40px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: var(--flame);
    }
}

.icon-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>