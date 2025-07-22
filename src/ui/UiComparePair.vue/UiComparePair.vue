<script setup>
import { defineProps } from 'vue';

defineProps({
    first: {
        type: Number
    },
    second: {
        type: Number,
    }
})
</script>
<template>
<div class="compare-pair">
  <span class="compare-pair__value">{{ first }}</span>
  <template v-if="second !== undefined && second !== null">
    <div class="compare-pair__middle">
      >
    </div>
    <span class="compare-pair__value">{{ second }}</span>
  </template>
</div>
</template>

<style lang="scss" scoped>
.compare-pair {
  display: flex;
  align-items: center;
  justify-content: center;

  &__value {
    display: inline-block;
    width: 35px;
    text-align: center;
  }

  &__middle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
  }
}
</style>