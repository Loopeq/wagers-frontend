<script setup>
import { useBetStore } from '@/store/bet.module';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const betStore = useBetStore();

const onLeagueClick = (leagueId) => {
  router.push({ name: 'Betting', params: {...route.params, leagueId: leagueId, matchId: '' } })
}
</script>

<template>
    <div class="betting-leagues card">
        <div class="betting-leagues__league" v-for="league in betStore.leagues" :key="league.id" @click="onLeagueClick(league.id)">
            <div class="betting-leagues__league-name">
                {{ league.name }}
            </div>
            <div class="betting-leagues__league-event-count">
                {{ league.event_count }}
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.betting-leagues{
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &__league{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        gap: 20px;
        font-size: 12px;

        &:hover{
            background-color: var(--neutral);
        }
    }

    &__league-name{
        color: var(--black-olive);
        max-width: 250px;
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    &__league-event-count{
        color: var(--flame-70)
    }
}
</style>