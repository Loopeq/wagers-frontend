// composables/useRowItemData.js
import { value_diff } from '@/utils';

export function useRowItemData(item) {
  if (!Array.isArray(item) || item.length === 0) {
    return {
      homeCf: { start: '0.00', end: null },
      homeDiff: null,
      awayCf: { start: '0.00', end: null },
      awayDiff: null,
      points: { start: 0, end: null },
      pointDiff: null,
      limits: { start: 0, end: null },
      limitDiff: null,
      dates: { start: null, end: null },
      isValid: false
    };
  }

  const firstItem = item[0];
  const secondItem = item.length >= 2 ? item[1] : null;

  // Функция для сравнения значений с обработкой дубликатов
  const createComparison = (getStart, getEnd, diffType = null) => {
    const start = getStart(firstItem);
    const end = secondItem ? getEnd(secondItem) : null;
    const areEqual = end !== null && Number(start) === Number(end);
    
    return {
      value: { start, end: areEqual ? null : end },
      diff: secondItem && !areEqual 
        ? (diffType ? value_diff(start, end, diffType) : value_diff(start, end))
        : null
    };
  };

  // Создаем все сравнения
  const home = createComparison(
    i => Number(i?.home_cf.toFixed(3) || 0),
    i => Number(i?.home_cf.toFixed(3) || 0),
    'coeffTennis'
  );

  const away = createComparison(
    i => Number(i?.away_cf.toFixed(3) || 0),
    i => Number(i?.away_cf.toFixed(3) || 0),
    'coeffTennis'
  );

  const points = createComparison(
    i => Number(i?.point) || 0,
    i => Number(i?.point) || 0,
    'point'
  );

  const limits = createComparison(
    i => i?.limit || 0,
    i => i?.limit || 0
  );

  const dates = {
    start: firstItem?.created_at || null,
    end: secondItem?.created_at && secondItem.created_at !== firstItem?.created_at 
      ? secondItem.created_at 
      : null
  };

  return {
    homeCf: home.value,
    homeDiff: home.diff,
    awayCf: away.value,
    awayDiff: away.diff,
    points: points.value,
    pointDiff: points.diff,
    limits: limits.value,
    limitDiff: limits.diff,
    dates,
    title: item[0].period_title,
    isValid: !!secondItem
  };
}