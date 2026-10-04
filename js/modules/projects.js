export function initProjects(root = document) {
  const filters = [...root.querySelectorAll('[data-filter]')];
  const cards = [...root.querySelectorAll('.project-card[data-category]')];
  const emptyMessage = root.querySelector('#filter-empty');
  if (!filters.length || !cards.length) return;

  filters.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('is-active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let visibleCount = 0;
    cards.forEach((card) => {
      const visible = category === 'todos' || card.dataset.category === category;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    if (emptyMessage) emptyMessage.hidden = visibleCount > 0;
  }));
}
