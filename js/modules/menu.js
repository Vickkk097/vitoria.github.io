export function initMenu() {
  const button = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.site-nav');
  if (!button || !navigation) return;

  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Abrir menu');
    navigation.classList.remove('is-open');
  };

  button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(opening));
    button.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
    navigation.classList.toggle('is-open', opening);
  });
  navigation.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}
