<template>
<div class="card nohover">
    <div class="card card-header"><p class="bold">История</p></div>
    <div v-if="loading" class='loader-wrapper' style="width: 100%; height: 200px;">
        <span class="loader"></span>
    </div>
    <div v-else class="box-column">
        <div class="box-row mb-15">
            <button 
                class="btn-under"
                :class="selected == teams.homeId ? 'marked': ''"
                @click="onClick(teams.homeId)">
                <div class="box-column centered nomrg">
                    <p class="ghost">{{ homeHistory.length }} Game(s) </p>
                    <p>{{ teams.homeName }}</p>
                </div>
            </button>
            <button 
                class="btn-under"
                :class="selected === teams.awayId ? 'marked' : ''"
                @click="onClick(teams.awayId)">
                <div class="box-column centered nomrg">
                    <p class="ghost">{{ awayHistory.length }} Game(s)</p>
                    <p>{{ teams.awayName }}</p>
                </div>
            </button>
        </div>

        <hr />
        <div v-if="history.length" class="mb-10">
            <div class="box-column nomrg" v-for="(match, idx) in history" :key="idx">
                <div @click='onTeamClick(match.match_id)' class="box-row hovered head nomrg" style="padding: 10px">
                    <div class="box-column nomrg">
                        <h3 class="ellipsis">{{ match.home_name }}</h3>
                        <h3 class="ellipsis">{{ match.away_name }}</h3>
                        <p class="ellipsis">{{ match.league_name }}</p>
                        <p class="ellipsis ghost">{{ justify_date(match.start_time) }}</p>
                    </div>

                    <div v-if="match.details">
                        <div class="box-row no-mrg abs-center" v-for="(change, idx) in match.details" :key="idx">
                            <h2 style="padding-right: 4px;">{{ change.team_1_score }}</h2>
                            <p>-</p>
                            <h2 style="padding-left: 4px">{{ change.team_2_score }}</h2>
                        </div>
                    </div>
                </div>
                
                <hr />
            </div>
        </div>

        <div class='mb-10' v-else>
            <AppAlert :alert="{type: 'danger', title: 'Не найдено матчей для указанной команды'}"/>
        </div>
    
    </div>
</div>
</template>

<script>
import AppAlert from '../AppAlert.vue';
import { format_date } from '@/utils';

    export default {
        props: ['teams', 'matchId'],

        data(){
            return{
                selected: null,
                loading: true, 
                homeHistory: [], 
                awayHistory: [],
                history: []
            }
        }, 

        methods: {
            onClick(teamId){
                if (teamId === this.selected){
                    return 
                }

                this.selected = teamId
                if (this.selected === this.teams.homeId){
                    this.history = this.homeHistory
                } else {
                    this.history = this.awayHistory
                }
            },

            onTeamClick(matchId){
                const { href } = this.$router.resolve({name: 'match', params: { matchId }})
                window.open(href, '_blank') 
            }, 

            justify_date(date){
                return format_date(date)
            }, 
            async fetchHistory(){ 
                await this.axios
                    .get(this.$hostname + '/history' + `/${this.teams.homeName}`, {params: {current_match_id: this.matchId}, withCredentials: true})
                    .then(response => {
                        this.homeHistory = response.data
                })
                    .catch(error => {console.log(error)})

                await this.axios
                    .get(this.$hostname + '/history' + `/${this.teams.awayName}`, {params: {current_match_id: this.matchId}})
                    .then(response => {
                        this.awayHistory = response.data 
                })
                    .catch(error => {console.log(error)})
                
                this.loading = false    
                }

        }, 

        mounted() {
            this.selected = this.teams.homeId
            this.fetchHistory()
            if (this.homeHistory.length){
                this.history = this.homeHistory
            }
        },

        watch: {
            homeHistory(value){
                if (value.length){
                    this.history = this.homeHistory
                }
            }
        }, 

        components: {AppAlert}
    }
</script>

<style scoped>

.centered{
    text-align: center;
    justify-content: center;
    letter-spacing: 1px;
}

.nomrg{
    margin: 0;
}

.box-row{
    position: relative;
}

.abs-center{
    position: absolute;
    top: 40%;
    left: 50%;
    transition: (50%, 50%);
}
</style>