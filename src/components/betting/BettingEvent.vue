<script setup>
import { useBetStore } from '@/store/bet.module';
import { computed, ref, watch } from 'vue';
import { formatTime } from '@/utils/core';
import { useRoute, useRouter } from 'vue-router';
import MatchNotFound from './fallbacks/MatchNotFound.vue';
import MoneyLines from './lines/MoneyLines.vue';
import HandicapLines from './lines/HandicapLines.vue';
import TotalLines from './lines/TotalLines.vue';
import TeamTotalLines from './lines/TeamTotalLines.vue';
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
const MARKET_TYPES = ['normal', 'pointsMarkets', 'setMarkets', 'matchMarkets', 'match180Markets', 'gameMarkets', 'kills']
const LINE_TYPES = ['moneyLine', 'handicap', 'overUnder', 'teamTotals']
const router = useRouter();
const route = useRoute();
const betStore = useBetStore();
const bets = computed(() => betStore.bets);
const info = computed(() => bets.value?.info);
const startTime = computed(() => formatTime(bets.value?.normal?.time));
const participants = computed(() => bets.value?.normal?.participants);
const homeTeam = computed(() => participants.value?.[0]?.englishName);
const awayTeam = computed(() => participants.value?.[1]?.englishName);

const MARKET_ALIASED = {
  handicap: 'Handicap',
  moneyLine: 'Moneyline',
  overUnder: 'Total',
  teamTotals: 'Team Total',
};

const onLeagueClick = (leagueId) => {
  router.push({ name: 'Betting', params: {...route.params, leagueId: leagueId, matchId: '' } })
}

const extractPeriods = (periods) => {
  const result = {};
  LINE_TYPES.forEach((key) => {
    if (periods[key] !== undefined) {
      result[key] = periods[key];
    }
  });
  return result;
};

const expandedLines = ref({});

const toggleLine = (marketType, periodNumber, lineType) => {
  const key = `${marketType}-${periodNumber}-${lineType}`;
  expandedLines.value[key] = !expandedLines.value[key];
}

const isExpanded = (marketType, periodNumber, lineType) => {
  const key = `${marketType}-${periodNumber}-${lineType}`;
  return !expandedLines.value[key];
}

const isAnyExpanded = computed(() => {
  return Object.values(expandedLines.value).some(v => v);
});

const toggleAll = () => {
  const expand = !Object.values(expandedLines.value).some(v => v);
  Object.keys(expandedLines.value).forEach(key => {
    expandedLines.value[key] = expand;
  });
};

watch(
  bets,
  (newBets) => {
    if (!newBets) return;

    MARKET_TYPES.forEach(marketType => {
      const periodsObj = newBets[marketType]?.periods;
      if (!periodsObj) return;

      Object.entries(periodsObj).forEach(([periodNumber, period]) => {
        Object.keys(extractPeriods(period)).forEach(lineType => {
          const key = `${marketType}-${periodNumber}-${lineType}`;
          if (!(key in expandedLines.value)) {
            expandedLines.value[key] = false;
          }
        });
      });
    });
  },
  { immediate: true }
);

const selectedPeriod = ref('all')

// Собираем все периоды из всех маркетов и сортируем
const periodsList = computed(() => {
  if (!bets.value) return []
  const periodSet = new Set()

  MARKET_TYPES.forEach(marketType => {
    const periodsObj = bets.value[marketType]?.periods
    if (!periodsObj) return

    Object.keys(periodsObj).forEach(periodNumber => {
      periodSet.add(periodNumber)
    })
  })

  const sorted = Array.from(periodSet).sort((a, b) => Number(a) - Number(b))

  return ['all', ...sorted]
})

const setSelectedPeriod = (period) => {
  selectedPeriod.value = period
}

const filteredBets = computed(() => {
  if (!bets.value) return {}
  if (selectedPeriod.value === 'all') return bets.value

  const copy = {}
  for (const marketType of MARKET_TYPES) {
    const m = bets.value[marketType]
    if (!m?.periods?.[selectedPeriod.value]) continue

    copy[marketType] = {
      ...m,
      periods: {
        [selectedPeriod.value]: m.periods[selectedPeriod.value]
      }
    }
  }
  return copy
})
</script>

