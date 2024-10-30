<template>
<div class="card nohover">
    <div class="card card-header">
        <div class="box-row">
        <p class="bold">Матч</p>
        <a class='link' :href="match.link" target="_blank" style="margin-left: auto"><p>Pinnacle link</p></a>
        <p class="bold" style="margin-left: auto; user-select: all;">id: {{ match.match_id }}</p>
        </div>
    </div>
     <div class="box-column">
            <p class="pdb-10 pdt-5 pdl-5">Начало: {{ justify_date(match.start_time) }}</p>
            <hr />
            <h2 class="pdb-10 pdt-10 pdl-5">{{ match.home_name }}</h2>
            <hr />
            <h2 class="pdb-10 pdt-10 pdl-5">{{ match.away_name }}</h2>
            <hr />
            <h3 class="ghost pdb-10 pdt-10 pdl-5">{{ match.league_name }}</h3>
    </div>
</div>
</template>

<script>
import { format_date } from '@/utils';

    export default {
        props: ['match'],

        methods: {
            
            justify_date(date){
                return format_date(date) 
            }, 
        }
    }
</script>

<style scoped>

.link{
    text-decoration: underline;
    color: white;
}
</style>