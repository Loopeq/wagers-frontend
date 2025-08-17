<script setup>
import AdminCodes from '@/components/admin/AdminCodes.vue';
import AdminUsers from '@/components/admin/AdminUsers.vue';
import UiButton from '@/ui/UiButton/UiButton.vue';
import {computed, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const curTab = computed(() => (route.query.tab));

onMounted(() => {
    router.replace( { path: route.path, query : {tab: 'users'}, } )
})
const onTabClick = (tab) => {
    router.replace({ path: route.path, query : {tab: tab}})
}
const onBackClick = () => {
    router.push('/');
}
</script>

<template>
    <div class="admin-grid">
        <div class="admin-grid__menu card">
            <div class="admin-grid__options">
                <div class="admin-grid__option"><UiButton class="opt-btn" @click="onBackClick">Вернуться на сайт</UiButton></div>
                <div class="admin-grid__option"><UiButton class="opt-btn" @click="onTabClick('users')">Пользователи</UiButton></div>
                <div class="admin-grid__option"><UiButton class="opt-btn" @click="onTabClick('codes')">Пригласительные ключи</UiButton></div>
            </div>
        </div>
        <div class="admin-grid__content card">
            <div v-if="curTab === 'users'" class="admin-grid__users">
                <AdminUsers />
            </div>
            <div v-if="curTab === 'codes'" class="admin-grid__codes">
                <AdminCodes />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.admin-grid{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    height: 100vh;
    font-size: 14px;
    gap: 30px;

    &__menu{
        width: 400px;
    }
    &__codes{
        height: 100%;
    }
    &__users{
        height: 100%;
    }
    &__content{
        width: 100%;
    }

    &__option{
        .opt-btn{
            height: 40px;
            background-color: white;
            color: var(--black-olive);
            border: 1px solid var(--neutral);
            padding: 10px 0px;
            border-radius: 0;
        }
    }
}
</style>