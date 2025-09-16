<script setup>
import { useMovementStore } from '@/store/movement.module';
import DashboardEvent from './DashboardEventList/DashboardEvent.vue';

const movementStore = useMovementStore();
</script>

<template>

<div class="canvas-history">
    <div class="canvas-history__teams">
        <div class="canvas-history__team">
            <div class="canvas-history__team-name">{{ movementStore.event.home_name }}</div>
            <template v-if="movementStore.eventHistory?.home?.length">
                <div class="canvas-history__events">
                    <DashboardEvent 
                        class="canvas-history__event" 
                        v-for="event in movementStore.eventHistory?.home" 
                        :key="event.id" 
                        :event="event"
                        :show-league="false" 
                    />
                </div>
            </template>
            <template v-else>
                <div class="canvas-history__event-empty">Матчей не найдено</div>
            </template>
        </div>
        <div class="canvas-history__team">
            <div class="canvas-history__team-name">{{ movementStore.event.away_name }}</div>
            <template v-if="movementStore.eventHistory?.away?.length">
                <div class="canvas-history__events">
                    <DashboardEvent 
                        class="canvas-history__event" 
                        v-for="event in movementStore.eventHistory?.away" 
                        :key="event.id" 
                        :event="event"
                        :show-league="false"
                    />
                </div>
            </template>
            <template v-else>
                <div class="canvas-history__event-empty">Матчей не найдено</div>
            </template>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.canvas-history{
    font-weight: 600;
    font-size: 12px;
    text-align: center;
    
    &__teams{
        padding: 30px;
        display: flex;
        width: 100%;
    }

    &__team{
        flex: 1;
        text-align: center;
        border-collapse: collapse;

        &:first-child{
            border-right: 1px solid var(--neutral);
        }
    }

    &__team-name{
        padding-bottom: 5px;
        border-bottom: 1px solid var(--neutral);
    }

    &__events{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 0 0 0;
        font-size: 10px;
    }

    &__event{
        padding: 10px 20px 10px 0;
        border-bottom: 1px solid var(--neutral);

        &:hover{
            background-color: var(--surface);;
            cursor: pointer;
        }
    }

    &__event-empty{
        padding: 10px 0 10px 0;
        font-weight: 500;
    }

}
</style>