
<script setup>
import { defineProps } from 'vue';
import { useMovementStore } from '@/store/movement.module';

const movementStore = useMovementStore();

defineProps({
    event: {
        type: Object,
    },
    showLeague: {
        type: Boolean,
        default: true,
    }
})
</script>

<template>
<div class="event-card__card" @click="movementStore.selectedEventId = event.id">
    <div class="event-card__move-timer__wrapper">
        <div class="event-card__move-timer">
            <span class="event-card__move-timer date">{{ $formatDate(event.last_update) }}</span>
            <span class="event-card__move-timer number">{{ event.change_count }}</span>
        </div>
    </div>
    <div class="event-card__teams">
        <span v-if="showLeague" class="event-card__teams--league">{{ event.league_name }}</span>
        <span>{{ event.home_name }}</span>
        <span>{{ event.away_name }}</span>
    </div>
    <div class="event-card__right">
        <div class="event-card__bottom-option">
            <span>{{ $formatDate(event.start_time) }}</span>
        </div>
        
    </div>
</div>
</template>


<style lang="scss" scoped>
.event-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__col{
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid var(--neutral);
        cursor: pointer;

        &.selected{
            background-color: var(--surface);
        }
    }

    &__card{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        height: 100%;
    }

    &__move-timer__wrapper{
        width: 50px;
        margin-right: 10px;
        border-right: 1px solid var(--neutral);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &__move-timer{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;        
        font-weight: 500;

        &.number{
            color: var(--flame);
            font-weight: 900;
        }
        
        &.date{
            text-align: center;
        }
    }

    &__teams{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: 100%;
        gap: 1px;

        &--league{
            font-size: 10px !important;
            color: var(--black-olive-75)
        }

        span{
            font-size: 12px; 
            font-weight: 500;
        }
    }

    &__right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        flex: 1;
        color: var(--black-olive-75);
    }
}
</style>