(() => {
  const trigger = document.querySelector('#show-toast');
  const toast = document.querySelector('#demo-toast');
  const inlineError = document.querySelector('#demo-inline-error');
  if (!trigger || !toast || !inlineError) return;

  let hideTimer;
  let removeTimer;

  const hideToast = () => {
    toast.classList.remove('is-visible');
    window.clearTimeout(removeTimer);
    removeTimer = window.setTimeout(() => { toast.hidden = true; }, 240);
  };

  trigger.addEventListener('click', () => {
    window.clearTimeout(hideTimer);
    window.clearTimeout(removeTimer);
    inlineError.hidden = false;
    toast.hidden = false;
    window.requestAnimationFrame(() => toast.classList.add('is-visible'));
    hideTimer = window.setTimeout(hideToast, 3600);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !toast.hidden) hideToast();
  });
})();
