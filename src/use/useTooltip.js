import { reactive, createApp, h } from 'vue';
import UiTooltip from '@/ui/UiTooltip/UiTooltip.vue';

export function useTooltip() {
  let tooltipApp = null;
  const state = reactive({
    visible: false,
    text: '',
    position: { x: 0, y: 0 }
  });

  function show(event, text) {
    state.text = text;
    state.position.x = event.clientX + 12; 
    state.position.y = event.clientY + 12;
    state.visible = true;

    if (!tooltipApp) {
      const container = document.createElement('div');
      document.body.appendChild(container);

      tooltipApp = createApp({
        render() {
          return h(UiTooltip, state);
        }
      });

      tooltipApp.mount(container);
    }
  }

  function hide() {
    state.visible = false;
  }

  return { show, hide };
}
