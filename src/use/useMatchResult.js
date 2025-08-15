export function useMatchResult(results) {
    const total = results[0];
    let matchResult = {};
    let totalPeriods = [results[0].team_1_score, results[0].team_2_score];
    if (results.length === 2){
        results.push({
            'period': 2, 
            'team_1_score': total.team_1_score - results[1].team_1_score,
            'team_2_score': total.team_2_score - results[1].team_2_score,
        })
    }
    for (const period of results.slice(1)){
        matchResult[period.period] = [period.team_1_score, period.team_2_score];
    }
    return {
        result: matchResult ?? null,
        total: totalPeriods,
    }
}