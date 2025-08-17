<script setup>
import api from '@/services/api';
import { onMounted, ref } from 'vue';
import UiButton from '@/ui/UiButton/UiButton.vue';
const codes = ref(null);
const removeCode = async(code) => {
    const response = await api.delete(`/admin/code?code=${code}`);
    if (response.status === 200){
        alert('Код удалён');
        await getCodes(); 
    }
}
const getCodes = async () => {
    const response = await api.get('/admin/codes');
    codes.value = response.data;
}
const releaseCode = async() => {
    const response = await api.post('/admin/release_code');
    if (response.status === 200){
        alert('Код создан')
        await getCodes()
    }
}
onMounted(async () => {
    await getCodes()
})
</script>
<template>
<div class="ui-table-wrapper">
    <table class="ui-table">
        <thead>
            <tr>
                <th class="left">№</th>
                <th>Почта</th>
                <th>Код</th>
                <th>Дата создания</th>
                <th>Использован</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(code, idx) in codes" :key="idx">
                <td class="left">{{ idx }}</td>
                <td >{{ code.user_email }}</td>
                <td>{{ code.code }}</td>
                <td>{{ $formatDate(code.created_at) }}</td>
                <td>
                    {{ code.is_used ? "Да" : "Нет"}}
                    <UiButton v-if="!code.is_used" class="remove-code" @click="removeCode(code.code)">Удалить</UiButton>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="release-code-container">
        <UiButton @click="releaseCode" class="btn-realese">Выпустить ключ</UiButton>
    </div>
</div>
</template>

<style lang="scss" scoped>
.ui-table-wrapper{
  border-radius: 0;
  margin-top: 0;
  height: 100%;
  position: relative; 
}

.release-code-container{
    position: fixed;
    bottom: 10px;
    right: 50px;

    .btn-realese{
        height: 60px; 
        padding: 20px;
    }
}

.remove-code{
    font-size: 10px;
    padding: 0;
    margin-left: 10px; 
    height: 20px;
    width: 100px;
}
</style>