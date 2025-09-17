import { threshhold } from "@/constants";

export function format_period(period, type) {
    let temp = type.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    )
    let prefix = ' Игра'
    if (period === 3 || period === 4 || period == 5 || period == 6){
        prefix = String(period - 2) + ' Четверть'
    }
    else if (period !== 0){ 
        prefix = String(period) + " Тайм"
    }

    let result = temp + " - " + prefix
    return result
}

export function point_diff(oldPoint, newPoint){
    let diff = (oldPoint - newPoint).toFixed(2)
    if (diff < 0){ return `(+${-diff})`}
        return `(-${diff})`
}

export function value_diff(left, right){ 
    const diff = (right - left).toFixed(2);
    const style = threshhold.point.find(item => item.min <= diff && item.max > diff).class;
    return {diff: parseFloat(diff), style}
}

export function getBetVariant(variant, teamName, isMain) {
    switch (variant.type) {
        case 'moneyline': return teamName;
        case 'spread': return isMain ? variant.point : -variant.point;
        case 'team_total': {
            const isHome = variant.key.includes('home');
            return `${isHome ? 'Over' : 'Under'} ${variant.point}`;
        }
        case 'total': return `${isMain ? 'Over' : 'Under'} ${variant.point}`;
        default: throw new Error(`Unknown variant type: ${variant.type}`);
    }
}