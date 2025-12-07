<script setup>
import { useBetStore } from '@/store/bet.module'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import SportList from './components/SportList.vue'

const betStore = useBetStore()
const router = useRouter()

const onSportChange = (sport) => {
  router.push({ name: 'Betting', params: { sportId: sport.id } })
  betStore.sportId = String(sport.id)
}

const sportsHavingEvents = computed(() =>
  betStore.sports
    .filter((sport) => sport.totalEvents > 0)
    .sort((a, b) => b.totalEvents - a.totalEvents)
)

const highlightSports = computed(() =>
  sportsHavingEvents.value
    .filter((sport) => sport.featuresOrder !== -1)
    .sort((a, b) => a.featuresOrder - b.featuresOrder)
)

const selectedSport = computed(() => String(betStore.sportId))
</script>

<template>
  <div class="bettings-sports__wrapper">
    <SportList
      class="card"
      label="TOP SPORTS"
      :sports="highlightSports"
      :selected-sport="selectedSport"
      @select="onSportChange"
    />
    <SportList
      class="card"
      label="ALL SPORTS"
      :sports="sportsHavingEvents"
      :selected-sport="selectedSport"
      @select="onSportChange"
    />
  </div>
</template>


<style lang="scss" scoped>
.bettings-sports__wrapper{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
