<script setup>
import { ref, watch } from 'vue';
import UiButtonExtra from '@/ui/UiButtonExtra/UiButtonExtra.vue';
import UiModalWrapper from '@/ui/UiModalWrapper/UiModalWrapper.vue';
import { defineProps, defineEmits } from 'vue';
import UiInputExtra from '@/ui/UiInputExtra/UiInputExtra.vue';
import { useAuthBettingStore } from '@/store/authBetting.module';
import { useLoginModal } from '@/use/useLoginModal';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['update:show']);

const isVisible = ref(props.show);

watch(() => props.show, (val) => {
  isVisible.value = val;
});

const registerStore = useAuthBettingStore();
const loginModal = useLoginModal();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

async function handleConfirm() {
  errorMessage.value = '';

  if (!email.value || !validateEmail(email.value)) {
    errorMessage.value = 'Invalid email address';
    return;
  }

  if (!password.value) {
    errorMessage.value = 'Password cannot be empty';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match';
    return;
  }

  try{
    await registerStore.registration({
      email: email.value,
      password: password.value,
    })

    await registerStore.login({
      username: email.value,
      password: password.value,
    })
    
    closeModal();
  } catch (e){
    errorMessage.value = '500. Register error';
  }

}

function closeModal() {
  isVisible.value = false;
  emit('update:show', false);

  email.value = '';
  password.value = '';
  confirmPassword.value = '';
  errorMessage.value = '';
}

const onSuggestion = () => {
  closeModal();
  loginModal.open();
}
</script>

<template>
  <UiModalWrapper :show="isVisible" @update:show="closeModal">
    <div class="modal-content">
      <h2 class="modal-content__title">JOIN</h2>
      <div class="modal-content__error-message">{{ errorMessage }}</div>
      <div class="modal-content__form">
        <UiInputExtra v-model="email" type="email" placeholder="Email"/>      
        <UiInputExtra v-model="password" type="password" placeholder="Password"/>
        <UiInputExtra v-model="confirmPassword" type="password" placeholder="Confirm Password"/>
      </div>
      <div class="modal-action">
        <UiButtonExtra variant="primary" size="stretch" @click="handleConfirm">Confirm</UiButtonExtra>
      </div>
      <div class="modal-content__suggestion">Already have an account? <button @click="onSuggestion">Sign in</button></div>
    </div>
  </UiModalWrapper>
</template>


<style scoped lang="scss">
.modal-content {
  display: flex;
  flex-direction: column;

  &__title{
    align-self: center;
  }

  &__form{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__error-message{
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 12px;
    color: var(--danger-90);
  }

  &__suggestion{
    font-size: 12px;
    margin-top: 25px;
    text-align: center;

    button{
      color: var(--flame);
    }
  }
}

.modal-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius-small);
  border: 1px solid var(--timberwolf);
  background-color: var(--surface);
  color: var(--eerie-black);
}

.modal-action {
  width: 100%;
  margin-top: 20px;
}
</style>
