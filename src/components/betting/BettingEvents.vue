<script setup>
import { useBetStore } from '@/store/bet.module';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const betStore = useBetStore();

const onEventClick = (matchId) => {
  router.push({ name: 'Betting', params: {...route.params, matchId: matchId } })
}

</script>

<template>
    <div class="betting-event card">
      <div 
        v-for="(leagues, date) in betStore.events" 
        :key="date" 
        class="event-day"
      >
        <h2 class="event-date">{{ date }}</h2>
  
        <div 
          v-for="(matches, leagueName) in leagues" 
          :key="leagueName" 
          class="league-block"
        >
          <h3 class="league-name">{{ leagueName }}</h3>
  
          <div 
            v-for="match in matches" 
            :key="match.id" 
            @click="onEventClick(match.id)"
            class="match-card"
          >
            <div class="teams">
              <span class="team">{{ match.home }}</span>
              <span class="team">{{ match.away }}</span>
            </div>
            <div class="time">
                {{ new Date(match.start_time + "Z").toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false }) }}
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
  margin-left: 10px;
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

.league-block {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.league-name {
  font-size: 12px;
  font-weight: 600;
  padding: 20px 20px;
  background-color: var(--black-olive);
}

.match-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--timberwolf-30);

    cursor: pointer;

    &:hover{
        background-color: var(--timberwolf-15);
    }

    &:first-of-type{
        border-top: 1px solid var(--timberwolf-30);
    }

  .teams {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 20px;

    .team {
      font-size: 12px;
      font-weight: 500;
    }
  }

  .time {
    font-size: 12px;
    font-weight: 500;
    color: var(--black-olve);
    white-space: nowrap;
    margin-right: 20px;
  }
}
</style>
