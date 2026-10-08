import { loadTemplate, routeFromLink } from './templates.js';
import { initProjects } from './projects.js';
import { initVolunteerForm } from './volunteer-form.js';
import { initFeedbackDemo } from './feedback-demo.js';

const main = document.querySelector('#conteudo');
const routeNames = new Set(['inicio', 'projetos', 'cadastro', 'feedback']);
let activeRequest;
let renderVersion = 0;
let lastLocationHash = null;

function currentRoute() {
  const route = window.location.hash.replace(/^#\/?/, '');
  return routeNames.has(route) ? route : 'inicio';
}

function updateNavigation(route) {
  document.querySelectorAll('[data-route]').forEach((link) => {
    if (link.dataset.route === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

async function render(route, { focus = false } = {}) {
  const version = ++renderVersion;
  activeRequest?.abort();
  activeRequest = new AbortController();
  main.setAttribute('aria-busy', 'true');
  try {
    const page = await loadTemplate(route, { signal: activeRequest.signal });
    if (version !== renderVersion) return;
    main.innerHTML = page.content;
    document.title = page.title;
    updateNavigation(page.route);
    initProjects(main);
    initVolunteerForm(main);
    initFeedbackDemo(main);
    main.removeAttribute('aria-busy');
    if (focus) {
      const heading = main.querySelector('h1');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  } catch (error) {
    if (error.name === 'AbortError' || version !== renderVersion) return;
    main.removeAttribute('aria-busy');
    main.innerHTML = '<section class="container route-error" role="alert"><h1>Não consegui abrir esta página</h1><p>Confira sua conexão e tente carregar o conteúdo novamente.</p><button class="button button-primary" type="button" data-retry-route>Tentar novamente</button></section>';
    console.error(error);
  }
}

export function startRouter() {
  const navigate = (route, { replace = false, focus = true } = {}) => {
    const hash = `#/${route}`;
    if (!replace && window.location.hash === hash) return;
    if (replace) history.replaceState({ route }, '', hash);
    else if (window.location.hash !== hash) history.pushState({ route }, '', hash);
    lastLocationHash = window.location.hash;
    render(route, { focus });
  };

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-retry-route]')) {
      event.preventDefault();
      render(currentRoute(), { focus: false });
      return;
    }
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hashRoute = link.getAttribute('href').match(/^#\/(inicio|projetos|cadastro|feedback)$/)?.[1];
    const legacyRoute = routeFromLink(link);
    const route = hashRoute || legacyRoute;
    if (!route) return;
    event.preventDefault();
    navigate(route);
  });

  const syncRoute = () => {
    if (window.location.hash === lastLocationHash) return;
    lastLocationHash = window.location.hash;
    render(currentRoute(), { focus: true });
  };
  window.addEventListener('popstate', syncRoute);
  window.addEventListener('hashchange', syncRoute);
  if (!window.location.hash) history.replaceState({ route: 'inicio' }, '', '#/inicio');
  lastLocationHash = window.location.hash;
  render(currentRoute());
}
