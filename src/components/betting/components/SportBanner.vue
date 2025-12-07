<script setup>
import { onMounted } from 'vue'
import { useBetStore } from '@/store/bet.module'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String,
  title: String,
})
const router = useRouter();
const route = useRoute();
const betStore = useBetStore();

const sections = [
  { id: 0, title: 'Matchups', code: 'matchups'},
  { id: 1, title: 'Live', code: 'live'},
  { id: 2, title: 'Leagues', code: 'leagues'}
]

onMounted(() => {
  emit('update:modelValue', sections[0].code);
})

const selectSection = (id) => {
  router.push({ name: 'Betting', params: {sportId: route.params?.sportId } })
  emit('update:modelValue', sections[id].code);
}
</script>

<template>
  <div class="sport-banner card">
    <div class="sport-banner__sport">
      {{ title }}
    </div>

    <div class="sport-banner__sections">
      <div
        v-for="section in sections"
        :key="section.id"
        class="sport-banner__section"
        :class="{ 'sport-banner__section--selected': modelValue === section.code }"
        @click="selectSection(section.id)"
      >
        <span class="sport-banner__section-title" :class="{'sport-banner__section-title--live': section.code === 'live'}">{{ section.title }}</span>
        <div 
          v-if="section.code === 'live'" 
          class="live-indicator"
        >
          <div class="live-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sport-banner {
  margin-left: 10px;
  background: var(--gradient-right);
  padding: 30px;
  padding-left: 0;
  padding-bottom: 0;

  &__sport {
    font-size: 20px;
    font-weight: 600;
    color: var(--floral-white);
    padding-left: 25px;
  }

  &__sections {
    margin-top: 10px;
    display: flex;
    padding-left: 5px;
  }

  &__section {
    color: var(--floral-white);
    font-size: 12px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border-bottom: 3px solid transparent;
    opacity: 0.8;
    transition: border-color 0.2s, opacity 0.2s;
    display: flex;

    &:hover {
      cursor: pointer;
      border-bottom-color: var(--flame);
    }

    &--selected {
      border-bottom-color: var(--flame);
      opacity: 1;
    }
  }

  &__section-title {
    display: block;
    padding: 10px 15px;

    &--live{
      padding-right: 8px;
    }
  }
}

.live-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  margin-right: 12px;
}

.live-pulse {
  width: 8px;
  height: 8px;
  background: #28a745;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px rgba(40, 167, 69, 0);
  }
  100% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}
</style>
