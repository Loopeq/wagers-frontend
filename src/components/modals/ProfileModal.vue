<script setup>
import { ref, watch } from 'vue';
import UiModalWrapper from '@/ui/UiModalWrapper/UiModalWrapper.vue';
import { defineProps, defineEmits } from 'vue';
import UiButtonExtra from '@/ui/UiButtonExtra/UiButtonExtra.vue';
import { useAuthStore } from '@/store/auth.module';

const authStore = useAuthStore();
const props = defineProps({ show: Boolean });
const emit = defineEmits(['update:show']);

const isVisible = ref(props.show);

watch(() => props.show, (val) => {
  isVisible.value = val;
});

const handleExit = async () => {
    await authStore.logout();
    closeModal();
}


function closeModal() {
  isVisible.value = false;
  emit('update:show', false);
}

</script>

<template>
  <UiModalWrapper :show="isVisible" @update:show="closeModal">
      <div class="modal-action">
        <UiButtonExtra class="modal-action__logout" variant="primary" size="stretch" @click="handleExit">Exit account</UiButtonExtra>
      </div>
  </UiModalWrapper>
</template>

<style scoped lang="scss">
.title{
    align-self: center;
}

.modal-action {
  width: 100%;
  margin-top: auto;
}
</style>
