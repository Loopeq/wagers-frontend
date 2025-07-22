<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: Boolean,
  label: String,
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
  <div class="ui-checkbox">
    <input
        class="checkbox-input"
        :class="classes"
        type="checkbox"
        :id="id" 
        :checked="isChecked"
        @change="(e) => isChecked = e.target.checked"
    />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<style scoped lang="scss">
.ui-checkbox {
    display: flex; 
    justify-content: flex-start;
    align-items: center;
    
    .checkbox-input {
        margin: 0;
        appearance: none;
        width: 16px;
        height: 16px;
        border: 1px solid rgba(128, 128, 128, 0.5);
        background-color: #fff; 
        cursor: pointer;    
        position: relative;

       

        &:checked::after {
            content: "";
            position: absolute;
            top: 1px;
            left: 4px;
            width: 6px;
            height: 10px;
            border: solid black;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    }

    label {
        margin-left: 10px;
        cursor: pointer;
        user-select: none;
    }
}

</style>