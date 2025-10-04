<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useBetStore } from '@/store/bet.module';
import { capitalizer } from '@/utils/core';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import UiButtonExtra from '@/ui/UiButtonExtra/UiButtonExtra.vue';
import { useLoginModal } from '@/use/useLoginModal';
import { useRegisterModal } from '@/use/useRegisterModal';
import { useAuthBettingStore } from '@/store/authBetting.module';
import { useProfileModal } from '@/use/useProfileAccount';

const router = useRouter();
const betStore = useBetStore();
const loginModal = useLoginModal();
const registerModal = useRegisterModal();
const authBettingStore = useAuthBettingStore();
const profileModal = useProfileModal(); 

const showMoreSports = ref(false);

const rowRef = ref(null);
const blockWidth = ref(120);
const maxVisible = ref(5);

const onSportChange = (sport) => {
  router.push({ name: 'Betting', params: { sportId: sport.id } });
  betStore.sportId = String(sport.id);
  showMoreSports.value = false;
};

const sportsHavingEvents = computed(() => {
  return betStore.sports.filter((sport) => sport.totalEvents > 0).sort((a, b) => b.totalEvents - a.totalEvents)
});

const visibleSports = computed(() =>
  sportsHavingEvents.value.slice(0, maxVisible.value)
);
const hiddenSports = computed(() =>
  sportsHavingEvents.value.slice(maxVisible.value)
);

const selectedSport = computed(() => betStore.sportId);

let observer;
const recalcVisible = () => {
  if (!rowRef.value) return;
  const rowWidth = rowRef.value.offsetWidth;

  const firstBlock = rowRef.value.querySelector('.header__event-block');
  if (firstBlock) {
    blockWidth.value = firstBlock.offsetWidth || 120;
  }

  const count = Math.floor(rowWidth / blockWidth.value);
  maxVisible.value = count > 1 ? count - 2 : 1;
};

onMounted(() => {
  nextTick(() => {
    recalcVisible();
    observer = new ResizeObserver(recalcVisible);
    if (rowRef.value) observer.observe(rowRef.value);
  });
});

onBeforeUnmount(() => {
  if (observer && rowRef.value) observer.unobserve(rowRef.value);
});
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <UiIcon class="header-logo" name="logo" />
      <div class="header__row" ref="rowRef">
        <div
          v-for="sport in visibleSports"
          :key="sport.id"
          class="header__event-block"
          :class="{ selected: String(selectedSport) === String(sport.id) }"
          @click="onSportChange(sport)"
        >
          <div class="header__row-item">
            <UiIcon :name="sport.name.toLowerCase()" />
            <div class="tool">{{ sport.totalEvents }}</div>
          </div>
          <span>{{ capitalizer(sport.englishName) }}</span>
        </div>

        <div
          v-if="hiddenSports.length > 0"
          class="header__more-btn"
          @click="showMoreSports = !showMoreSports"
        >
          <UiIcon class="icon-more" name="menu" />
          <span class="icon-more--content">+ {{ hiddenSports.length }}</span>

          <transition name="fade-slide">
            <div
              v-if="showMoreSports"
              class="hidden-sport-dropdown"
            >
              <div
                v-for="sport in hiddenSports"
                :key="sport.id"
                class="dropdown-item"
                :class="{ selected: String(selectedSport) === String(sport.id) }"
                @click="onSportChange(sport)"
              >
                <div class="header__row-item">
                  <UiIcon class="icon" :name="sport.englishName.toLowerCase()" />
                  <div class="tool">{{ sport.totalEvents }}</div>
                </div>
                <span>{{ capitalizer(sport.englishName) }}</span>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <template v-if="authBettingStore.isAuthenticated">
        <div class="header__icon-profile-wrapper">
          <UiIcon
            @click="profileModal.open()"
            class="icon-profile"
            name="profile"
          />
        </div>
      </template>
      <template v-else>
        <div class="header__sign-wrapper">
          <UiButtonExtra variant="secondary" @click="loginModal.open()"
            >LOG IN</UiButtonExtra
          >
          <UiButtonExtra variant="primary" @click="registerModal.open()"
            >JOIN</UiButtonExtra
          >
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
    height: 52px;
  }

  &-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
    text-wrap: nowrap;
  }

  &-logo {
    height: 50px;
    width: 160px;
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
    height: 52px;
    gap: 10px;
    justify-content: center;
    align-items: center;
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
