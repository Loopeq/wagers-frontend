<script setup>
import api from '@/services/api';
import { onMounted, ref } from 'vue';
const users = ref(null);
onMounted(async () => {
    const reps = await api.get('/admin/users');
    users.value = reps.data;
})
</script>
<template>
<div class="ui-table-wrapper">
    <table class="ui-table">
        <thead>
            <tr>
                <th class="left">№</th>
                <th>Почта</th>
                <th>Дата регистрации</th>
                <th>Админ</th>
                <th>Отключен</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user, idx) in users" :key="idx">
                <td class="left">{{ idx }}</td>
                <td>{{ user.email }}</td>
                <td>{{ $formatDate(user.created_at) }}</td>
                <td>{{ user.superuser ? "Да" : "Нет" }}</td>
                <td>{{ user.disabled ? "Да" : "Нет"}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style lang="scss" >
.ui-table-wrapper{
  border-radius: 0;
  margin-top: 0;
}
</style>