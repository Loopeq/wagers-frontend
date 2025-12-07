<script setup>
import { defineProps, defineEmits } from 'vue'
import UiIcon from '@/ui/UiIcon/UiIcon.vue'
import { capitalizer } from '@/utils/core'

const props = defineProps({
  sports: {
    type: Array,
    required: true
  },
  selectedSport: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false,
  }
})

const emit = defineEmits(['select'])

const onClick = (sport) => {
  emit('select', sport)
}
</script>

<template>
  <div class="bettings-sports">
    <div class="bettings-sports__label"> {{ label }} </div>
    <div
      v-for="sport in sports"
      :key="sport.id"
      class="bettings-sports__event-block"
      :class="{ selected: selectedSport === String(sport.id) }"
      @click="onClick(sport)"
    >
      <UiIcon class="bettings-sports__sport-icon" :name="sport.name.toLowerCase()" />
      <span class="bettings-sports__event-name">{{ capitalizer(sport.englishName) }}</span>
      <span class="bettings-sports__event-count">{{ sport.totalEvents }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sport-icon{
    width: 15px;
}
.bettings-sports {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 600;

  &__label{
    padding: 10px;
    border-bottom: 1px solid var(--black-olive);
  }

  &__event-count{
    margin-left: auto;
    color: var(--floral-white);
  }

  &__sport-icon{
    width: 15px;
    height: 15px;
  }

  &__block-title {
    padding: 10px;
    background-color: var(--black-olive);
    font-weight: 500;
  }

  &__event-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 10px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: var(--timberwolf-15);
    }

    &.selected {
      color: var(--flame-secondary);
      .icon{
        color: var(--floral-white);
      }
    }
  }
}
</style>