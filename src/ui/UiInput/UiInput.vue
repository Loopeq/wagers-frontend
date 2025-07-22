<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits(['update:modelValue'])
const debounceTimeout = ref(null)
const props = defineProps({
    modelValue: Number,
    valuePlug: {
        type: String,
        required: false,
    },
    label: String,
    min: Number,
    max: Number,
    disabled: {
        type: Boolean,
        default: false,
    },
})

function onInput(event) {
    let value = +event.target.value;
    if (isNaN(value)){ 
        event.target.value = '';
        return
    }
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
    }
    debounceTimeout.value = setTimeout(() => {
        if (isNaN(value)) {
            value = ''
        } else {
            if (value < props.min) value = props.min;
            if (value > props.max) value = props.max;
        }
        emit('update:modelValue', value)
        event.target.value = value;
    }, 800)
}
</script>

<template>
  <div class="ui-input-wrapper custom-input" :class="{'disabled':disabled}">
    <input
      type="text"
      @click="isSelectVisible = !isSelectVisible"
      :min="min"
      :max="max"
      :value="modelValue ?? valuePlug"
      @input="onInput" 
      :disabled="disabled"
    />
    <div class="custom-input__label" :class="{'disabled':disabled}">{{ label }}</div>
  </div>
</template>

<style scoped lang="scss">
    .ui-input-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .custom-input {
        input{
            width: 100%;
            height: 40px;
            border: 1px solid rgba(128, 128, 128, 0.5);
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
            outline: none;
        }

        input[type='text']:disabled{
            color: gray;
        }

        &__label {
            position: absolute;
            top: -8px; 
            right: 10px; 
            background: white; 
            padding: 2px 6px; 
            z-index: 5; 
            border-radius: 4px; 
            border: 1px solid transparent;
            
            &.disabled{
                color: gray;
            }
        }
    }

    .custom-input:focus {
        outline: 2px solid rgba(128, 128, 128, 0.5);
        box-shadow: none; 
    }
</style>