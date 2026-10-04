(() => {
  const menuButton = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.site-nav');

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
      navigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('.project-card[data-category]')];
  const emptyMessage = document.querySelector('#filter-empty');

  if (filters.length && projectCards.length) {
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.dataset.filter;
        filters.forEach((filter) => {
          const active = filter === button;
          filter.classList.toggle('is-active', active);
          filter.setAttribute('aria-pressed', String(active));
        });

        let visibleCount = 0;
        projectCards.forEach((card) => {
          const visible = category === 'todos' || card.dataset.category === category;
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
      });
    });
  }
})();
