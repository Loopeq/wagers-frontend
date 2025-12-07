<script setup>
import { defineProps } from 'vue';
defineProps({
  leagueName: String,
  hasDraw: Boolean,
})
</script>

<template>
  <div class="league-header">
    <div class="league-header__col">
      <span class="league-header__name">{{ leagueName }}</span>
    </div>
    <div class="odds-grid league-header__table">
      <div v-if="hasDraw" class="cell">
        <div class="odd-head">1</div>
        <div class="odd-head">X</div>
        <div class="odd-head">2</div>
      </div>
      <div v-else class="cell">Moneyline</div>
      <div class="cell">Handicap</div>
      <div class="cell">
        <div class="odd-head">Over</div>
        <div class="odd-head">Under</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.league-header {
  padding: 5px 20px;
  background-color: var(--black-olive);
  font-size: 10px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .uppercase{
    text-transform: uppercase;
    font-size: 8px !important;
  }

  &--first{
    border-radius: var(--border-radius-medium);
    border-end-end-radius: unset;
    border-end-start-radius: unset;
  }

  &__col{
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
}
</style>