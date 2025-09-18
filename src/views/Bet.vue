<script setup>
import { useHead } from '@vueuse/head';
import { computed, onMounted, watchEffect } from 'vue';
import { useBetStore } from '@/store/bet.module';
import BettingLeaguesList from '@/components/betting/BettingLeaguesList.vue';
import BettingEvents from '@/components/betting/BettingEvents.vue';
import BettingEvent from '@/components/betting/BettingEvent.vue';
import BettingCart from '@/components/betting/BettingCart.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthBettingStore } from '@/store/authBetting.module';

const betStore = useBetStore();
const route = useRoute();
const router = useRouter();
const authBettingStore = useAuthBettingStore();

useHead({
    title: 'Bet'
})

onMounted(async() => {
  await authBettingStore.checkAuth();
  await betStore.getSports();
  const sport = route.params?.sportId || betStore.sports[0]?.id;
  betStore.sportId = sport;
  if (!route.params?.sportId) {
    router.push({ name: 'Betting', params: { ...route.params, sportId: sport } })
  }
  
  await betStore.getLeagues(sport);
  await betStore.getEvents(route.params?.leagueId, sport);
})

watchEffect(async () => {
  if (route.params?.sportId) await betStore.getLeagues(route.params.sportId);
  if (route.params?.leagueId || route.params?.sportId)  await betStore.getEvents(route.params.leagueId, route.params.sportId);
  if (route.params?.matchId) await betStore.getBets(route.params.matchId);
})

const showSingleEvent = computed(() => { 
  return Boolean(route.params.matchId);
})
</script>

<template>
    <div class="betting-grid">
        <BettingLeaguesList class="betting-leagues"/>
        <Transition name="soft-fade" mode="out-in">
          <component
            :is="showSingleEvent ? BettingEvent : BettingEvents"
            :key="route.params.matchId || betStore.events"
            class="betting-events"
          />
        </Transition>
        <BettingCart />
    </div>
</template>

<style>
  body{
    background-color: #000;
  }
  .card{
    background-color: var(--eerie-black);
    border: 1px solid var(--timberwolf-30); 
  }
</style>
<style scoped lang="scss">

.betting-grid {
  display: grid;
  grid-template-columns: 1.25fr 5fr 1.5fr;
  position: relative;
  height: calc(100vh - var(--header-bet-height) - 10px);
}

.betting-leagues,
.betting-events {
  height: 100%;      
  overflow-y: auto;  
  box-sizing: border-box;
  background-color: var(--eerie-black);
  color: var(--floral-white);
}

.soft-fade-enter-active,
.soft-fade-leave-active {
  transition: opacity 0.10s linear;
}

.soft-fade-enter-from,
.soft-fade-leave-to {
  opacity: 0.8;
}
</style>