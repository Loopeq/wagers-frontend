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
    atSymbol: {
        type: String,
        required: false,
    }
})
</script>

<template>
    <div class="input-container">
        <div v-if="atSymbol" class="at-symbol">{{ atSymbol }}</div>
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
  display: flex;
  align-items: center;
}

.at-symbol {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--floral-white);
  color: #fff;
  z-index: 2;
  pointer-events: none;
  font-size: 12px;
}

.input-container input {
  padding: 10px 10px 10px 25px;
  color: var(--floral-white);
  color: #fff;
  background-color: transparent;
  border: 1px solid var(--black-olive);
  border-radius: var(--border-radius-small);
}

.ui-input{
    font-size: 12px;
    width: 100%;
    padding-right: 40px;
    padding-left: 25px;
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