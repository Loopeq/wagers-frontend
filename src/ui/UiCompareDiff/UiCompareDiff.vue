<script setup>
import { computed, defineProps } from 'vue';
import UiIcon from '../UiIcon/UiIcon.vue';
import { threshhold } from '@/constants';

const props = defineProps({
    diff: {
        type: Number,
    },
    type: {
        type: String // coeff | point | limit
    },
})

const directionClass = computed(() => {
    return props.diff >= 0 ? 'up' : 'down'
})

const betShade = computed(() => {
    const shadeClass = threshhold[props.type].find((val) => props.diff > val.min && props.diff <= val.max).class;
    return shadeClass
})

</script>

<template>
<div class="compare-diff">
    <template v-if="diff">
        <span :class="betShade">{{ diff }}</span>
        <UiIcon class="compare-diff__direction" :class="[directionClass, betShade]" name="arrow"/>
    </template>
    <template v-else>
        <span>-</span>
    </template>
</div>
</template>

<style lang="scss" scoped>
.compare-diff{
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    &__direction{
        width: 10px;
        height: 10px;

        &.up{
            rotate: 180deg;
        }

        &.down{
            rotate: 0deg;
        }
    }
}
</style>