<template>

<div class="box-column">

    <div class="card card-header"><p class="bold">Фильтры</p></div>

    <div v-if="!loading.filters">
        <MatchFilters class='mb-10' :timeFilters="timeFilters" :valueFilters="valueFilters"/>
    </div>
    
    <div v-else class="loader-wrapper" style="height: 100px;">
        <div class="loader"></div>
    </div>

    <div class="box-row">
        <div class="box-column no-margin" style="width: 25%; height: calc(100vh - 100px); overflow-y: hidden; justify-content: flex-start;">
                <div class="card card-header"><p class="bold">Матчи</p></div>
                <div class="box-row no-margin header"><p class="ghost">Всего: {{ matches.length }}</p></div>
                <div class='loader-wrapper' v-if="loading.matches" style="width: 100%; height: 200px;"><span class="loader"></span></div>
                <div v-else-if="!loading.matches && matches.length" style="overflow-y: scroll;">
                            <AppMatchCard 
                                v-for='match in matches'                 
                                :match="match"
                                :key="match.match_id"
                                :selectedId="selectedMatchId"
                                @onClick="onMatchClick(match.match_id)"
                                @on-navigate="onNavigate"
                            ></AppMatchCard>
                </div>
            
                <div v-else>
                    <AppAlert :alert="{type: 'warning', title: 'Не найдено матчей по заданным фильтрам'}"/>
                </div>
        </div>

        <div style=" width: 75%; margin-bottom: auto; padding-left: 10px; position: -webkit-sticky; position: sticky; top: 10px; overflow-y: hidden;">
            <AppChange :matchIdProp="selectedMatchId" :blank="false"/>
        </div>
        
    </div>

    
</div>

</template>

<script>
import MatchFilters from '@/components/MatchFilters.vue';
import AppMatchCard from '@/components/AppMatchCard.vue';
import AppAlert from '@/components/AppAlert.vue';
import AppChange from './AppChange.vue';
    export default {
    
        data(){
            return {
                loading: {'filters': true, 'matches': true}, 
                matches: {
                    type: Array, 
                    default: [],
                },

                timeFilters: {
                    type: Array, 
                    default: [], 
                    required: true,
                },

                valueFilters: {
                    type: Array, 
                    default: [], 
                    required: true,
                }, 
                matchesInterval: null,
                currentTimeFilter: {},
                currentValueFilter: {},  
                currentNotNullPointFilter: {}, 
                searchValue: null,
                selectedMatchId: null,

            }
        },
        
        provide(){
            return {
                onFilterChange: this.onFilterChange
            }
        }, 

        methods: {
            async fetchMatches(){ 
                
                this.loading.matches = true
                if (this.matchesInterval){
                    clearInterval(this.matchesInterval)
                    this.matchesInterval = null 
                }

                const request = async() => { 
                    await this.axios
                    .get(this.$hostname + '/', 
                        {params: 
                        {
                            hour: this.currentTimeFilter.hour, 
                            finished: this.currentTimeFilter.finished,
                            filter: this.currentValueFilter.type,
                            not_null_point: this.currentNotNullPointFilter
                        }, 
                        withCredentials: true
                        })
                    .then(
                        response => {
                            this.matches = response.data
                            this.loading.matches = false
                        })
                    .catch(error => { 
                        console.log(error) })
                    .finally(() => {})
                }

                await request();
                

                if (this.currentTimeFilter.finished === null){
                   this.matchesInterval = setInterval(request, 20000)
                }
            },

            async fetchFilters(){
                await this.axios
                    .get(this.$hostname + '/filters', { withCredentials: true })
                    .then(response => {
                        this.timeFilters = response.data['time_filters']
                        this.valueFilters = response.data['value_filters']
                        this.loading.filters = false
                    })
                    .catch(error => { console.log(error) })
                    .finally(() => {})
            }, 

            onMatchClick(matchId){ 
                this.selectedMatchId = matchId
            }, 

            onNavigate(matchId){
                const { href } = this.$router.resolve({name: 'match', params: { matchId }})
                window.open(href, '_blank')
            }, 

            onFilterChange(filter, type){ 
                if (type === 'time_filters'){
                    this.currentTimeFilter = filter
                } 
                else if (type === 'value_filters'){
                    this.currentValueFilter = filter
                }
                else if (type === 'not_null_point_filter'){
                    this.currentNotNullPointFilter = filter
                }
                this.fetchMatches()
            },
        
        },

        mounted(){
            this.fetchFilters()
            document.title = 'Dashboard'
        }, 
        
        beforeUnmount(){
            if (this.matchesInterval){
                clearInterval(this.matchesInterval)
                console.log('Clear matches interval')
        }},

        watch: {
            'loading.filters'(value){
                if (!value){
                    this.currentNotNullPointFilter = true
                    this.currentTimeFilter = this.timeFilters[0]
                    this.currentValueFilter = this.valueFilters[0]
                    this.fetchMatches()
                }
            }, 

            'loading.matches'(value){
                if (!value  && this.matches.length){
                    this.selectedMatchId = this.matches[0].match_id
                }
            }
        }, 
        
        components: {MatchFilters, AppMatchCard, AppAlert, AppChange}
    }
</script>

<style scoped>

.no-margin{
    margin: 0;
    background-color: white;
}

.header p{
    padding: 8px;
}

.mgl-auto{
    margin-left: auto;
}

.text-center{
    text-align: center;
}

</style>