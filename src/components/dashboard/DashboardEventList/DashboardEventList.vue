<script setup>
import { defineProps, computed } from 'vue';
import { useBetStore } from '@/store/bet.module';
import DashboardEvent from './DashboardEvent.vue';

defineProps({
  eventList: Array,
})

const betStore = useBetStore();

const onEventClick = (event) => {
    betStore.selectedEventId = event.id;
}
const onPagination = () => { 
    betStore.onPaginationFlag = !betStore.onPaginationFlag;
}

const canPaginate = computed(() => {
    return betStore.pagination.pages > betStore.pagination.current_page 
}) 
</script>

<template>
    <div class="event-list">
        <div 
            v-for="event in eventList" 
            :key="event.id" 
            class="event-list__col" 
            :class="{'selected': betStore.selectedEventId === event.id}"
            @click="onEventClick(event)"
        >   
            <DashboardEvent :event="event"/>
        </div>
        <div v-if="canPaginate" @click="onPagination" class="event-list-pagination">Показать ещё</div>
    </div>
</template>

<style scoped lang="scss">
.event-list-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    font-size: 12px;
    color: var(--black-olive-75);
    cursor: pointer;
}
.event-list{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__league{
        padding-left: 5px; 
        margin-bottom: 5px;
    }
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
        height: 100%;
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

        span{
            font-size: 12px; 
            font-weight: 500;
        }

        &.league{
            font-size: 10px;
        }
    }

    &__right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        flex: 1;
    }
}

</style>