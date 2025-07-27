<template>
    <div class="form-wrapper">
      <form class="form-layout" @submit.prevent="onSubmit">
        <div class="form">
          <h1 class="form-title">Welcome</h1>
  
          <span v-if="isAuthFailed" class="error-msg">Неправильный логин или пароль</span>
  
          <input
            class="form-input"
            type="text"
            placeholder="Email address"
            v-model="username"
          />
  
          <input
            class="form-input"
            type="password"
            placeholder="Enter your password"
            v-model="password"
          />
  
          <UiButton class="form-button" type="submit">
            Log In
          </UiButton>
        </div>
      </form>
    </div>
  </template>
  
<script setup >
import { useLoginForm } from '@/use/login-form';
import UiButton from '@/ui/UiButton/UiButton.vue';
import { useHead } from '@vueuse/head';
const {
  username, password,
  onSubmit, isAuthFailed
} = useLoginForm();
useHead({
        title: 'Log in'
})
</script>
  
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
    gap: 20px;
    width: 100%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    font-size: 22px;
    font-weight: bold;
    color: var(--black-olive);
    text-align: left;
    margin-bottom: 10px;
  }
  
  .form-input {
    padding: 14px 18px;
    font-size: 14px;
    border: 1px solid var(--timberwolf);
    border-radius: var(--border-radius-medium);
    background-color: white;
    color: var(--black-olive);
    transition: border-color 0.3s ease;
  
    &:focus {
      outline: none;
      border-color: var(--flame);
    }

    &::placeholder{
      font-size: 14px;
    }
  }

  .error-msg {
    background-color: var(--danger-15);
    color: var(--danger-90);
    padding: 12px;
    border-left: 5px solid var(--danger);
    border-radius: var(--border-radius-medium);
    font-size: 12px;
  }
  </style>