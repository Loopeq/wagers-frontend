<script setup>
import {defineProps} from 'vue';
import UiComparePair from '../UiComparePair.vue/UiComparePair.vue';
import UiCompareDiff from '../UiCompareDiff/UiCompareDiff.vue';

defineProps({
  items: Array,
  showStartDate: Boolean,
})

</script>

<template>
<div class="bets-table-wrapper">
<table class="bets-table">
    <thead>
    <tr>
        <th class="left">Период</th>
        <th>фт</th>
        <th>-</th>
        <th>дом</th>
        <th>-</th>
        <th>гость</th>
        <th>-</th>
        <th>лимит</th>
        <th>-</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="index">
        <td class="left">{{ item.title }}</td>
        <td><UiComparePair :first="item.points?.start" :second="item.points.end"/></td>
        <td><UiCompareDiff type="point" :diff="item.pointDiff?.diff" /></td>
        <td><UiComparePair :first="item.homeCf.start" :second="item.homeCf.end"/></td>
        <td><UiCompareDiff type="coeff" :diff="item.homeDiff?.diff" /></td>
        <td><UiComparePair :first="item.awayCf.start" :second="item.awayCf.end"/></td>
        <td><UiCompareDiff type="coeff" :diff="item.awayDiff?.diff" /></td>
        <td><UiComparePair :first="item?.limits?.start" :second="item?.limits?.end"/></td>
        <td><UiCompareDiff type="point" :diff="item.limitDiff?.diff" /></td>
        <td class="time-cell">
          <template v-if="showStartDate">
            {{ $formatDate(item.dates.start) }}
            <template v-if="item.dates.end">/ {{ $formatDate(item.dates.end) }}</template>
          </template>
          <template v-else>
            <template v-if="item.dates.end">{{ $formatDate(item.dates.end) }}</template>
          </template> 
        </td> 
    </tr>
    </tbody>
</table>
</div>
</template>

<style lang="scss" scoped>
.bets-table-wrapper{
  margin-top: 20px;
  border: 1px solid var(--neutral);
  border-radius: var(--border-radius-small);
}
.bets-table{
  overflow: hidden;
  border-collapse: collapse;
  font-weight: 500;
  width: 100%;

  th, td {
    padding: 12px;
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background-color: var(--surface-50);
  }
  
  td {
    font-size: 12px;
  }
  
  thead {
    font-size: 10px;
    text-transform: uppercase;
    border-bottom: 1px solid var(--neutral);
    letter-spacing: 5%;
  }

  .left{
    text-align: left;
  }

  td.time-cell {
    font-size: 12px;
    font-style: italic;
  }
}
</style>