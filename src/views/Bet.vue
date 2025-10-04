<script setup>
import { useHead } from '@vueuse/head';
import { computed, onMounted, watch } from 'vue';
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
  const sportId = route.params?.sportId || 33;
  betStore.sportId = sportId;
  router.push({ name: 'Betting', params: { ...route.params, sportId: sportId } })
  await betStore.getLeagues(route.params.sportId);
  await betStore.getEvents(sportId);
  await betStore.getCart();

})

watch(
  () => route.params.matchId,
  async (newMatchId, oldMatchId) => {
    if (newMatchId && (newMatchId !== oldMatchId || oldMatchId === undefined)) {
      await betStore.getBets(newMatchId);
    }
  },
  { immediate: true }
);

watch(
  () => route.params.sportId,
  async (newSportId, oldSportId) => {
    if (newSportId && (newSportId !== oldSportId || oldSportId === undefined)) {
      await betStore.getLeagues(newSportId);
    }
  },
  { immediate: true }
);

watch(
  () => [route.params.leagueId, route.params.sportId],
  async ([newLeagueId, newSportId], [oldLeagueId, oldSportId]) => {
    if (
      (newLeagueId && (newLeagueId !== oldLeagueId || oldLeagueId === undefined)) ||
      (newSportId && (newSportId !== oldSportId || oldSportId === undefined))
    ) {
      await betStore.getEvents(newSportId, newLeagueId);
    }
  },
);

const showSingleEvent = computed(() => { 
  return Boolean(route.params.matchId);
})
</script>

<template>
    <div class="betting-grid" :class="['betting-grid', { 'no-cart': !authBettingStore.isAuthenticated }]">
        <BettingLeaguesList class="betting-leagues"/>
        <Transition name="soft-fade" mode="out-in">
          <component
            :is="showSingleEvent ? BettingEvent : BettingEvents"
            :key="route.params.matchId || betStore.events"
            class="betting-events"
          />
        </Transition>
        <BettingCart v-if="authBettingStore.isAuthenticated"/>
    </div>
</template>

<style>
  body{
    background-color: #000;
  }
  .card{
    background-color: var(--eerie-black);
  }
</style>
<style scoped lang="scss">

.betting-grid {
  display: grid;
  grid-template-columns: 1.25fr 5fr 1.5fr;
  position: relative;
  height: calc(100vh - var(--header-bet-height) - 10px);

  &.no-cart {
    grid-template-columns: 1.25fr 6.25fr;
  }
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