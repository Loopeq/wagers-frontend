<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useTooltip } from '@/use/useTooltip';

defineProps({
  line: Object,
  homeTeam: String,
  awayTeam: String,
})

const tooltip = useTooltip()
</script>

<template>
<div class="lines__bet-variants">
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
            <span class="lines__bet-cell__label">{{ homeTeam }}</span>
            <span class="lines__bet-coeff">{{ line.homePrice }}</span>
        </div>
        <div
            v-if="line.drawPrice"
            class="lines__bet-cell"
            :class="{ 'lines__bet-cell--selected': false}"
        >
            <span class="lines__bet-cell__label">Draw</span>
            <span class="lines__bet-coeff">{{ line.drawPrice }}</span>
        </div>
        <div 
            class="lines__bet-cell"
            :class="{ 'lines__bet-cell--selected': false}"
        >
            <span class="lines__bet-cell__label">{{ awayTeam }}</span>
            <span class="lines__bet-coeff">{{ line.awayPrice }}</span>
        </div>
    </div>
</div>
</template>