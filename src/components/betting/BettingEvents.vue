<script setup>
import { useBetStore } from '@/store/bet.module';
import { useRoute, useRouter } from 'vue-router';
import LeagueHeader from './components/LeagueHeader.vue';
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { formatOdd, formatTime } from '@/utils/core';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const betStore = useBetStore();

const onEventClick = (matchId, leagueId) => {
  router.push({ name: 'Betting', params: { ...route.params, matchId, leagueId } });
};

const getOddsValue = (obj, key) => (!obj || obj.unavailable || obj.offline ? '—' : formatOdd(obj[key]) ?? '—');

const isLocked = (obj) => !obj || obj.unavailable || obj.offline;

const hasDraw = computed(() => {
  return ['soccer'].includes(betStore.currentSport?.englishName.toLowerCase());
})

</script>

<template>
  <div class="betting-event card">
    <div v-for="league, index in betStore.events.leagues" :key="league.id" class="league-block">
      <LeagueHeader :class="{ 'league-header--first': index === 0 }"
      :leagueName="league.name"
      :hasDraw="hasDraw" />
      <div v-for="event in league.events" :key="event.id" @click="onEventClick(event.id, league.id)" class="match-card">
        <div class="match-card__event">
          <div class="teams">
            <div class="team">
              <UiIcon name="team" class="team-icon" />
              <span>{{ event.participants[0].name }}</span>
            </div>
            <span>&nbsp;-&nbsp;</span>
            <div class="team">
              <UiIcon name="team" class="team-icon" />
              <span>{{ event.participants[1].name }}</span>
            </div>
          </div>
          <span>{{ formatTime(event.time) }}</span>
        </div>

        <div class="match-card__odds odds-grid">
          <template v-for="(period, idx) in event.periods" :key="idx">
            <div class="cell">
              <button class="odd lock" v-if="isLocked(period.moneyLine)">
                <UiIcon class="lock-icon" name="lock"/>
              </button>
              <button class="odd" v-else>{{ getOddsValue(period.moneyLine, 'homePrice') }}</button>
              <template v-if="hasDraw">
                <button class="odd lock" v-if="isLocked(period.moneyLine)">
                  <UiIcon class="lock-icon" name="lock"/>
                </button>
                <button v-else class="odd">{{ getOddsValue(period.moneyLine, 'drawPrice') }}</button>
              </template>

              <button class="odd lock" v-if="isLocked(period.moneyLine)">
                <UiIcon class="lock-icon" name="lock"/>
              </button>
              <button class="odd" v-else>{{ getOddsValue(period.moneyLine, 'awayPrice') }}</button>
            </div>

            <div class="cell">
              <button class="odd col lock" v-if="isLocked(period.handicap[0])">
                <UiIcon class="lock-icon" name="lock"/>
              </button>
              <button class="odd col" v-else>
                <span class="point">{{ period.handicap[period.indexMainLineHdp].homeSpread }}</span>
                <span>{{ getOddsValue(period.handicap[period.indexMainLineHdp], 'homeOdds') }}</span>
              </button>

              <button class="odd col lock" v-if="isLocked(period.handicap[0])">
                <UiIcon class="lock-icon" name="lock"/>
              </button>
              <button class="odd col" v-else>
                <span class="point">{{ period.handicap[period.indexMainLineHdp].awaySpread }}</span>
                <span>{{ getOddsValue(period.handicap[period.indexMainLineHdp], 'awayOdds') }}</span>
              </button>
            </div>

            <div class="cell">
              <button class="odd col lock" v-if="isLocked(period.overUnder[0])">
                <UiIcon class="lock-icon" name="lock"/>
              </button>
              <button class="odd col" v-else>
                <span class="point">{{ period.overUnder[period.indexMainLineOU].points }}</span>
                <span>{{ getOddsValue(period.overUnder[period.indexMainLineOU], 'overOdds') }}</span>
              </button>

              <button class="odd col lock" v-if="isLocked(period.overUnder[0])">
                <UiIcon class="lock-icon" name="lock"/>
              </button>
              <button class="odd col" v-else>
                <span class="point">{{ period.overUnder[0].points }}</span>
                <span>{{ getOddsValue(period.overUnder[0], 'underOdds') }}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.odds-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(130px, 1fr); 
  text-align: center;
  overflow: hidden;

  .cell {
    font-size: 10px;
    padding: 4px 0;
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  .odd-head{
    width: 48px;
  }

  .odd{
    background-color: var(--black-olive);
    width: 48px;
    padding: 8px 0;
    font-size: 12px;
    color: var(--bet-primary);

    border: 1px solid var(--neutral);
    border-radius: var(--border-radius-small);

    &:hover{
      border: 1px solid var(--flame);
    }
  }

  .col{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
  }
}
</style>

<style lang="scss" scoped>

.team-icon{
  width: 16px;
  height: 16px;
}

.betting-event {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  color: var(--floral-white);
}

.event-day {
  display: flex;
  flex-direction: column;
}

.event-date {
  font-size: 12px;
  font-weight: bold;
  padding-bottom: 5px;
  padding: 20px;
}

.match-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  padding-right: 20px;
  border-bottom: 1px solid var(--timberwolf-30);
  cursor: pointer;

  &:first-of-type{
      border-top: 1px solid var(--timberwolf-30);
  }
  
  &__event{
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 20px;
  }

  .teams {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    .team {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;

      span{
        font-size: 12px;
        font-weight: 500;
      }
      
    }
  }

  .time {
    font-size: 12px;
    font-weight: 500;
    color: var(--black-olve);
    white-space: nowrap;
    margin-right: 20px;
  }

  .date-time{
    margin-right: 10px;
  }
}
</style>
