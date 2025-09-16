<script setup>
import DashboardEventColumn from '@/components/dashboard/DashboardEventColumn.vue';
import DashboardCanvas from '@/components/dashboard/DashboardCanvas.vue';
import { useMovementStore } from '@/store/movement.module';
import {onMounted, watch, onBeforeUnmount} from 'vue';
import { useHead } from '@vueuse/head';

let relatedInterval = null;
let straightInterval = null;

const movementStore = useMovementStore();
// Получение related
const fetchRelated = async (params, expand = false) => { 
    await movementStore.getRelated({...params}, expand);
    if (!expand) {
        if (relatedInterval) clearInterval(relatedInterval);

        relatedInterval = setInterval(async () => {
            await movementStore.getRelated({...params}, false);
        }, 10_000);
    }
};

onMounted(async () => {
    await fetchRelated(movementStore.relatedParams, false);

    if (movementStore.events.length) {
        movementStore.selectedEventId = movementStore.events[0].id; 
    }
});
// watcher для фильтров
watch(
    () => movementStore.relatedParams,
    async (params) => {
        movementStore.pagination.client.currentPage = 1;
        await fetchRelated(params, false);
    },
    { deep: true }
);
// watcher для кнопки Показать ещё
watch(
    () => movementStore.onPaginationFlag,
    async () => {
        await fetchRelated(movementStore.relatedParams, true);
    }
);
// Тригер при изменении выбранного ивента
watch(() => movementStore.selectedEventId, async (eventId) => {
    let currentEvent = movementStore.events.find((event) => event.id === eventId);
    if (!currentEvent) {    
        currentEvent = [
            ...movementStore.eventHistory.home, 
            ...movementStore.eventHistory.away
        ].find((event) => event.id === eventId); 
    }
    await movementStore.getStraight({
        match_id: eventId,
        child_id: currentEvent.child_id,
    })
    await movementStore.getHistory({
        home_id: currentEvent.home_team_id,
        away_id: currentEvent.away_team_id,
        current_match_id: currentEvent.id,
    });
    if (straightInterval) clearInterval(straightInterval);
    straightInterval = setInterval(async() => {
        await movementStore.getStraight({
            match_id: eventId,
            child_id: currentEvent.child_id,
        });
    }, 5_000);
})

onBeforeUnmount(() => {
  if (relatedInterval) clearInterval(relatedInterval);
  if (straightInterval) clearInterval(straightInterval);
});

useHead({
        title: 'Dashboard'
})
</script>

<template>
    <div class="dashboard-grid">
        <DashboardEventColumn :events="movementStore.events"/>
        <DashboardCanvas />
    </div>
</template>

<style scoped lang="scss">
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 5fr;
  position: relative;
}
</style>