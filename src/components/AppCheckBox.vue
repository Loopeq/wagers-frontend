<template>
    <div class="card check" style="padding: 8px" :class="this.checked ? 'marked' : ''" @click="onClick">
        <p>Только матчи с движениями</p>
    </div>
</template>

<script>

    export default {
        props: ['type'], 
        inject: ['onFilterChange'],

        data(){
            return{
                checked: true
            }
        }, 

        methods: {
            onClick(){
                this.checked = !this.checked
                this.onFilterChange(this.checked, this.type)
            }
        },
    }
    
</script>

<style scoped>
.check{
    cursor: pointer;
}

.marked{
    background-color: rgba(255, 60, 0, 0.7);
}

.marked p{
    color: white;
    font-weight: 900;
}

.check:hover{
    background-color: #9db2bf2f;
}

.marked:hover{
    background-color: rgba(255, 60, 0, 0.4)
}
</style>