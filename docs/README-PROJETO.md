# Rede Semente — SPA

Versão de página única do site da ONG. A navegação usa rotas com hash (`#/inicio`, `#/projetos` e `#/cadastro`); os conteúdos HTML são carregados como templates JavaScript e inseridos na área principal sem recarregar o documento.

## Estrutura

- `index.html`: shell da aplicação, navegação persistente e área onde as telas são renderizadas.
- `html/`: templates das telas institucionais, projetos, cadastro e demonstração de feedback.
- `css/`: folha de estilos compartilhada.
- `imagens/`: local reservado para imagens locais otimizadas. As imagens atuais vêm do Unsplash.
- `js/`: inicialização da SPA e módulos separados por responsabilidade.
- `assets/`: arquivos da versão estática anterior, mantidos como referência e compatibilidade.

## Executar

Como a SPA carrega templates com `fetch` e usa módulos JavaScript, abra o projeto por um servidor local em vez de abrir `index.html` diretamente com `file://`. No VS Code, pode usar a extensão Live Server e abrir este `index.html`.

## Cadastro de demonstração

O formulário valida os campos no navegador, aplica máscaras e salva os registros no `localStorage`. O CPF é validado, mas não é persistido. Os outros dados do formulário permanecem apenas neste navegador; não há envio para servidor. Evite inserir informações pessoais reais.
