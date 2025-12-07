<script setup >
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.module';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();


onMounted( async () => {
  const code = route.query.code;
  try {
    await authStore.login({
      code: code
    });  
    router.push('/');
  } catch {
    console.log('e');   
  }
}
)

</script>

<template>
    <div v-if="routeMessage === 'login'" class="form-wrapper">

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