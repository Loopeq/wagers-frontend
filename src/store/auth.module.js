import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import api from '@/services/api'
import qs from 'qs'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const checkedAuth = ref(false);
  const user = ref(null);
  const isAdmin = computed(() => (user.value.superuser));

  const login = async (payload) => {
    const userResponse = await api.post('/login', qs.stringify(payload),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }); 
    user.value = userResponse.data;
    isAuthenticated.value = true
  }

  const registration = async (payload) => {
    await api.post('/registration', payload );
  }

  const logout = async () => {
    await api.post('/logout');
    isAuthenticated.value = false
  }

  async function checkAuth() {
    try {
      const userResponse = await api.get('/users/me');
      user.value = userResponse.data;
      isAuthenticated.value = true;
    } catch {
      isAuthenticated.value = false;
    }
  }

  return { login, logout, isAuthenticated, checkAuth, checkedAuth, registration, isAdmin, user }
})