<template>
<hr />
<div class="card hovered" :class="match.match_id === selectedId ? 'marked-box' : ''">
  <div class='box-row' @click="$emit('onClick', match.id)" style="justify-content: space-between;">
    <div class="box-column">
      <h3>{{ match.home_name }}</h3>
      <h3>{{ match.away_name }}</h3>
      <p>{{ match.league_name }}</p>
      <div class="box-row nomrg" style="width: fit-content;">
        <p class="ellipsis ghost" style="padding-right: 8px;">{{ justify_date(match.start_time) }}</p>
        <p class="ghost timestamp">{{ calculateTimestamp(match.start_time)}}</p>
      </div>
    </div>
    
    <div class="box-row right" style="justify-content: right;">
        <div v-if='match.change_count' style="padding-right: 15px; width: 100px;">
          <h2 style="padding: 8px; text-align: center;">{{ match.change_count }}</h2>
          <p class='timestamp' style="padding:8px; text-align: center;">{{calculateTimestampChange(match.last_change_time)}}</p>
        </div>
        <span @click.stop='$emit("onNavigate", match.match_id)' class="material-symbols-outlined" style='padding-right: 8px;'>open_in_new</span>
    </div>

  </div>
</div>
</template>


<script>


import { format_date, format_period } from '../utils'
import moment from 'moment';

export default {
    emits: ['onNavigate'],
    props: ['match', 'selectedId'],


    data(){
      return{ 
        loading: true,
        changes: this.match.changes
      }
    }, 




    methods: { 

      justify_date(date){
        return format_date(date) 
      },

      justify_period(period, type){
        return format_period(period, type)
      },

      calculateTimestamp(start_time){
                let utc_now = new Date()
                let utc_start = moment.utc(start_time)
                if (utc_now > utc_start.toDate()){
                  return
                }
                const diffInMs = utc_now - utc_start.toDate(); 
                const diffInMinutes = Math.abs(diffInMs / (1000 * 60));

                if (diffInMinutes <= 60 && diffInMinutes.toFixed(0) != 0) {
                  return `Через ${diffInMinutes.toFixed(0)} мин.` 
                }
                else {
                  return `Через ${(diffInMinutes / 60).toFixed(0)} час.`
                }
      }, 

      calculateTimestampChange(created_at){
                let utc_now = new Date()
                let utc_change = moment.utc(created_at)
                const diffInMs = utc_now - utc_change.toDate(); 
                const diffInMinutes = diffInMs / (1000 * 60);

                if (utc_now.getUTCDate() === utc_change.date()) {

                    const diff = diffInMinutes.toFixed(0);
                    
                    if (diffInMinutes <= 60){
                      return `${diff} мин.`
                    }
                    else { 
                      return this.justify_date(created_at)
                    }
                }
            }


}

}

</script>

<style scoped>

.upper{
  font-size: 9px;
  text-transform: uppercase
}

.box{
  border: 3px solid darkgray;
  margin-right: 5px;
}


.warning{
  border: 3px solid orange
}

.danger{
  border: 3px solid rgba(255, 60, 0, 1);
}

.card.hovered{
  border: 2px solid transparent
}
.card.marked-box{
  border: 2px solid rgba(255, 60, 0, 1);
}


.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 200,
  'GRAD' 100,
  'opsz' 24
}

.material-symbols-outlined:hover{
  color: rgba(255, 60, 0, 1);
}

.material-symbols-outlined:active{
  opacity: 0.6;
}


.timestamp{
  font-size: 11px;
  color:   #059E84;

}

</style>
