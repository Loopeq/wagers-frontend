<script setup>
import { defineProps } from 'vue';
defineProps({
  leagueName: String,
})
</script>

<template>
  <div class="league-header">
    <div class="league-header__col">
      <span class="league-header__name">{{ leagueName }}</span>
    </div>
    <div class="odds-grid league-header__table uppercase">
      <div class="cell">Moneyline</div>
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

  &__col{
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
}
</style>