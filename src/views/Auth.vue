<script setup >
import { useLoginForm } from '@/use/login-form';
import { useRegisterForm } from '@/use/register-form';
import UiButton from '@/ui/UiButton/UiButton.vue';
import UiInput from '@/ui/UiInput/UiInput.vue';
import { useHead } from '@vueuse/head';
import {computed, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import UiIcon from '@/ui/UiIcon/UiIcon.vue';

const {
  username, password,
  onLogin, isAuthFailed
} = useLoginForm();

const {
  regUsername, regPassword, regConfirmPassword,
  inviteCode, isRegisterFailed, onRegister, errorMessage,
} = useRegisterForm();

const router = useRouter();
const route = useRoute();

const routeMessage = computed(() => route.query.message || 'login');

const toggleRoute = (message) => {
  router.replace(
    {
      path: route.path,
      query : {message: message},
    }
  )
}
const headTitle = computed(() => {
  return routeMessage.value === 'login' ? 'Log in' : 'Sign Up';
})

const passwordShownReg = ref(false);
const passwordShownLog = ref(false);
useHead({
    title: headTitle
})
</script>

<template>
    <div v-if="routeMessage === 'login'" class="form-wrapper">
      <form class="form-layout" @submit.prevent="onLogin">
        <div class="form">
          <h1 class="form-title">Log in</h1>
  
          <span v-if="isAuthFailed" class="error-msg">Неправильный логин или пароль</span>

          <UiInput class="form-input" placeholder="E-mail" type="email" v-model="username"/>
          <UiInput 
            class="form-input" 
            placeholder="Пароль" 
            :type="passwordShownLog ? 'text' : 'password'" 
            v-model="password">
            <template #icon-right>
              <UiIcon class="icon-eye" 
                :name="passwordShownLog ? 'eye-off' : 'eye'" 
                @click="passwordShownLog = !passwordShownLog"
                />
              </template>
          </UiInput>

          <UiButton class="form-button" type="submit">
            Войти
          </UiButton>

          <div class="confirm-switch">
            Нет аккаунта? <span @click="toggleRoute('signup')">Регистрация</span>
          </div>
        </div>
      </form>
    </div>


    <div v-if="routeMessage === 'signup'" class="form-wrapper">
      <form class="form-layout" @submit.prevent="onRegister">
        <div class="form">
          <h1 class="form-title">Join</h1>
  
          <span v-if="isRegisterFailed" class="error-msg">{{errorMessage}}</span>

          <UiInput class="form-input" placeholder="E-mail" type="email" v-model="regUsername"/>
          <UiInput 
            class="form-input" 
            placeholder="Пароль" 
            :type="passwordShownReg ? 'text' : 'password'" 
            v-model="regPassword">
            <template #icon-right>
              <UiIcon class="icon-eye" 
                :name="passwordShownReg ? 'eye-off' : 'eye'" 
                @click="passwordShownReg = !passwordShownReg"
                />
              </template>
          </UiInput>
          <UiInput 
            class="form-input" 
            placeholder="Повторите пароль" 
            :type="passwordShownReg ? 'text' : 'password'" 
            v-model="regConfirmPassword">
            <template #icon-right>
              <UiIcon 
                class="icon-eye" 
                :name="passwordShownReg ? 'eye-off' : 'eye'"
                @click="passwordShownReg = !passwordShownReg" 
              />
              </template>
          </UiInput>
          <UiInput class="form-input" placeholder="Пригласительный код" type="text" v-model="inviteCode"/>

          <UiButton class="form-button" type="submit">
            Зарегистрироваться
          </UiButton>

          <div class="confirm-switch">
            Есть аккаунт? <span @click="toggleRoute('login')">Вход</span>
          </div>
        </div>
      </form>
    </div>
</template>
  
  <style lang="scss" scoped>
  .form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--surface);
  }
  
  .form-layout {
    width: 100%;
    max-width: 420px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
  }
  
  .form {
    border-radius: var(--border-radius-medium);
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    font-size: 22px;
    font-weight: bold;
    color: var(--eerie-black);
    text-align: left;
    margin-bottom: 20px;
  }

  .form-button{
    margin-top: 15px;
  }

  .form-input{
    margin-bottom: 10px;
  }

  .error-msg {
    margin-bottom: 10px;
    align-self: flex-start;
    background-color: var(--danger-15);
    color: var(--danger-90);
    padding: 12px;
    border-left: 5px solid var(--danger);
    border-radius: var(--border-radius-medium);
    font-size: 12px;
    width: 100%;
  }

  .confirm-switch{
    margin-top: 10px;
    font-size: 12px;
    color: var(--black-olive);
    
    span{
      cursor: pointer;
      color: var(--flame);
    }

  }
  .icon-eye{
    width: 20px;
    height: 20px;
    opacity: 0.6;

    &:hover{
      scale: 1.15;
    }
  }
  </style>