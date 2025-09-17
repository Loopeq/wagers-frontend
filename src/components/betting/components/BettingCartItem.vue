<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';

</script>

<template>
  <div class="betting-cart-item card">
    <div class="betting-cart-item__head">
      <UiIcon class="icon" name="tennis" />
      <div class="betting-cart-item__league">ITF Men Guiyang - R16</div>
      <UiIcon class="icon-trash" name="remove" />
    </div>
    <div class="betting-cart-item__bet-wrapper">
      <div class="betting-cart-item__bet">Money Line (Sets) - 1st Set</div>
      <div class="betting-cart-item__bet-coeff">2.300</div>
    </div>
    <div class="betting-cart-item__parts">
      <div class="betting-cart-item__part">Yaojie Zeng</div>
      <div class="betting-cart-item__part">Xiaofei Wang</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.betting-cart-item{
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-bottom: 0px;

  &__head{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 7px;
    background-color: var(--black-olive);
    opacity: 0.8;
  }

  &__bet-wrapper{
    display: flex;
    justify-content: space-between;
    padding: 5px 7px;
    align-items: center;
    background-color: var(--black-secondary);
  }

  &__league{
    margin: 0px 5px;
  }

  &__parts{
    display: flex;
    flex-direction: column;
    background-color: var(--black-olive);
    padding: 5px 7px;
    gap: 5px;
  }
}

.icon{
  width: 16px;
  height: 16px;
}

.icon-trash{
  width: 20px;
  height: 20px;
  margin-left: auto;

  &:hover{
    cursor: pointer;
  }
}
</style>
