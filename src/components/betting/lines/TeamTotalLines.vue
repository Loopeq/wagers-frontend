<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useTooltip } from '@/use/useTooltip';

defineProps({
  lines: Object,
  homeTeam: String,
  awayTeam: String,
  lineMarker: String,
})

const tooltip = useTooltip()
</script>

<template>
<div class="lines__bet-cluster">
    <div class="lines__head">
        <div class="lines__th">{{ homeTeam }}</div>
    </div>
    <div v-for="line in lines.homeLines" :key="line.lineId" class="lines__bet-variants">
        <div v-if="line.offline || line.unavailable" class="lines__bet-variant">
            <div
                v-for="n in 2"
                :key="n"
                class="lines__bet-cell lines__bet-cell--lock"
                @mouseenter="e => tooltip.show(e, 'Currently offline')"
                @mouseleave="tooltip.hide()"
                >
                <UiIcon class="lock-icon" name="lock" />
            </div>
        </div>
        <div v-else class="lines__bet-variant">
            <div
                class="lines__bet-cell"
                :class="{ 'lines__bet-cell--selected': false}"
            >
                <span class="lines__bet-cell__label">Over {{ line.points }} ({{ lineMarker }})</span>
                <span class="lines__bet-coeff">{{ line.overOdds }}</span>
            </div>
            <div 
                class="lines__bet-cell"
                :class="{ 'lines__bet-cell--selected': false}"
            >
                <span class="lines__bet-cell__label">Under {{ line.points }} ({{ lineMarker }})</span>
                <span class="lines__bet-coeff">{{ line.underOdds }}</span>
            </div>
        </div>
    </div>
    <div class="lines__head--last">
        <div class="lines__th">{{ awayTeam }}</div>
    </div>
    <div v-for="line in lines.awayLines" :key="line.lineId" class="lines__bet-variants">
        <div v-if="line.offline || line.unavailable" class="lines__bet-variant">
            <div
                v-for="n in 2"
                :key="n"
                class="lines__bet-cell lines__bet-cell--lock"
                @mouseenter="e => tooltip.show(e, 'Currently offline')"
                @mouseleave="tooltip.hide()"
                >
                <UiIcon class="lock-icon" name="lock" />
            </div>
        </div>
        <div v-else class="lines__bet-variant">
            <div
                class="lines__bet-cell"
                :class="{ 'lines__bet-cell--selected': false}"
            >
                <span class="lines__bet-cell__label">Over {{ line.points }} ({{ lineMarker }})</span>
                <span class="lines__bet-coeff">{{ line.overOdds }}</span>
            </div>
            <div 
                class="lines__bet-cell"
                :class="{ 'lines__bet-cell--selected': false}"
            >
                <span class="lines__bet-cell__label">Under {{ line.points }} ({{ lineMarker }})</span>
                <span class="lines__bet-coeff">{{ line.underOdds }}</span>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
</style>