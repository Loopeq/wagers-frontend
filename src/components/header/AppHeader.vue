<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useBetStore } from '@/store/bet.module';
const betStore = useBetStore(); 
</script>
<template>
    <header class="header">
        <div class="header__col">
            <div class="header__row">
                <div 
                    v-for="sport in betStore.sports" 
                    :key="sport.id" 
                    class="header__event-block" 
                    :class="{'selected': betStore.relatedParams.sport_id === sport.id}"
                    @click="betStore.relatedParams.sport_id = sport.id"
                    >
                    <div class="header__row-item">
                        <UiIcon class="icon" :name="sport.name.toLowerCase()"/>
                        <div class="tool">{{betStore.eventsCountMap[sport.id]}}</div>
                    </div>
                    <span>{{sport.name_ru}}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header{ 
    width: 100%; 
    height: 80px;
    padding: var(--container-padding);
    position: fixed;
    z-index: 2;

    &__col{ 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: 100%;
        width: 100%;
    }

    &__row{
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        width: 100%;
        height: 100%;

    }

    &__row-item{
        display: flex;
        align-items: center;
        gap: 5px;

        .icon{
            width: 1.3rem;  
            height: 1.3rem;  
        }
        .tool{
            background-color: black;
            padding: 0px 5px;
            font-size: 10px;
            font-weight: 700;
            color: white;
            border-radius: var(--border-radius-medium);
        }
    }

    &__event-block{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        padding: 10px 20px;
        padding-bottom: 5px;
        transition: all 0.2;
        border-bottom: 5px solid transparent;

        span{
            font-size: 12px;
            font-weight: 700;
        }

        &:hover{
            background-color: var(--timberwolf-15);
            border-top-left-radius: var(--border-radius-medium);
            border-top-right-radius: var(--border-radius-medium);
            cursor: pointer;
        }
        &.selected{
            background-color: var(--timberwolf-15);
            border-top-left-radius: var(--border-radius-medium);
            border-top-right-radius: var(--border-radius-medium);
            border-bottom: 5px solid var(--flame);
        }
    }


    
}
</style>