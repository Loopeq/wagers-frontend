<script setup>
import DashboardCanvasEvent from './DashboardCanvasEvent.vue';
import DashboardCanvasComparison from './DashboardCanvasComparison.vue';
import DashboardCanvasHistory from './DashboardCanvasHistory.vue';
import DashboardCanvasMovements from './DashboardCanvasMovements.vue';
</script>

<template>
    <div class="dashboard-canvas card">
        <DashboardCanvasEvent />
        <div class="dashboard-events">
            <div class="dashboard-events-event__col">
                <div class="dashboard-events-event__label card">Начальная конфигурация</div>
                <DashboardCanvasComparison />
            </div>
            <div class="dashboard-events-event__col">
            <div class="dashboard-events-event__label card">Движения</div>
                <DashboardCanvasMovements />
            </div>
            <div class="dashboard-events-event__col">
                <div class="dashboard-events-event__label card">История игр</div>
                <DashboardCanvasHistory />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-canvas{
    position: sticky;
    top: calc(var(--header-height) + 10px);
    height: calc(100vh - 110px);
    overflow-y: auto;
    overscroll-behavior-y: contain;
    background: white;
    margin: 20px 10px;

    
}
.dashboard-events{
    margin-top: 20px;
}
.dashboard-events-event{
    width: 100%;
    margin-top: 10px;

    &__card-info{
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 10px;
        border: 1px outset rgba(128, 128, 128, 0.5);
    }
    &__card-info-title{
        font-weight: 600;
    }

    &__label{
        padding: 20px 30px;
        font-weight: 500;
        font-size: 12px;

        &.card{ 
            box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.1);
        }
    }
    &__row{
        display: flex;
        justify-content: flex-start;
    }
    &__col{
        display: flex;
        flex-direction: column;
        margin: 20px 10px;
    }
}


</style>