import RegisterModal from '../components/modals/RegisterModal.vue';
import { useModal } from './useModal';

export function useRegisterModal() {
  return useModal(RegisterModal);
}