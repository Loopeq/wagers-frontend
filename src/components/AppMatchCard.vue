<template>
<div class="card" :class="match.match_id === selectedId ? 'marked-box' : ''">
  <div class='box-row hovered' @click="$emit('onClick', match.id)" style="justify-content: space-between;">
    <div class="box-column head">
      <h3 class="ellipsis">{{ match.home_name }}</h3>
      <h3 class="ellipsis">{{ match.away_name }}</h3>
      <p class="ellipsis">{{ match.league_name }}</p>
      <div class="box-row nomrg">
        <p class="ellipsis ghost" style="padding-right: 8px;">{{ justify_date(match.start_time) }}</p>
        <p class="ghost timestamp">{{ calculateTimestamp(match.start_time)}}</p>
      </div>

    </div>
    
    <div class="box-row right" style="width: 300px; justify-content: space-between;">
        <div v-if='match.change_count'>
          <h2 style="padding:8px; text-align: center;">{{ match.change_count }}</h2>
          <p style="padding:8px; text-align: center;">{{justify_date(match.last_change_time)}}</p>
        </div>
        <span @click.stop='$emit("onNavigate", match.match_id)' class="material-symbols-outlined" style='padding-right: 8px;'>open_in_new</span>
    </div>

  </div>
  <hr />
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
            }
}, 


  components: {}
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


.card{
  border: 2px solid white
}

.marked-box{
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
  color: rgba(255, 60, 0, 0.7);
}

</style>
