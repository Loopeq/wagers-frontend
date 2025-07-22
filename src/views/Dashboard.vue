<script setup>
import DashboardEventColumn from '@/components/dashboard/DashboardEventColumn.vue';
import DashboardCanvas from '@/components/dashboard/DashboardCanvas.vue';
import { useBetStore } from '@/store/bet.module';
import {onMounted, watch, onBeforeUnmount} from 'vue';

let relatedInterval = null;
let straightInterval = null;

const betStore = useBetStore(); 
onMounted( async () => {
    await betStore.getRelated(betStore.relatedParams);
    await betStore.getSports();
    if (betStore.events.length){
        betStore.selectedEventId = betStore.events[0].id; 
    }

    relatedInterval = setInterval(async() => {
        await betStore.getRelated(betStore.relatedParams);
    }, 10_000)
})
// Тригер изменения фильтров в related
watch(() => betStore.relatedParams, async (value) => {
    await betStore.getRelated(value);

    if (relatedInterval) clearInterval(relatedInterval);
    relatedInterval = setInterval(async() => {
        await betStore.getRelated(value);
    }, 10_000)
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