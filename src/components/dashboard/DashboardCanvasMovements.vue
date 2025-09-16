<script setup>
import { useMovementStore } from '@/store/movement.module';
import { useRowItemData } from '@/use/useRowItemData';
import {computed, ref, watch } from 'vue';
import UiTable from '@/ui/UiTable/UiTable.vue';
import UiTogglePeriods from '@/ui/UiTogglePeriods/UiTogglePeriods.vue';

const movementStore = useMovementStore();
const selectedPeriod = ref(null);
const movementRow = computed(() => {
  return movementStore.eventChanges
    .filter((pair) => {
      if (!selectedPeriod.value) return true;
      return (
        selectedPeriod.value.key === pair[0].key &&
        selectedPeriod.value.match_id === pair[0].match_id
      );
    })
    .map((pair) => useRowItemData(pair));
});
const periods = computed(() => {
  return movementStore.eventPeriods.filter((period) => period.changes_count !== 0);
})
const nullTitle = computed(() => {
  return `Все (${movementStore.eventPeriods.reduce((acc, cur) => acc + cur.changes_count, 0)})`
})
// Сброс выбранного периода при выборе ивента
watch(() => movementStore.selectedEventId, () => {
  selectedPeriod.value = null;
})
</script>
<template>
    <UiTogglePeriods class="toggle-words" v-model="selectedPeriod" :periods="periods" :null-title='nullTitle' />
    <UiTable :items="movementRow" :show-start-date="false"/>
</template>
<style lang="scss" scoped>
.toggle-words{
  margin-top: 20px;
  margin-left: 12px;
}
</style>
