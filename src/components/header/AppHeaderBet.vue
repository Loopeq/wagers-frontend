<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useBetStore } from '@/store/bet.module';
import { capitalizer } from '@/utils/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const betStore = useBetStore();

const onSportChange = (sport) => {
    router.push({ name: 'Betting', params: { sportId: sport.id } });
    betStore.sportId = sport.id;
}
const getSportCount = (sport) => sport.match_count ?? 0;

</script>
<template>
    <header class="header">
        <div class="header-wrapper">
            <UiIcon class="header-logo" name="logo"/>
            <div class="header__row">
                <div 
                    v-for="sport in betStore.sports" 
                    :key="sport.id" 
                    class="header__event-block"
                    :class="{'selected': betStore.sportId === sport.id}"
                    @click="onSportChange(sport)"
                    >
                    <div class="header__row-item">
                        <UiIcon class="icon" :name="sport.name.toLowerCase()"/>
                        <div class="tool">{{ getSportCount(sport) }}</div>
                    </div>
                    <span>{{capitalizer(sport.name)}}</span>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
header{
    background-color: #fff;
    background-color: var(--eerie-black);
}

.header{ 
    width: 100%; 
    padding: var(--container-padding);
    position: fixed;
    z-index: 2;

    &-wrapper{
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
    }
    &-logo{
        width: 300px;
        height: auto;
    }

    &__row{
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        width: 100%;
        height: 100%;
    }

    &__nav{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        gap: 20px;
        padding: 10px 0px;
    }

    &__nav-link{
        padding: 10px 10px;
        border: 1px solid var(--timberwolf-30);
        border-radius: var(--border-radius-medium);
        font-size: 14px;
        text-decoration:unset;
        color: #fff;
        cursor: pointer;
        &:hover{
                color: var(--flame-70)
        };
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