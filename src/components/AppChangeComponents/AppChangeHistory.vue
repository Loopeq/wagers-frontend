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
                        <p class="ellipsis ghost">{{ justify_date(match.start_time) }} [Игра завершена]</p>
                    </div>

                    <div v-if="match.details" class="no-mrg">
                        <div class="box-row no-mrg" style="justify-content: space-around">
                            <div class="box-column no-mrg pdl-15" style="justify-content: flex-start; width: 100px">
                                    <p class="ghost">Результат</p>
                                    <div class="box-row no-mrg">
                                        <h2 style="padding-right: 4px;">{{ match.details.team_1_score }}</h2>
                                        <p>-</p>
                                        <h2 style="padding-left: 4px">{{ match.details.team_2_score }}</h2>
                                </div>
                            </div>

                            <div v-if='match.high.max_score' class="box-row mo-mrg pdl-15" style="justify-content: flex-start; width: 400px;">
                                <div class="box-column no-mrg">
                                    <p class="ghost">{{ justify_period(match.high.max_score.period, match.high.max_score.type ) }}</p>
                                    <h2>{{ match.high.max_score.old }} -> {{ match.high.max_score.new}} {{ point_diff(match.high.max_score.old, match.high.max_score.new) }}</h2>
                                </div>
                                <h2 v-if='match.high.count - 1 >= 1' class="ghost"> и ещё <span style="color: #FF3D00">{{ match.high.count }}</span> сильных изменений</h2>
                            </div>
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
import { format_date, format_period, point_diff } from '@/utils';


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
                console.log(this.history);
            },

            onTeamClick(matchId){
                const { href } = this.$router.resolve({name: 'match', params: { matchId }})
                window.open(href, '_blank') 
            }, 

            justify_date(date){
                return format_date(date)
            }, 

            justify_period(period, type){
                return format_period(period, type);
            },

            point_diff(oldPoint, newPoint){
                return point_diff(oldPoint, newPoint);
            }, 

            async fetchHistory(){ 
                await this.axios
                    .get(this.$hostname + '/history',  {
                        withCredentials: true, 
                        params: {
                            team_name: this.teams.homeName, 
                            current_match_id: this.matchId,
                            league_id: this.teams.leagueId},
                        })
                    .then(response => {
                        this.homeHistory = response.data
                })
                    .catch(error => {console.log(error)})

                await this.axios
                    .get(this.$hostname + '/history', {
                        withCredentials: true, 
                        params: {
                            team_name: this.teams.awayName, 
                            current_match_id: this.matchId,
                            league_id: this.teams.leagueId, 
                        }
                        })
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

.evenly{
    width: 100%;
    justify-content: space-around;
}

</style>