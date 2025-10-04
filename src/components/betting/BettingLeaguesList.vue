<script setup>
import { useBetStore } from '@/store/bet.module';
import { useRoute, useRouter } from 'vue-router';
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useTooltip } from '@/use/useTooltip';

const tooltip = useTooltip();
const route = useRoute();
const router = useRouter();
const betStore = useBetStore();

const onLeagueClick = (leagueId) => {
  router.push({ name: 'Betting', params: {...route.params, leagueId: leagueId, matchId: '' } })
}
</script>

<template>
    <div class="betting-leagues card">
        <div class="betting-leagues__block-title">Leagues A-Z</div>
        <div 
            class="betting-leagues__league" 
            v-for="league in betStore.leagues" 
            :key="league.id" 
            @click="onLeagueClick(league.id)"
            @mouseenter="e => tooltip.show(e, league.name)"
            @mouseleave="tooltip.hide()"
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

    &__league{
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        gap: 20px;
        &:hover{
            background-color: var(--timberwolf-15);
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

    &__block-title{
        padding: 10px 10px;
        background-color: var(--black-olive);
    }
}
</style>