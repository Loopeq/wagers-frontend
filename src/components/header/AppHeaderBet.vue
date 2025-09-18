<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useBetStore } from '@/store/bet.module';
import { capitalizer } from '@/utils/core';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import UiButtonExtra from '@/ui/UiButtonExtra/UiButtonExtra.vue';
import { useLoginModal } from '@/use/useLoginModal';
import { useRegisterModal } from '@/use/useRegisterModal';
import { useAuthBettingStore } from '@/store/authBetting.module';
import { useProfileModal } from '@/use/useProfileAccount';

const router = useRouter();
const betStore = useBetStore();
const loginModal = useLoginModal();
const registerModal = useRegisterModal();
const authBettingStore = useAuthBettingStore();
const profileModal = useProfileModal(); 

const onSportChange = (sport) => {
    router.push({ name: 'Betting', params: { sportId: sport.id } });
    betStore.sportId = String(sport.id);
}
const getSportCount = (sport) => sport.match_count ?? 0;
const selectedSport = computed(() => betStore.sportId);
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
                    :class="{'selected': String(selectedSport) === String(sport.id)}"
                    @click="onSportChange(sport)"
                    >
                    <div class="header__row-item">
                        <UiIcon class="icon" :name="sport.name.toLowerCase()"/>
                        <div class="tool">{{ getSportCount(sport) }}</div>
                    </div>
                    <span>{{capitalizer(sport.name)}}</span>
                </div>
            </div>
            <template v-if="authBettingStore.isAuthenticated">
                <div class="header__icon-profile-wrapper">
                    <UiIcon @click="profileModal.open()" class="icon-profile" name="profile" />
                </div>
            </template>
            <template v-else>
                <div class="header__sign-wrapper">
                    <UiButtonExtra variant="secondary" @click="loginModal.open()">Вход</UiButtonExtra>
                    <UiButtonExtra variant="primary" @click="registerModal.open()">Регистрация</UiButtonExtra>
                </div>
            </template>

        </div>
    </header>
</template>

<style lang="scss" scoped>
header{
    background-color: #fff;
    background-color: var(--eerie-black);
}
.icon-profile{
    width: 25px; 
    height: 25px;
    margin-right: 5px;
    cursor: pointer;
}
.header{ 
    width: 100%; 
    padding: var(--container-padding);
    position: fixed;
    z-index: 2;

    &__icon-profile-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 52px;
    }

    &-wrapper{
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        gap: 15px;
    }
    &-logo{
        height: 50px;
        width: 160px;
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
        padding-top: 12px;
        transition: all 0.2;
        border-bottom: 5px solid transparent;

        span{
            font-size: 12px;
            font-weight: 700;
        }

        &:hover{
            background-color: var(--timberwolf-15);
            cursor: pointer;
        }
        &.selected{
            background-color: var(--timberwolf-15);
            border-bottom: 5px solid var(--flame);
        }
    }

    &__sign-wrapper{
        display: flex;
        height: 52px;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }
}
</style>