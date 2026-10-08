import inicioHtml from '../../html/inicio.html?raw';
import projetosHtml from '../../html/projetos.html?raw';
import cadastroHtml from '../../html/cadastro.html?raw';
import feedbackHtml from '../../html/feedback-demo.html?raw';

const pages = {
  inicio: { source: inicioHtml, file: 'inicio.html', title: 'Rede Semente — cuidado que cria raízes' },
  projetos: { source: projetosHtml, file: 'projetos.html', title: 'Nossos projetos — Rede Semente' },
  cadastro: { source: cadastroHtml, file: 'cadastro.html', title: 'Faça parte — Rede Semente' },
  feedback: { source: feedbackHtml, file: 'feedback-demo.html', title: 'Componentes de feedback — Rede Semente' },
};

export async function loadTemplate(route) {
  const page = pages[route] || pages.inicio;
  const documentTemplate = new DOMParser().parseFromString(page.source, 'text/html');
  const main = documentTemplate.querySelector('#conteudo');
  if (!main) throw new Error(`O template ${page.file} não tem a área principal #conteudo.`);
  return { route: pages[route] ? route : 'inicio', title: page.title, content: main.innerHTML };
}

export function routeFromLink(link) {
  const href = link.getAttribute('href') || '';
  if (href.startsWith('#') && !href.startsWith('#/')) return null;
  const destination = new URL(link.href, window.location.href);
  const appRoot = new URL(import.meta.env.BASE_URL, window.location.href);
  if (destination.origin !== appRoot.origin) return null;
  const routes = { 'index.html': 'inicio', 'projetos.html': 'projetos', 'cadastro.html': 'cadastro', 'feedback-demo.html': 'feedback' };
  for (const [file, route] of Object.entries(routes)) {
    if (destination.pathname === new URL(file, appRoot).pathname) return route;
  }
  return null;
}
