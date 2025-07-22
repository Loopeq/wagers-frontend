<script setup>
import { useBetStore } from '@/store/bet.module';
import { computed } from 'vue';
const betStore = useBetStore();
const event = computed(() => betStore.event)
const matchResult = computed(() => betStore.eventResult);
</script>

<template>
 <div class="event">
    <div class="event__top-row">
        <div class="event__top-league">{{ event.league_name }}</div>
        <div class="event__top-id">id: {{ event.match_id }}</div>
    </div>
    <div class="event__teams">
        <span>
            {{event.home_name}}
        </span>
        <template v-if="matchResult.length">
            <span class="event__teams divider">-</span>
        </template>
        <template v-else>
            <span class="event__teams divider">
                {{ $formatDate(event.start_time ) }}
            </span>
        </template>

        <span>
            {{event.away_name}}
        </span>
    </div>

</div>
</template>

<style lang="scss" scoped>
.event {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90px;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--neutral);

    &__top-row{
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 500;
      
    }

    &__top-league{
        color: var(--black-olive-75);
    }

    &__top-id{
        color: var(--black-olive-75);
    }

    &__teams{
        display: flex;
        span{
            font-size: 14px;
            font-weight: 500;
        }
        &.divider{
            text-align: center;
            width: auto;
            margin: 0 50px;
        }
    }
}


</style>