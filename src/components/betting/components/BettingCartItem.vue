<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useBetStore } from '@/store/bet.module';
import { computed } from 'vue';
import { overNull } from '@/utils';
import { useRoute, useRouter } from 'vue-router';
import UiInputExtra from '@/ui/UiInputExtra/UiInputExtra.vue';

const router = useRouter();
const route = useRoute();
const betStore = useBetStore();
const cart = computed(() => betStore.betCart);

const removeItemFromCart = (id) => {
  betStore.removeItemFromCart(id);
}

const getCoeff = (item) => {
  const home = item.bet.home_cf;
  const away = item.bet.away_cf;

  return overNull(item.side ? away : home);
}

const onEventClick = (eventId) => {
  router.push({ name: 'Betting', params: {...route.params, matchId: eventId } })
}
</script>

<template>
  <div v-for='item in cart' :key="item.id" class="betting-cart-item card">
    <div class="betting-cart-item__head">
      <UiIcon class="icon" name="tennis" />
      <div class="betting-cart-item__league">{{ item.bet.match.league.name }}</div>
      <UiIcon @click="removeItemFromCart(item.id)" class="icon-trash" name="remove" />
    </div>
    <div class="betting-cart-item__bet-wrapper">
      <div class="betting-cart-item__bet">{{ item.bet.period.name }}</div>
      <div class="betting-cart-item__bet-coeff">{{ getCoeff(item) }}</div>
    </div>
    <div class="betting-cart-item__parts" @click="onEventClick(item.bet.match.id)">
      <div class="betting-cart-item__part">{{ item.bet.match.members.home.name }}</div>
      <div class="betting-cart-item__part">{{ item.bet.match.members.away.name }}</div>
    </div>
    <div class="betting-cart-item__inputs">
      <UiInputExtra class="betting-cart-item__input" placeholder="Stake"/>
      <UiInputExtra class="betting-cart-item__input" placeholder="Win"/>
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

  &__inputs{
    display: flex;
    gap: 5px;
    margin-top: 5px;
  }

  &__input{
    width: auto;
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

    &:hover{
      cursor: pointer;
    }
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
