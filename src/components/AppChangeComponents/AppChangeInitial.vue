<template>
    <div class="card mb-10">
        <div class="card card-header"><p class="bold">Начальная конфигурация</p></div>
        <div v-if='initial.length' class="box-column pdb-5">            
            <div class="box-row text-center">
                <p class="ghost pdl-5">Период</p>
                <p class="ghost pdl-5">Фора/Тотал</p>
                <p class="ghost pdl-5">КФ Дом</p>
                <p class="ghost pdl-5">КФ Гость</p>
            </div>
            <hr />
            <div class="box-column pdb-5 pdt-5" style="margin: 0">
                <div class="box-row text-center pdt-5 pdb-5 hovered " v-for="(ini, index) in initial" :key="index">
                    <p class="pdl-5">{{ justify_period(ini.period, ini.type) }}</p>
                    <p class="pdl-5">{{ ini.point }}</p>
                    <p class="pdl-5">{{ ini.home_cf }}</p>
                    <p class="pdl-5">{{ ini.away_cf }}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="ghost" style="padding: 20px">Не удалось загрузить начальную конфигурацию.</p>
        </div>
    </div>
</template>

<script>
import { format_period, format_date } from '@/utils'
    export default {
        props: ['initial'], 

        data() {
            return {
                createdAt: this.initial[0]?.created_at
            }
        }, 

        methods: { 

            justify_period(period, type){
                return format_period(period, type)
            },

            justify_date(date){
                return format_date(date) 
            }, 



        }
    }
</script>

<style scoped>
.box-row > * {
    width: 200px;
    text-align: center;
}

.text-center{
    text-align: center;
}


.box-row.hovered{
    cursor: default
}


</style>