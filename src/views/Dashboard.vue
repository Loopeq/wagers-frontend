<script setup>
import DashboardEventColumn from '@/components/dashboard/DashboardEventColumn.vue';
import DashboardCanvas from '@/components/dashboard/DashboardCanvas.vue';
import { useBetStore } from '@/store/bet.module';
import {onMounted, watch, onBeforeUnmount} from 'vue';
import { perPage } from '@/constants';
import { useHead } from '@vueuse/head';

let relatedInterval = null;
let straightInterval = null;

const betStore = useBetStore();
// Получение related
const fetchRelated = async(params, offset, limit, expand) => { 
    await betStore.getRelated({...params, offset: offset, limit: limit}, expand);

    if (relatedInterval) clearInterval(relatedInterval);
    relatedInterval = setInterval(async() => {
        await betStore.getRelated({...params, offset: 0, limit: perPage * betStore.page}, false);
    }, 10_000)
} 
onMounted( async () => {
    await betStore.getSports();
    await fetchRelated(betStore.relatedParams, 0, perPage, false)
    if (betStore.events.length){
        betStore.selectedEventId = betStore.events[0].id; 
    }
})
// Тригер изменения фильтров в related
watch(() => betStore.relatedParams, async (params) => {
    betStore.page = 1;
    await fetchRelated(params, 0, perPage, false)
}, {deep: true})
// Тригер при пагинации
watch(() => betStore.onPaginationFlag, async () => {
    betStore.page += 1;
    await fetchRelated(betStore.relatedParams, perPage * betStore.page, perPage, true)
}, {deep: true})
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