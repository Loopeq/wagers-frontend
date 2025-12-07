<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { ref, onBeforeUnmount } from 'vue';
import UiLink from '@/ui/UiLink/UiLink.vue';
import { useAuthStore } from '@/store/auth.module';
import { useProfileModal } from '@/use/useProfileAccount';

const authStore = useAuthStore();
const profileModal = useProfileModal(); 

const rowRef = ref(null);

onBeforeUnmount(() => {
  if (observer && rowRef.value) observer.unobserve(rowRef.value);
});


const onLoginInit = async () => {
  const url = `https://t.me/spredly_bot`;
  window.open(url, '_blank');
}
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
        <div class="header-logo__wrapper">
          <UiIcon class="header-logo" name="logo" />
        </div>
      <div class="header__row" ref="rowRef">
      </div>
      <template v-if="authStore.isAuthenticated">
        <div class="header__icon-profile-wrapper">
          <UiIcon
            @click="profileModal.open()"
            class="icon-profile"
            name="profile"
          />
            <UiLink type="submit" class="header__deposit" link="https://pay.cryptocloud.plus/pos/SbFEQUJUo0yApJXX">Deposit</UiLink>
        </div>
      </template>
      <template v-else>
        <div class="header__sign-wrapper">
          <UiLink @click="onLoginInit" class="header__sign"><span class="header__sign-text">Login via Telegram</span></UiLink>
        </div>
      </template>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--eerie-black);
}

.icon-profile {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  cursor: pointer;
}

.icon-more {
  width: 25px;
  height: 25px;
  margin-right: 5px;
  color: var(--floral-white);
}

.header {
  width: 100%;
  padding: var(--container-padding);
  position: fixed;
  z-index: 2;

  &__deposit{
    margin-left: 20px;
  }

  &__more-btn {
    display: flex;
    align-items: center;
    margin: auto 0; 
    cursor: pointer;
    position: relative;
  }

  &__icon-profile-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
    padding: 10px 0px;
    text-wrap: nowrap;
  }

  &-logo__wrapper{
    display: flex; 
    align-items: center;
    justify-content: center;
    align-self: center;
  }

  &-logo {
    width: 200px;
    height: auto;
  }

  &-title{
    font-weight: 400;
    font-size: 35px;
  }

  &__row {
    display: flex;
    align-items: flex-end;
    flex: 1;
  }

  &__row-item {
    display: flex;
    align-items: center;
    gap: 5px;

    .icon {
      width: 1.3rem;
      height: 1.3rem;
    }
    .tool {
      background-color: black;
      padding: 0px 5px;
      font-size: 10px;
      font-weight: 700;
      color: white;
      border-radius: var(--border-radius-medium);
    }
  }

  &__event-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 10px 20px 5px 20px;
    transition: all 0.2s;
    border-bottom: 5px solid transparent;

    span {
      font-size: 12px;
      font-weight: 700;
    }

    &:hover {
      background-color: var(--timberwolf-15);
      cursor: pointer;
    }
    &.selected {
      background-color: var(--timberwolf-15);
      border-bottom: 5px solid var(--flame);
    }
  }

  &__sign-wrapper {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  &__sign{
    width: 120px;
  }

  &__sign-title{
    font-size: 14px;
  }
}

/* dropdown */
.hidden-sport-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--eerie-black);
  border: 1px solid var(--timberwolf-30);
  border-radius: var(--border-radius-medium);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 5px;
  z-index: 5;
}

.dropdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 8px;
  border-radius: var(--border-radius-medium);
  transition: background 0.2s;

  span {
    font-size: 12px;
    font-weight: 600;
  }

  &:hover {
    background-color: var(--timberwolf-15);
  }

  &.selected {
    background-color: var(--timberwolf-15);
    border-bottom: 3px solid var(--flame);
  }
}

/* анимация */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
