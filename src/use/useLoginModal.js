import LoginModal from '../components/modals/LoginModal.vue';
import { useModal } from './useModal';

export function useLoginModal() {
  return useModal(LoginModal);
}
