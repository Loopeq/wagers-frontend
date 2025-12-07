<script setup>
import { useBetStore } from '@/store/bet.module';
import LeagueList from './components/LeagueList.vue';
import { computed } from 'vue';

const betStore = useBetStore();

const featuresLeagues = computed(() => betStore.leagues.filter((league) => league.featuresOrder !== -1).sort((a, b) => a.featuresOrder - b.featuresOrder));
</script>

<template>
    <div class="betting-leagues-wrapper">
        <LeagueList :leagues="featuresLeagues" title="Top leagues"/>
        <LeagueList :leagues="betStore.leagues" title="All leagues"/>
    </div>
</template>

<style lang="scss" scoped>
.betting-leagues-wrapper{
    display: flex; 
    flex-direction: column;
    gap: 10px;
    background-color: unset !important;
}
</style>