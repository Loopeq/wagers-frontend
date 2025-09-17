<script setup>
import { ref } from 'vue';
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import emptyImage from '@/assets/icons/empty.png';
import BettingCartItem from './components/BettingCartItem.vue';

const tab = ref('cart');

const tabs = [
  { id: 'cart', label: 'Корзина', icon: 'cart' },
  { id: 'history', label: 'История', icon: 'recent'},
];

const isCurrentTab = (inTab) => inTab === tab.value;

const setTab = (inTab) => {
  tab.value = inTab;
};
</script>

<template>
  <div class="betting-cart card">
    <div class="betting-cart__menu">
      <div
        v-for="t in tabs"
        :key="t.id"
        class="betting-cart__menu-section"
        :class="{ 'active': isCurrentTab(t.id) }"
        @click="setTab(t.id)"
      >

        <div class="betting-cart__menu-item">
          <UiIcon class="icon" :name="t.icon"/>
          <span class="betting-cart__menu-title">{{ t.label }}</span>
        </div>
      </div>
    </div>
    <div class="betting-cart__content">
      <div v-if="tab === 'cart'">
        <template v-if="false">
          <div class="betting-cart__empty-content">
            <img class="betting-cart__empty-content-img" :src="emptyImage" alt="empty" loading="lazy">
            <span>Нет активных ставок</span>
          </div>
        </template>
        <template v-else>
          <div class="betting-cart__sections">
            <UiIcon class="icon icon-trash" name="trash"/>
          </div>
          <BettingCartItem />
        </template>
      </div>
      <div v-else-if="tab === 'history'">
        <template v-if='true'>
          <div class="betting-cart__empty-content">
              <img class="betting-cart__empty-content-img" :src="emptyImage" alt="empty" loading="lazy">
              <span>Нет посчитанных ставок</span>
          </div>
        </template>
        <template v-if="false">
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.betting-cart {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 10px;
  font-size: 12px;
  color: var(--floral-white);

  &__menu{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-bottom: 1px solid var(--black-olive);
    padding: 0 20px; 
  }
  
  &__sections{
    display: flex;
    border-bottom: 1px solid var(--black-olive);
    padding: 10px 20px;

  }

  &__menu-section{
    width: 100%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 10px;
    position: relative;
    cursor: pointer;

    &::after{
      content: "";
      background-color: var(--flame);
      pointer-events: none;
      border-radius: .25rem;
      height: 3px;
      opacity: 0;
      transition: background-color .2s ease-in-out, opacity .2s ease-in-out;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }
    
    &.active::after {
      opacity: 1;
    }

    &:hover, &:hover::after{
      color: var(--floral-white);
      opacity: 1;
    }

  }

  &__menu-item{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  &__menu-title{
    align-self: last baseline;
    margin-bottom: 1px;
  }

  .icon{
    width: 20px;
    height: 20px;
  }

  .icon-trash{
    margin-left: auto;
  }

  &__empty-content-img{
    width: 200px;
    aspect-ratio: 1/1;
  }

  &__empty-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span{
      font-size: 14px;
    }
  }
}
</style>
