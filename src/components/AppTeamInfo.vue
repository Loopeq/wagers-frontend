<template>
<div v-if="modal && match && historyMatch">
    <div class="modal-backdrop" @click="modal=false"></div>
    <div class="modal">
        <AppChangeCard :changes="changes" :match='historyMatch'/>
    </div>
</div>
<div class="box-column">
    <div class="box-row" style="margin-bottom: 10px">
        <button @click='onTeamClick(match.home_id)' class="btn" :class="selectedTeam === match.home_id ? 'primary': ''">{{ match.home_name }}</button>
        <button @click='onTeamClick(match.away_id)' class="btn" :class="selectedTeam === match.away_id ? 'danger': ''">{{ match.away_name }}</button>
    </div>
    
    <div class="box-row">
        <p class="box-item center">Дом</p>
        <p class="box-item center">Гость</p>
        <p class="box-item center">Начало матча</p>
    </div>

    <hr style="margin-top: 0px; margin-bottom: 0px;"/> 

    <div v-if='history && history.length' class="box-column" style="margin: 0">
        <div v-for='(info, index) in history' :key='index' class="card" style="padding: 0; margin-bottom: 0; margin-top: 5px">
            <div class="box-row" @click="onCardClick(info)">
            <p class="box-item center" :style="{color: teamStyle(info.home_name)}">{{ info.home_name }}</p> 
            <p class="box-item center" :style="{color: teamStyle(info.away_name)}">{{ info.away_name }}</p>
            <p class="box-item center">{{ justify_date(info.start_time) }}</p>
            </div>
        </div>
    </div>

    <div v-else>
        <AppAlert :alert="{ type:'warning', title: 'История игр пуста'}"/>
    </div>
    
</div> 

</template>

<script>

import {format_date, format_period} from '../utils'
import AppAlert from './AppAlert.vue';
import AppChangeCard from './AppChangeCard.vue';

export default {
    props: ['match'], 
    emits: ['onTeamClick'],

    data(){
        return{ 
            selectedTeam: null,
            history: null,
            modal: false,
            changes: [],
            historyMatch: null, 
        }
    },

    methods: {

        justify_date(date){
        return format_date(date)}, 

        justify_period(period, type){
        return format_period(period, type)}, 
        
        async fetchInfo(){
            await this.axios
                .get(this.$hostname + `/history/${this.match.home_id === this.selectedTeam ? this.match.home_name : this.match.away_name}`, 
                {params: { current_match_id: this.match.match_id }})
                .then(response => {
                    this.history = response.data
                })
                .catch(error => { console.log(error) })
                .finally(() => {
            })
        }, 

        onTeamClick(id){
            this.selectedTeam = id
            this.fetchInfo()
        }, 

        teamStyle(team_name){
            if (this.selectedTeam === this.match.home_id){
                if (this.match.home_name == team_name){
                    return 'green'
                }
            }
            else if (this.selectedTeam === this.match.away_id){
                if (this.match.away_name == team_name){
                    return 'red'
                }
            }
        },

        async onCardClick(info){ 
            this.modal = true

            await this.axios
                .get(this.$hostname + `/${info.match_id}`)
                .then(response => {
                    this.changes = response.data
                    this.historyMatch = info
                })
                .catch(error => { console.log(error) })
                .finally(() => {})
            },
    },          

    mounted(){
        this.selectedTeam = this.match.home_id
        this.fetchInfo()
    }, 

    components: {AppAlert, AppChangeCard}
}
</script>

<style scoped>

.box-row > *{
    flex: 1
}
</style>