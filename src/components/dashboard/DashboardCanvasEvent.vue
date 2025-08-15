<script setup>
import { useBetStore } from '@/store/bet.module';
import { useMatchResult } from '@/use/useMatchResult';
import { computed } from 'vue';
const betStore = useBetStore();
const event = computed(() => betStore.event)
const eventResult = computed(() => useMatchResult(betStore.eventResult));
</script>

<template>
 <div class="event">
    <div class="event__top">
        <div class="event__teams">
            <span>{{event.home_name}}</span>
            <span>{{event.away_name}}</span>
        </div>
        <div v-if="betStore.eventResult.length" class="event__result">
            <div class="event__result--period" v-for="(period, idx) in eventResult.result" :key='idx'>
                <div :class="{'event__result--lose': period[0] < period[1]}">{{ period[0] }}</div>
                <div :class="{'event__result--lose': period[1] < period[0]}">{{ period[1] }}</div>
            </div>

            <div class="event__result--total">
                <div :class="{'event__result--lose': eventResult.total[0] < eventResult.total[1]}"><span>{{ eventResult.total[0] }}</span></div>
                <div :class="{'event__result--lose': eventResult.total[1] < eventResult.total[0]}"><span>{{ eventResult.total[1] }}</span></div>
            </div>
        </div>
        <div v-else class="event__right">
            <span>{{ $formatDate(event.start_time) }}</span>
        </div>
    </div>
    <div class="event__bottom">
        <div>{{ $formatDate(event.start_time) }}</div>
        <div>{{ event.league_name }}</div>
        <div>id: {{ event.match_id }}</div>
    </div>
</div>

</template>

<style lang="scss" scoped>
.event {
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    gap: 20px;
    border-bottom: 1px solid var(--neutral);

    &__top{
        margin: auto;
        min-width: 350px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__right{
        display: flex;
        align-items: center;
        height: 50px;
        border-left: 1px solid var(--neutral);
        span{
            padding: 20px;
            font-size: 14px;
            font-weight: 500;
        }
    }

    &__result{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        gap: 10px;

        &--period{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 500;
        }

        &--lose{
            color: var(--black-olive-75);
        }

        &--total{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
            height: 100%;
            border-left: 1px solid var(--neutral);
            font-size: 16px;
            
            span{
                margin-left: 20px;
            }
        }
    }

    &__top-league{
        color: var(--black-olive-75);
    }

    &__top-id{
        color: var(--black-olive-75);
    }

    &__teams{
        display: flex;
        flex-direction: column;
        gap: 5px;
        span{
            font-size: 14px;
            font-weight: 500;
        }
    }

    &__bottom{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: var(--black-olive-75);
        font-size: 12px;
    }
}


</style>