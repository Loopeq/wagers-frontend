import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import qs from 'qs'
import api from '@/services/api'

const TOKEN_KEY = 'jwt-token'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || null);

  const login = async (payload) => {
      const { data } = await api.post(
        '/login',
        qs.stringify(payload),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      setToken(data.access_token)
  }

  const setToken = (newToken) => {
      token.value = newToken
      localStorage.setItem(TOKEN_KEY, newToken);
    }

  const logout =() => {
    token.value = null
    localStorage.removeItem(TOKEN_KEY);
  }

  const isAuthenticated = computed(() => token.value);

  return{
    login, setToken, logout, isAuthenticated
  }
})