<script setup>
import { sorts } from '@/constants';
import UiSwitch from '@/ui/UiSwitch/UiSwitch.vue';
import {ref, watch, onMounted, computed} from 'vue';
import { useBetStore } from '@/store/bet.module';
import UiSelect from '@/ui/UiSelect/UiSelect.vue';

const betStore = useBetStore(); 
const sortId = ref(null);
const isFilterSelectVisible = ref(false);

onMounted(() => {
  sortId.value = sorts.find((val) => val.code === betStore.relatedParams.sort_by).id;
});

watch(sortId, (value) => {
  const current = sorts.find((sort) => sort.id === value);
  if (current) {
    betStore.relatedParams.sort_by = current.code;
    betStore.relatedParams.sort_order = current.order;
  }
});

const setFilter = (type) => {
  if (type === 'all') {
    betStore.relatedParams.finished = null;
    betStore.relatedParams.hours = null;
    betStore.relatedParamsViewMode = 'all';
  } else if (type === 'finished') {
    betStore.relatedParams.finished = true;
    betStore.relatedParams.hours = null;
    betStore.relatedParamsViewMode = 'finished';
  } else if (type === 'until') {
    betStore.relatedParams.finished = false;
    betStore.relatedParams.hours = 1;
    betStore.relatedParamsViewMode = 'until';
  }
};

const allSelected = computed(() => betStore.relatedParamsViewMode === 'all');
const finishedSelected = computed(() => betStore.relatedParamsViewMode === 'finished');
const untilSelected = computed(() => betStore.relatedParamsViewMode === 'until');

</script>

<template>
<div class="event-settings">
    <div class="event-settings__main">
        <div 
            class="event-settings__variant" 
            @click="() => setFilter('all')" 
            :class="{ 'selected': allSelected }">
            <span>Все</span>
        </div>
        <div 
            class="event-settings__variant" 
            @click="() => setFilter('finished')" 
            :class="{ 'selected': finishedSelected }">
            <span>Завершенные</span>
        </div>
        <div 
            class="event-settings__variant" 
            @click="() => setFilter('until')" 
            :class="{ 'selected': untilSelected }">
            <span>По времени</span>
        </div>
        <div class="event-settings__variant selected ma filled" @click.stop="isFilterSelectVisible = true">
            <UiSelect v-model="sortId" v-model:isSelectVisible="isFilterSelectVisible" :items="sorts" />
        </div>
    </div>
    <div class="event-settings__bottom">
        Включать матчи без движений
        <UiSwitch v-model="betStore.relatedParams.nulls"/>
    </div>
</div>
</template>

<style lang="scss">

.event-settings{
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__main{
        display: flex; 
        gap: 5px;
        border-bottom: 1px solid var(--neutral);
    }
    &__variant{ 
        display: inline-block;
        margin-block: 0px;
        margin-inline: 0px;
        opacity: .7;
        font-size: 12px;
        font-weight: 700;
        color: var(--flame);
        padding: 16px;
        border-bottom: 2px solid transparent;

        cursor: pointer;

        &.selected{
            color: var(--flame);
            opacity: 1;
            border-bottom: 2px solid var(--flame-70);
        }

        &.ma{
            margin-left: auto;
        }

        &.filled{
            box-shadow: 0 0.1em 0.3em rgba(0,0,0,0.3);
        }
    }

    &__sort{
        margin-left: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__bottom{
        display: flex; 
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 5px 10px;
        font-size: 12px;
        font-weight: 500;
        background-color: var(--surface);
        padding: 10px 16px;
        border-radius: var(--border-radius-small);
    }
}
</style>