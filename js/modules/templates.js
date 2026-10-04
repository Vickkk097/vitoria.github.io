const pages = {
  inicio: { file: 'inicio.html', title: 'Rede Semente — cuidado que cria raízes' },
  projetos: { file: 'projetos.html', title: 'Nossos projetos — Rede Semente' },
  cadastro: { file: 'cadastro.html', title: 'Faça parte — Rede Semente' },
  feedback: { file: 'feedback-demo.html', title: 'Componentes de feedback — Rede Semente' },
};

export async function loadTemplate(route, { signal } = {}) {
  const page = pages[route] || pages.inicio;
  const response = await fetch(new URL(`../../html/${page.file}`, import.meta.url), { signal });
  if (!response.ok) throw new Error(`Não foi possível carregar ${page.file}.`);
  const source = await response.text();
  const documentTemplate = new DOMParser().parseFromString(source, 'text/html');
  const main = documentTemplate.querySelector('#conteudo');
  if (!main) throw new Error(`O template ${page.file} não tem a área principal #conteudo.`);
  return { route: pages[route] ? route : 'inicio', title: page.title, content: main.innerHTML };
}

export function routeFromLink(link) {
  const href = link.getAttribute('href') || '';
  if (href.startsWith('#') && !href.startsWith('#/')) return null;
  const destination = new URL(link.href, window.location.href);
  const appRoot = new URL('../../', import.meta.url);
  if (destination.origin !== appRoot.origin) return null;
  const routes = { 'index.html': 'inicio', 'projetos.html': 'projetos', 'cadastro.html': 'cadastro', 'feedback-demo.html': 'feedback' };
  for (const [file, route] of Object.entries(routes)) {
    if (destination.pathname === new URL(file, appRoot).pathname) return route;
  }
  return null;
}
