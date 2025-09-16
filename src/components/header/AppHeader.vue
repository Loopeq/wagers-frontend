<script setup>
import UiIcon from '@/ui/UiIcon/UiIcon.vue';
import { useMovementStore } from '@/store/movement.module';
import UiButton from '@/ui/UiButton/UiButton.vue';
import {onMounted, ref} from 'vue';
import { useAuthStore } from '@/store/auth.module';
import { useRouter, useRoute } from 'vue-router';
import { AppRoutes } from '@/constants';
const router = useRouter()
const route = useRoute()
const movementStore = useMovementStore(); 
const authStore = useAuthStore();
const userSettingsVisible = ref(false);
const onLogout = async () => {
    await authStore.logout();
    router.push('/auth?message=login');
}
const onAdmin = async () => {
    router.push('/admin');
} 

const getSportCount = (sport) => {
  if (route.path.includes(AppRoutes.DASHBOARD)) return movementStore.eventsCountMap[sport.id] ?? 0
  if (route.path.includes(AppRoutes.BETTING)) return sport.match_count ?? 0
  return 0
}

onMounted( async () => {
  await movementStore.getSports();  
})

</script>
<template>
    <header class="header">
        <div class="header__col">
            <div class="header__row">
                <div 
                    v-for="sport in movementStore.sports" 
                    :key="sport.id" 
                    class="header__event-block" 
                    :class="{'selected': movementStore.relatedParams.sport_id === sport.id}"
                    @click="movementStore.relatedParams.sport_id = sport.id"
                    >
                    <div class="header__row-item">
                        <UiIcon class="icon" :name="sport.name.toLowerCase()"/>
                        <div class="tool">{{ getSportCount(sport) }}</div>
                    </div>
                    <span>{{sport.name_ru}}</span>
                </div>
            </div>
            <div class="header__tools-block" 
                @mouseleave="userSettingsVisible = false">
                <UiButton class="user-settings" 
                        @mouseover="userSettingsVisible = true">
                        Settings
                </UiButton>

                <div v-if="userSettingsVisible" 
                    class="user-dropdown" 
                    @mouseover="userSettingsVisible = true">
                    <div class="user-dropdown__information">
                        <span>{{authStore.user.email}}</span>
                    </div>
                    <div class="user-dropdown__actions">
                        <UiButton v-if="authStore.isAdmin" class="user-dropdown__admin-btn" @click="onAdmin">Админ панель</UiButton>
                        <div class="user-dropdown__logout">
                            <UiButton class="user-dropdown__logout-btn" @click="onLogout">Выйти из аккаунта</UiButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header{ 
    width: 100%; 
    padding: var(--container-padding);
    position: fixed;
    z-index: 2;

    &__col{ 
        position: relative;
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
        margin-top: 10px;
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

    &__tools-block{
        position: absolute;
        display: flex;
        margin-left: auto;
        justify-content: center;
        align-items: center;
        align-self: center;
        margin-right: 20px;
        right: 0;

        .user-settings{
            font-size: 16px;
            background-color: var(--timberwolf-30);
            border-radius: var(--border-radius-medium);
            padding: 10px 20px;
            transition: all 0.5ms;
            cursor: pointer;

            &:hover{
                background-color: var(--flame-70);
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
            }
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

.user-dropdown{ 
    position: absolute;
    top: 100%;
    right: 0%; 
    z-index: 1;
    min-width: 200px;
    background-color: #fff;
    border-radius: var(--border-radius-medium);
    border-top-right-radius: 0px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    color: var(--eerie-black);
    font-size: 12px;

    &__information{
        padding: 20px;
        border-bottom: 1px solid var(--neutral);
    }

    &__actions{
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
    }

    &__logout-btn{
        width: 100%;
        padding: 6px 0px;
        background-color: var(--danger);

        &:hover{
            background-color: var(--danger-70)
        }
    }

    &__admin-btn{
        width: 100%;
        padding: 6px 0px;
        background-color: var(--indigo);

        &:hover{
            background-color: var(--indigo-70)
        }
    }
}
</style>