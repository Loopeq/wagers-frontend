import { useModal } from './useModal';
import ProfileModal from '@/components/modals/ProfileModal.vue';

export function useProfileModal() {
  return useModal(ProfileModal);
}