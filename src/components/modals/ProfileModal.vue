<script setup>
import { onMounted, ref, watch } from 'vue';
import UiModalWrapper from '@/ui/UiModalWrapper/UiModalWrapper.vue';
import { defineProps, defineEmits } from 'vue';
import UiButtonExtra from '@/ui/UiButtonExtra/UiButtonExtra.vue';
import { useAuthBettingStore } from '@/store/authBetting.module';

const authBettingStore = useAuthBettingStore();
const props = defineProps({ show: Boolean });
const emit = defineEmits(['update:show']);

const isVisible = ref(props.show);

watch(() => props.show, (val) => {
  isVisible.value = val;
});

const handleExit = async () => {
    await authBettingStore.logout();
    closeModal();
}


function closeModal() {
  isVisible.value = false;
  emit('update:show', false);
}

</script>

<template>
  <UiModalWrapper :show="isVisible" @update:show="closeModal">
    <div class="modal-content">
      <h2 class="modal-content__title">Your account</h2>
      <div class="modal-action">
        <UiButtonExtra variant="primary" size="stretch" @click="handleExit">Exit account</UiButtonExtra>
        <vue-widget 
          shop_id="SbFEQUJUo0yApJXX" 
          api_key="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTnpJNE56TT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiI0NWYzM2I2ODdmNjYzZmY4Y2FmNDRmYzlmN2RhY2E1Mjk0NTc4NTk3MzhkNmQ5M2I5YWJlNmIxZjJlN2U1NWQ5IiwiZXhwIjo4ODE1OTM1MjQ0NH0.loaAQPrWoenU1ihigvf1ABfiGSBgeY6VIbw1Ilepd70" 
          background="#fff" 
          color="#000" 
          border_color="#000" 
          logo="color" 
          width="350px" 
          currency="RUB" 
          amount="1000" 
          text_btn="Pay with CryptoCloud" 
          order_id="YOUR_ORDER_ID" >
        </vue-widget> 
      </div>
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
}

.modal-action {
  width: 100%;
  margin-top: 20px;
}
</style>
