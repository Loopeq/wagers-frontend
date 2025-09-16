<script setup>
import { useMovementStore } from '@/store/movement.module';
import { useRowItemData } from '@/use/useRowItemData';
import {computed} from 'vue';
import UiTable from '@/ui/UiTable/UiTable.vue';
const movementStore = useMovementStore();
const comparisonRow = computed(() => {
  return movementStore.eventComparison.map((pair) => useRowItemData(pair))
})
</script>

<template>
  <UiTable :items="comparisonRow" :show-start-date="true"/>
</template>

<style lang="scss" scoped>
.change-positive {
  color: #38a169;
  font-weight: bold;
}

.change-negative {
  color: #e53e3e;
  font-weight: bold;
}

.change-neutral {
  color: #718096;
}
</style>