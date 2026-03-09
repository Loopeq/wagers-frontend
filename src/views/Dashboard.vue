<script setup>
import DashboardEventColumn from '@/components/dashboard/DashboardEventColumn.vue';
import DashboardCanvas from '@/components/dashboard/DashboardCanvas.vue';
import { useBetStore } from '@/store/bet.module';
import {onMounted, watch, onBeforeUnmount} from 'vue';
import { useHead } from '@vueuse/head';

let relatedInterval = null;
let straightInterval = null;

const betStore = useBetStore();
// Получение related
const fetchRelated = async (params, expand = false) => { 
    await betStore.getRelated({...params}, expand);
    if (!expand) {
        if (relatedInterval) clearInterval(relatedInterval);

        relatedInterval = setInterval(async () => {
            await betStore.getRelated({...params}, false);
        }, 10_000);
    }
};

onMounted(async () => {
    await betStore.getSports();
    await fetchRelated(betStore.relatedParams, false);

    if (betStore.events.length) {
        betStore.selectedEventId = betStore.events[0].id; 
    }
});
// watcher для фильтров
watch(
    () => betStore.relatedParams,
    async (params) => {
        betStore.pagination.client.currentPage = 1;
        await fetchRelated(params, false);
    },
    { deep: true }
);
// watcher для кнопки Показать ещё
watch(
    () => betStore.onPaginationFlag,
    async () => {
        await fetchRelated(betStore.relatedParams, true);
    }
);
// Тригер при изменении выбранного ивента
watch(() => betStore.selectedEventId, async (eventId) => {
    let currentEvent = betStore.events.find((event) => event.id === eventId);
    if (!currentEvent) {    
        currentEvent = [
            ...betStore.eventHistory.home, 
            ...betStore.eventHistory.away
        ].find((event) => event.id === eventId); 
    }
    await betStore.getStraight({
        match_id: eventId,
        child_id: currentEvent.child_id,
    })
    await betStore.getHistory({
        home_id: currentEvent.home_team_id,
        away_id: currentEvent.away_team_id,
        current_match_id: currentEvent.id,
    });
    if (straightInterval) clearInterval(straightInterval);
    straightInterval = setInterval(async() => {
        await betStore.getStraight({
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
        <DashboardEventColumn :events="betStore.events"/>
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