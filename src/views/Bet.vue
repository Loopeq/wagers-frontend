<script setup>
import { useHead } from '@vueuse/head';
import { computed, onMounted, watch, ref } from 'vue';
import { useBetStore } from '@/store/bet.module';
import BettingSportList from '@/components/betting/BettingSportList.vue';
import BettingEvents from '@/components/betting/BettingEvents.vue';
import BettingEvent from '@/components/betting/BettingEvent.vue';
import BettingLeagues from '@/components/betting/BettingLeagues.vue';
import BettingCart from '@/components/betting/BettingCart.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.module';
import SportBanner from '@/components/betting/components/SportBanner.vue';

const betStore = useBetStore();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();


useHead({
  title: 'Spredly — Онлайн букмекерская контора | Ставки на спорт',
  meta: [
    {
      name: 'description',
      content: 'Spredly — онлайн букмекерская контора. Делайте ставки на спорт с высокими коэффициентами, бонусами новым игрокам и быстрыми выплатами.'
    },
    {
      name: 'keywords',
      content: 'spredly, букмекерская контора, ставки на спорт, онлайн ставки, футбол, теннис, киберспорт'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    { property: 'og:title', content: 'Spredly — Онлайн букмекерская контора' },
    { property: 'og:description', content: 'Ставки на спорт, прямые трансляции и бонусы. Присоединяйтесь к Spredly!' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://spredly.ru/' },
    { property: 'og:image', content: 'https://spredly.ru/og-image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Spredly — Онлайн букмекерская контора' },
    { name: 'twitter:description', content: 'Ставки на спорт, прямые трансляции и бонусы. Присоединяйтесь к Spredly!' },
    { name: 'twitter:image', content: 'https://spredly.ru/og-image.jpg' }
  ],
  link: [
    { rel: 'canonical', href: 'https://spredly.ru/' },
    { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SportsOrganization',
        name: 'Spredly',
        url: 'https://spredly.ru',
        logo: 'https://spredly.ru/logo.png',
        sameAs: [
          'https://t.me/spredly',
          'https://twitter.com/spredly'
        ]
      })
    }
  ]
})
onMounted(async() => {
  await betStore.getSports();
  await betStore.getPeriods();
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

const selectedSection = ref('matchups')

const sectionTitle = computed(() => {
  const sportName = betStore.currentSport?.englishName || "Sport"
  return `${sportName} Odds`
})

const sectionComponent = computed(() => {
  if (route.params.matchId) return BettingEvent
  if (route.params.leagueId) return BettingEvents
  return selectedSection.value === 'leagues' ? BettingLeagues : BettingEvents
})

</script>

<template>
    <div class="betting-grid" :class="['betting-grid', { 'no-cart': !authStore.isAuthenticated }]">
        <BettingSportList class="betting-sports" />
          <div class="betting-events__wrapper">
              <SportBanner v-show="!showSingleEvent" v-model="selectedSection" :title="sectionTitle"/>
              <component
                :is="sectionComponent"
                :key="route.params.matchId || betStore.events"
                class="betting-events"
              />
          </div>
        <BettingCart v-if="authStore.isAuthenticated"/>
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

.betting-sports{
  height: 100%;      
  overflow-y: auto;  
  box-sizing: border-box;
  background-color: var(--eerie-black);
  color: var(--floral-white);
}

.betting-events{
  background-color: var(--eerie-black);
  color: var(--floral-white);
}

.betting-events__wrapper{
  height: 100%;      
  overflow-y: auto;  
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.betting-sports{
  background-color: transparent;
}

.soft-fade-enter-active,
.soft-fade-leave-active {
  transition: opacity 0.1s linear;
}

.soft-fade-enter-from,
.soft-fade-leave-to {
  opacity: 0.95;
}
</style>