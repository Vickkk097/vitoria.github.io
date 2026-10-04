let dismissActiveToast = () => {};
let escapeHandlerReady = false;

export function initFeedbackDemo(root = document) {
  dismissActiveToast();
  const trigger = root.querySelector('#show-toast');
  const toast = root.querySelector('#demo-toast');
  const inlineError = root.querySelector('#demo-inline-error');
  if (!trigger || !toast || !inlineError) return;

  let hideTimer;
  let removeTimer;
  const hide = () => {
    toast.classList.remove('is-visible');
    clearTimeout(removeTimer);
    removeTimer = setTimeout(() => { toast.hidden = true; }, 240);
  };
  dismissActiveToast = () => {
    clearTimeout(hideTimer);
    hide();
  };
  trigger.addEventListener('click', () => {
    clearTimeout(hideTimer);
    clearTimeout(removeTimer);
    inlineError.hidden = false;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    hideTimer = setTimeout(hide, 3600);
  });
  if (!escapeHandlerReady) {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') dismissActiveToast();
    });
    escapeHandlerReady = true;
  }
}
