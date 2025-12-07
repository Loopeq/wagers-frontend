<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useTooltip } from '@/use/useTooltip';

defineProps({
  lines: Object,
  homeTeam: String,
  awayTeam: String,
})

const tooltip = useTooltip()
</script>

<template>
<div class="lines__head">
    <div class="lines__th">{{ homeTeam }}</div>
    <div class="lines__th">{{ awayTeam }}</div>
</div>
<div v-for="line in lines" :key="line.lineId" class="lines__bet-variants">
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
            <span class="lines__bet-cell__label">{{ line.homeSpread }}</span>
            <span class="lines__bet-coeff">{{ line.homeOdds }}</span>
        </div>
        <div 
            class="lines__bet-cell"
            :class="{ 'lines__bet-cell--selected': false}"
        >
            <span class="lines__bet-cell__label">{{ line.awaySpread }}</span>
            <span class="lines__bet-coeff">{{ line.awayOdds }}</span>
        </div>
    </div>
</div>
</template>