<template>
    <div class="betting-event card">
      <template v-if="betStore.bets.info">
        <div class="betting-event__match">
            <div class="betting-event__top-info">
              <span class="betting-event__top-league" @click="onLeagueClick(event.league_id)">{{info?.leagueName}}</span>
            </div>
            <div v-if="participants?.length" class="betting-event__info">
                <div>{{ homeTeam }}</div>
                <div>{{ awayTeam }}</div>
                <div>{{ startTime }}</div>
            </div>
        </div>
        <div class="betting-event__sections">
            <div class="betting-event__markets">
                <div
                  v-for="period in periodsList"
                  :key="period"
                  class="betting-event__market"
                  :class="{ 'betting-event__market--selected': selectedPeriod === period }"
                  @click="setSelectedPeriod(period)"
                >
                  <span class="betting-event__market-title">{{ period === 'all' ? 'All' : betStore.periodsBySport?.[info.sportId]?.[period]?.[0] }}</span>
                </div>
            </div>
            <div 
              class="betting-event__expand-button"
              @click="toggleAll"
            >
              {{ !isAnyExpanded ? 'Hide All' : 'Show All' }}
            </div>
        </div>
        <div class="betting-event__bets">
          <template v-for="marketType in MARKET_TYPES" :key="marketType">
            <template v-if="filteredBets[marketType]">
              <template 
                  v-for="period, periodNumber in filteredBets[marketType].periods"
                  :key="periodNumber"
                  >
                <template v-for="lines, lineType in extractPeriods(period)" :key="lineType">
                  <div class="betting-event__bet">
                    <div class="betting-event__bet-type" @click="toggleLine(marketType, periodNumber, lineType)">
                      <span>{{ MARKET_ALIASED[lineType] }} ({{bets[marketType].resultingUnit}}) - {{ betStore.periodsBySport?.[info.sportId]?.[periodNumber]?.[0] }}</span>
                      <UiIcon 
                        class="arrow-icon" 
                        :class="{ 'arrow-icon--expanded': !isExpanded(marketType, periodNumber, lineType) }" 
                        name="arrow-up"
                      />
                    </div>
                    <Transition name="collapse">
                      <div v-show="isExpanded(marketType, periodNumber, lineType)" class="betting-event__bet-variant-wrapper">
                        <MoneyLines v-if="lineType === 'moneyLine'" :line="lines" :homeTeam="homeTeam" :awayTeam="awayTeam" />
                        <HandicapLines v-if="lineType === 'handicap'" :lines="lines" :homeTeam="homeTeam" :awayTeam="awayTeam" />
                        <TotalLines v-if="lineType === 'overUnder'" :lines="lines" :line-marker="bets[marketType].resultingUnit" />
                        <TeamTotalLines v-if="lineType === 'teamTotals'" :lines="lines" :line-marker="bets[marketType].resultingUnit" :homeTeam="homeTeam" :awayTeam="awayTeam" />
                      </div>
                    </Transition>
                  </div>
                </template>
              </template>
            </template>
          </template>
        </div>
      </template>
      <template v-else>
        <MatchNotFound />
      </template>
    </div>
  </template>

<style lang="scss" scoped>
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 1000px;
  opacity: 1;
}
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.15s ease, opacity 0.15s ease;
}

.betting-event {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10px;
  font-size: 12px;

  &__match{
    display: flex;
    flex-direction: column;
    color: var(--floral-white);
  }

  &__top-info{
    padding: 10px 15px;
    background-color: var(--eerie-black);
    border-radius: var(--border-radius-small);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  } 

  &__top-league{
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }

  &__info{
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    gap: 5px;
    background-color: var(--black-olive);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &__sections {
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__expand-button{
    cursor: pointer;
    width: fit-content;
    padding: 5px 20px;
    border: 1px solid var(--neutral);
    background-color: var(--black-olive);
    margin-left: auto;
    user-select: none;
    border-radius: var(--border-radius-small);

    &:hover{
      cursor: pointer;
      background-color: var(--timberwolf-15);
    }
  }

  &__bets { 
    column-count: 2; 
    column-gap: 10px; 
    padding-left: 10px; 
    padding-right: 10px; 
    padding-bottom: 10px; 
    > * { display: inline-block; width: 100%; margin-bottom: 10px; break-inside: avoid; } }

  &__bet{
    display: flex;
    flex-direction: column;
    border: 1px solid var(--black-olive);
  }

  &__bet-type{
    background-color: var(--black-secondary);
    color: var(--floral-white);
    padding: 10px 15px;
    cursor: pointer;
    user-select: none;
    display: flex;

    .arrow-icon {
      width: 10px;
      margin-left: auto;
      color: var(--floral-white);
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .arrow-icon--expanded {
      transform: rotate(180deg); 
    }
  }

  &__bet-variant-wrapper{
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
  }

  &__markets {
    display: flex;
  }

  &__market {
    color: var(--floral-white);
    font-size: 10px;
    text-transform: uppercase;
    border-bottom: 3px solid transparent;
    opacity: 0.8;
    transition: border-color 0.2s, opacity 0.2s;

    &:hover {
      cursor: pointer;
      border-bottom-color: var(--flame);
    }

    &--selected {
      border-bottom-color: var(--flame);
      opacity: 1;
    }
  }

  &__market-title {
    display: block;
    padding: 10px 15px;
  }
}
</style>
