import { createApp, h } from 'vue';

export function useModal(component) {
  let modalApp = null;

  function open(props = {}) {
    if (!modalApp) {
      const container = document.createElement('div');
      document.body.appendChild(container);

      modalApp = createApp({
        render() {
          return h(component, {
            ...props,
            show: true,
            'onUpdate:show': (val) => {
              if (!val) close();
            },
          });
        },
      });

      modalApp.mount(container);
    }
  }

  function close() {
    if (modalApp) {
      modalApp.unmount();
      if (modalApp._container) modalApp._container.remove();
      modalApp = null;
    }
  }

  return { open, close };
}