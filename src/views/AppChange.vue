<template>

    <div class='loader-wrapper card' v-if="loading.change" style="width: 100%; height: 200px;">
        <span class="loader"></span>
    </div>

    <div :class="blank ? '' : 'scrollable'" style="position: relative;" v-if="!loading.change">
        <div :class="blank ? '' : 'sticable'">
            <div>
                <AppChangeMatch :match='match' />
            </div> 
            <AppChangeInitial :initial="initial"></AppChangeInitial>
            <AppChangeChanges :startTime='match.start_time' :changes="changes"/>
            <AppChangeHistory 
                :matchId = matchId
                :teams="{homeId: match.home_id, homeName: match.home_name, awayId: match.away_id, awayName: match.away_name,
                    leagueId: match.league_id
                }"
                />
        </div>
    </div>

</template>

<script>
import AppChangeMatch from '@/components/AppChangeComponents/AppChangeMatch.vue';
import AppChangeChanges from '@/components/AppChangeComponents/AppChangeChanges.vue';
import AppChangeInitial from '@/components/AppChangeComponents/AppChangeInitial.vue';
import AppChangeHistory from '@/components/AppChangeComponents/AppChangeHistory.vue';
    export default {

        props: {
            matchIdProp: Number,
            blank: {type: Boolean, required: false, default: true} 
        }, 

        data(){
            return{
                loading: {change: true}, 
                matchId: null,
                haveNew: false, 
                pageTitle: null, 
                changes: [],
                match: [], 
                initital: [], 
                pointChangeInterval: null
             }}, 
        
        methods: {

            async fetchPointChange(){

                this.loading.change = true
                clearInterval(this.pointChangeInterval)
                this.pointChangeInterval = null

                if (!this.matchId){
                    return
                }

                const request = async() => {
                await this.axios
                    .get(this.$hostname + `/match/${this.matchId}`, { withCredentials: true })
                    .then(response => {
                        this.changes = response.data['changes']
                        this.match = response.data['match']
                        this.initial = response.data['initial_points']      
                        this.loading.change = false
                    })
                    .catch(error => { console.log(error) })
                }

                await request();
                if (!this.pointChangeInterval){ 
                    this.pointChangeInterval = setInterval(request, 10000)
                }


            },
        },   
        
        mounted(){
            if (this.$route.params.matchId){
                this.matchId = this.$route.params.matchId;
            } else {
                this.matchId = this.matchIdProp
            }
            this.fetchPointChange()
        },

        beforeUnmount(){
            if (this.pointChangeInterval){
                clearInterval(this.pointChangeInterval)
                console.log('Clear point change interval')
        }},

        watch: {
            'loading.change'(value){ 
                if(!value){
                    if(!this.matchIdProp){
                        this.pageTitle = `${this.match.home_name} - ${this.match.away_name}` 
                        document.title = this.pageTitle
                    }
                }
            },

            matchIdProp(value){
                this.matchId = value
                this.fetchPointChange()
            }
        },



        components: {AppChangeMatch, AppChangeChanges, AppChangeInitial, AppChangeHistory}
    }
    

</script>

<style scoped>

 hr{
    margin-top: 0;
 }

 .box-row > * {
    flex: 1; 
 }

.hover {
    border: 3px solid rgba(0, 0, 0, 0)
}

.hover:hover{
    border: 3px solid gray;
}

.scrollable{
    height: calc(100vh - 100px); 
    overflow-y: auto;
}

.sticable{
    position: sticky; top: 0px; z-index: 10;
}
 

</style>