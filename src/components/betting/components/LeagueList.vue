<script setup>
import { useBetStore } from '@/store/bet.module';
import { useRoute, useRouter } from 'vue-router';
import UiIcon from '@/ui/UiIcon/UiIcon.vue';

defineProps({
    leagues: Array,
    title: String,
})

const route = useRoute();
const router = useRouter();
const betStore = useBetStore();

const onLeagueClick = (leagueId) => {
  router.push({ name: 'Betting', params: {...route.params, leagueId: leagueId, matchId: '' } })
}
</script>

<template>
    <div class="betting-leagues card">
        <div class="betting-leagues__block-title">{{ title }}</div>
        <div 
            class="betting-leagues__league" 
            v-for="(league, index) in leagues" 
            :key="league.id" 
            @click="onLeagueClick(league.id)"
            :class="{
                'betting-leagues__league--last': index === betStore.leagues.length - 1
            }"
        >
            <div class="betting-leagues__league-content">
                <UiIcon name="league" class="league-icon" />
                <span>&nbsp;</span>
                <div class="betting-leagues__league-name">{{ league.name }}</div>
            </div>
            <div class="betting-leagues__league-event-count">
                {{ league.totalEvents }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.betting-leagues{
    display: flex;
    flex-direction: column;
    font-size: 12px;
    margin-left: 10px;
    border-radius: var(--border-radius-medium);
    overflow: auto;

    &__block-title{
        padding: 10px 20px;
        background-color: var(--black-olive);
        border-radius: var(--border-radius-medium);
        border-end-end-radius: unset;
        border-end-start-radius: unset;
        font-size: 10px;
        font-weight: 600;
        text-transform: uppercase;
    }

    &__league{
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 10px 10px;
        gap: 20px;
        transition: background-color 0.2s ease;
        
        &:hover{
            background-color: var(--timberwolf-15);
        }

        &--last {
            border-bottom-left-radius: var(--border-radius-medium);
            border-bottom-right-radius: var(--border-radius-medium);
        }
    }

    &__league-content{
        display: flex;
        overflow: hidden;
        .league-icon{
            min-width: 16px;
            height: 16px;
        }
    }

    &__league-name{
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__league-event-count{
        color: var(--flame-70)
    }
}
</style>