<template>
<div @mouseover="isVisible=true" @mouseleave="isVisible=false" class="dropdown">
    <div class="card" style="padding: 8px"><p>{{ currentFilter(currentId)[0].title }}</p></div>
    <div v-if='isVisible' class="dropdown-content">
        <p class="list" v-for="filter in withoutCurrent(filters)" :key="filter.id" @click='onClick(filter.id)'>{{ filter.title }}</p>
    </div>
    </div>
</template>

<script>
    export default {

        props: ['filters', 'type'], 
        inject: ['onFilterChange'], 
        
        
        data(){
            return {
                isVisible: false,
                currentId:  0
            }
        }, 

        methods: {

            onClick(id){ 
                this.currentId = id
                this.isVisible = false
                this.onFilterChange(this.currentFilter(id)[0], this.type)
            },

            currentFilter(id){                 
                return this.filters.filter((value) => value.id === id)
            },

            withoutCurrent(){
                return this.filters.filter((value) => value.id !== this.currentId)
            }
        },
    }
</script>

<style scoped>

.dropdown-content{
    width: 100%;
}

.list{
    padding: 10px;
}

.list:hover{
    background-color: #9db2bf2f;
    cursor: pointer;
}

</style>