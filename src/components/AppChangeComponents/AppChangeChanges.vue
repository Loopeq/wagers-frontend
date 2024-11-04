<template>
<div class="card nohover">
    <div class="card card-header"><p class="bold">Движения</p></div>
    <div class="box-column pdb-5">
        <div class="box-row nohover mb-15">
            <button 
            class="btn-under fixed-200"
            v-for='period in (periods.periods)' 
            :key="period" 
            :class="period === selectedPeriod ? 'marked' : ''" 
            @click="selectedPeriod = period"
            >{{ period }} ({{ periods.count[period] }})</button>
        </div>

        
        <div class="box-row wrap">
            <p style="width: 50px;"></p>
            <p class="box-item center ghost">Фора/Тотал</p>
            <p class="box-item center ghost">Период</p>
            <p class="box-item center ghost">КФ Дом</p>
            <p class="box-item center ghost">КФ Гость</p>
            <p class="box-item center ghost">Время изменения</p>
        </div>
        <hr class="pdb-5"/>

        <div class="box-column" style="margin: 0;" v-for="(change, idx) in filterChanges" :key="idx">
            <div class="box-row wrap content hovered">
                <p v-if='calculateTimestamp(change.created_at)'
                        :class="calculateTimestamp(change.created_at).style"
                        style="width: 50px; text-align: center; padding-right: 5px;">
                        {{ calculateTimestamp(change.created_at).minutes }} мин.    
                </p>
                <p v-else style="width: 50px"></p>
                <div class="box-row box-item" style="justify-content: center; padding: 7px 0px;">
                    <h3 style="text-align: left;" >{{ change.old_point.toFixed(2) }}</h3>
                    <h3 style="text-align: left;">&nbsp;->&nbsp;</h3>
                    <h3 style="text-align: left;">{{change.new_point.toFixed(2)}}</h3>
                    <h3 style="text-align: left;">&nbsp;{{ point_diff(change.old_point, change.new_point) }}</h3>
                </div>                
                
                <p class="box-item center">{{ justify_period(change.period, change.type) }}</p>
                <p class="box-item center">{{ change.old_home_cf.toFixed(2) }} -> {{ change.new_home_cf.toFixed(2) }}
                    {{ point_diff(change.old_home_cf, change.new_home_cf) }}
                </p>
                <p class="box-item center">{{ change.old_away_cf.toFixed(2) }} -> {{ change.new_away_cf.toFixed(2) }}
                    {{ point_diff(change.old_away_cf, change.new_away_cf)}}
                </p>
                <p class="box-item center">{{ justify_date(change.created_at) }}</p>
            </div>

            <div v-if="lastOneHourChangeId === change" class="box-row nomrg" style="padding-left: 3px;">
                <h4 style="width: 50px; padding-bottom: 2px; text-align: left; opacity: 0.8;" class="">1 час  ↑</h4>
                <hr class="extra_line" style="width: 100%;"/>
            </div>
            </div>
        </div>

</div>
</template>

<script>
import { format_period, format_date } from '@/utils'
import moment from 'moment';

    export default {

        props: ['changes', 'startTime'],
        
        data(){
            return{ 
                selectedPeriod: 'Все',
                hoverIdx: null, 
            }
        }, 
        methods: {
            justify_period(period, type){
                return format_period(period, type)
            },

            justify_date(date){
                return format_date(date) 
            }, 

            point_diff(oldPoint, newPoint){
                let diff = (oldPoint - newPoint).toFixed(2)
                if (diff < 0){ return `(+${-diff})`}
                    return `(-${diff})`
            },

            calculateTimestamp(created_at){
                let utc_now = new Date()
                let utc_change = moment.utc(created_at)
                const diffInMs = utc_now - utc_change.toDate(); 
                const diffInMinutes = diffInMs / (1000 * 60);

                if (utc_now.getUTCDate() === utc_change.date() && diffInMinutes < 60) {

                    const diff = diffInMinutes.toFixed(0);
                    
                    if (diffInMinutes > 30){
                        return {
                            minutes: diff,
                            style: 'low'
                        }
                    } 
                    else if (diffInMinutes >= 10){
                        return {
                            minutes: diff,
                            style: 'medium'
                        }
                    }
                    else if (diffInMinutes < 10){
                        return {
                            minutes: diff,
                            style: 'high'
                        }
                    }
                }
            }
         },

        computed: {

            periods() {
                let periodSet = new Set()
                let counter = {}
                this.changes.forEach((value) => {
                    const period = this.justify_period(value.period, value.type) 
                    periodSet.add(period)
                    
                    if (counter[period]){
                        counter[period] += 1
                    } else {counter[period] = 1}
                })
                periodSet.add('Все')
                counter['Все'] = this.changes.length
                periodSet = [...(periodSet)].sort().reverse();
                return {periods: periodSet, count: counter}
            },

            filterChanges(){
                if (this.selectedPeriod == 'Все'){
                    return this.changes
                }
                return this.changes.filter((change) => this.justify_period(change.period, change.type) === this.selectedPeriod)
            },


            lastOneHourChangeId(){
                const startTime = new Date(this.startTime)
                const oneHourBeforeStart = new Date(startTime.getTime() - 60 * 60 * 1000);
            
                const result = this.filterChanges.findLast(value => {
                    const changeTime = new Date(value.created_at);
                    return changeTime.getTime() >= oneHourBeforeStart
                });
                return result
            }


        
        },

    }
</script>

<style scoped>


.fixed-200{
    width: 200px;
}

.box-row.hovered{
    cursor: default
}


.high{
    text-align: left;
}

.medium{
    opacity: 0.8;
    text-align: left;
}

.low{
    opacity: 0.6;
    text-align: left;
}

.high, .medium, .low{
    font-size: 10px;
    font-weight: 500;
    color: #059E84;
}


.no-wrap{
    flex: 5;
    width: 20px;
}

.extra_line{
    border-width: 2px;
    border-color: #FF3D00
}

</style>