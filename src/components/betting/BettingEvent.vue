<script setup>
import { useBetStore } from '@/store/bet.module';
import { computed } from 'vue';
import { capitalizer } from '@/utils/core';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const betStore = useBetStore();
const bets = computed(() => betStore.bets)
const event = computed(() => betStore.event)

const getLocDate = (date) => {
  const lDate = new Date(date + "Z").toLocaleString('ru-RU', {  
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: '2-digit', minute: '2-digit', hour12: false 
              });
  return capitalizer(lDate);
}

const onLeagueClick = (leagueId) => {
  router.push({ name: 'Betting', params: {...route.params, leagueId: leagueId, matchId: '' } })
}
</script>

<template>
    <div class="betting-event card">
      <div class="betting-event__match">
          <div class="betting-event__top-info">
            <span class="betting-event__top-league" @click="onLeagueClick(event.league_id)">{{event.league_name}}</span>
          </div>
          <div class="betting-event__info">
              <div>{{event.home_team}}</div>
              <div>{{ event.away_team }}</div>
              <div>{{ getLocDate(event.start_time) }}</div>
          </div>
      </div>
      <div class="betting-event__bets">
          <div v-for="variants, title in bets" :key="title" class="betting-event__bet">
              <div class="betting-event__bet-type">{{ title }}</div>
              <div class="betting-event__bet-variant-wrapper">
                <div class="betting-event__bet-variants" v-for="(variant, index) in variants" :key="index">
                  <div class="betting-event__bet-variant">
                    <div class="betting-event__bet-cell">
                        <span>{{ variant.point ?? '' }}</span>
                        <span class="betting-event__bet-coeff">{{ variant.home_cf }}</span>
                    </div>
                    <div class="betting-event__bet-cell">
                      <span>{{ -variant.point }}</span>
                      <span class="betting-event__bet-coeff">{{ variant.away_cf }}</span>
                    </div>
                  </div>
                </div>
                </div>

          </div>
      </div>
    </div>
  </template>

<style lang="scss" scoped>
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
    background-color: var(--black-olive);
    color: var(--floral-white);
    padding: 10px 15px;
  }

  &__bet-variants{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__bet-variant-wrapper{
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
  }
  
  &__bet-variant{
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }

  &__bet-cell{
    display: flex; 
    flex: 1;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid var(--neutral);
    background-color: var(--black-olive);;

    &:hover{
      border: 1px solid var(--flame);
      cursor: pointer;
    }
  }

  &__bet-coeff{
    color: var(--flame);
  }
}
</style>
