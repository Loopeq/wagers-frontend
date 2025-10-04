<script setup>
import { ref, watch } from 'vue';
import UiModalWrapper from '@/ui/UiModalWrapper/UiModalWrapper.vue';
import { defineProps, defineEmits } from 'vue';
import UiButtonExtra from '@/ui/UiButtonExtra/UiButtonExtra.vue';
import UiInputExtra from '@/ui/UiInputExtra/UiInputExtra.vue';
import { useAuthBettingStore } from '@/store/authBetting.module';
import { useRegisterModal } from '@/use/useRegisterModal';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['update:show']);
const errorMessage = ref('');
const isVisible = ref(props.show);
const registerModal = useRegisterModal();
const registerStore = useAuthBettingStore();
const email = ref('');
const password = ref('');

watch(() => props.show, (val) => {
  isVisible.value = val;
});

async function handleConfirm() {
  errorMessage.value = '';

  try{
    await registerStore.login({
      username: email.value,
      password: password.value,
    })
    
    closeModal();
  } catch (e){
    errorMessage.value = 'Auth error';
  }

}

function closeModal() {
  isVisible.value = false;
  emit('update:show', false);

  email.value = '';
  password.value = '';
}

const onSuggestion = () => {
  closeModal();
  registerModal.open();
}
</script>

<template>
  <UiModalWrapper :show="isVisible" @update:show="closeModal">
    <div class="modal-content">
      <h2 class="modal-content__title">LOG IN</h2>
      <div class="modal-content__error-message">{{ errorMessage }}</div>
      <div class="modal-content__form">
        <UiInputExtra v-model="email" type="text" placeholder="Email"/>
        <UiInputExtra v-model="password" type="password" placeholder="Password"/>
      </div>
      <div class="modal-action">
        <UiButtonExtra class="modal-action__reg" variant="primary" size="stretch" @click="handleConfirm">Enter</UiButtonExtra>
      </div>
      <div class="modal-content__suggestion">Don't have an account yet? <button @click="onSuggestion">Sign Up</button></div>
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

.modal-action {
  width: 100%;
  margin-top: 20px;
}
</style>
