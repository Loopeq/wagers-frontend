<script setup>
import { defineProps, defineEmits } from 'vue';
const emit = defineEmits(['update:modelValue'])
defineProps({
    periods: {
        type: Array,
    },
    modelValue: {
        type: Object,
    },
    nullTitle: {
        type: String,
    }
})
</script>

<template>
    <div class="toggle-periods">
    <span class="toggle-periods__value" :class="{ 'checked': !modelValue}" @click="emit('update:modelValue', null)">{{nullTitle}}</span>
    <div
        v-for="(period, index) in periods"
        :key="index"
        class="toggle-periods__value"
        :class="{ 'checked': period.key === modelValue?.key && period.match_id === modelValue.match_id }"
      >
        <span @click="emit('update:modelValue', {key: period.key, match_id: period.match_id})">{{ period.title }} ({{ period.changes_count }})</span>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.toggle-periods{
    display: flex;
    gap: 20px;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;

    &__value{
        font-weight: 500;
        font-size: 12px;
        cursor: pointer;
        &.checked{
            text-decoration: 3px underline var(--flame);
            text-underline-offset: 5px;
        }
    }
    
    &__value-right{
        padding-left: 4px;
    }
}
</style>