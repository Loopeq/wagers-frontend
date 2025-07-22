<script setup>
import DashboardEventList from './DashboardEventList/DashboardEventList.vue';
import DashboardEventSettings from './DashboardEventSettings.vue';
import { defineProps } from 'vue';
defineProps({
  events: Object,
})
</script>

<template>
<div class="event-col card">
  <DashboardEventSettings />
  <DashboardEventList v-if="events" class="event-list-container" :event-list="events"/>
</div>
</template>

<style scoped lang="scss">
.event-col{
    display: flex;
    flex-direction: column;
    margin: 20px 0px;

    &__settings-wrapper{
      position: relative;
      width: 100%;
    }
    &__settings{
      border: 1px solid rgba(128, 128, 128, 0.5);
      width: 100%;
      height: 45px;
    }
}

.ui-sort-container{
    margin-top: 10px;
}

.ui-checkbox-container{
    margin-top: 10px;
}

.ui-input-container{
    margin-top: 10px;
}

.event-list-container{
    margin-top: 10px;
}
</style>