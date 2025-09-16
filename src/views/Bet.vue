<script setup>
import { useHead } from '@vueuse/head';
import { computed, onMounted, watchEffect } from 'vue';
import { useBetStore } from '@/store/bet.module';
import BettingLeaguesList from '@/components/betting/BettingLeaguesList.vue';
import BettingEvents from '@/components/betting/BettingEvents.vue';
import BettingEvent from '@/components/betting/BettingEvent.vue';
import { useRoute, useRouter } from 'vue-router';


const betStore = useBetStore();
const route = useRoute();
const router = useRouter();

useHead({
        title: 'Bet'
})

onMounted(async() => {
  await betStore.getSports();
  const sport = betStore.sports[0]?.id ?? route.params?.sportId;
  betStore.sportId = sport;
  router.push({ name: 'Betting', params: {...route.params, sportId: sport } })
  
  await betStore.getLeagues(sport);
  await betStore.getEvents(route.query?.l, sport);
})

watchEffect(async () => {
  if (route.params?.sportId) await betStore.getLeagues(route.params.sportId);
  if (route.params?.leagueId || route.params?.sport)  await betStore.getEvents(route.params.leagueId, route.params.sportId);
  if (route.params?.matchId) await betStore.getBets(route.params.matchId);
})

const showSingleEvent = computed(() => { 
  return Boolean(route.params.matchId);
})
</script>

<template>
    <div class="betting-grid">
        <BettingLeaguesList class="betting-leagues"/>
        <template v-if="showSingleEvent">
          <BettingEvent class="betting-events" />
        </template>
        <template v-else>
          <BettingEvents class="betting-events" />
        </template>
    </div>
</template>

<style scoped lang="scss">
.betting-grid {
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: relative;
  height: calc(100vh - var(--header-bet-height) - 10px)
}

.betting-leagues,
.betting-events {
  height: 100%;      
  overflow-y: auto;  
  box-sizing: border-box;
}
</style>