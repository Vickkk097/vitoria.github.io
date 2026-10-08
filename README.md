# Rede Semente

Site institucional de uma organização social, desenvolvido como uma Single Page Application (SPA). A proposta é apresentar a ONG, divulgar seus projetos e facilitar o cadastro de pessoas interessadas em colaborar.

## Funcionalidades

- Navegação entre Início, Projetos e Cadastro sem recarregar a página.
- Carregamento de templates HTML com JavaScript.
- Formulário com validações no navegador e máscaras para CPF, telefone e CEP.
- Componentes de feedback visual, como alertas e notificações.
- Armazenamento local de dados de demonstração com `localStorage`.

## Tecnologias

- **HTML5:** estrutura das páginas e dos formulários.
- **CSS3:** estilos, layout responsivo e estados de interação.
- **JavaScript (ES modules):** navegação da SPA, templates, validações e eventos.
- **APIs do navegador:** `fetch` para carregar os templates e `localStorage` para persistir dados localmente.
- **Imagens:** imagens externas do Unsplash com `auto=format`, `srcset` e `sizes` para escolher resoluções conforme a viewport; as imagens abaixo da primeira dobra usam carregamento `lazy`.

## Estrutura do projeto

```text
.
├── index.html       # Estrutura principal e área de renderização da SPA
├── html/            # Templates das telas e demonstração de feedback
├── css/             # Folha de estilos compartilhada
├── js/              # Inicialização e módulos JavaScript
├── imagens/         # Diretório reservado para imagens locais
├── assets/          # Arquivos da versão estática anterior
└── docs/            # Documentação do projeto e do fluxo Git
```

## Como executar localmente

O projeto usa o Vite para servir a aplicação durante o desenvolvimento e gerar a versão otimizada para publicação. É necessário ter Node.js e npm instalados.

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/Vickkk097/vitoria.github.io.git
   cd vitoria.github.io
   ```

2. Instale as dependências e inicie o servidor:

   ```bash
   npm install
   npm run dev
   ```

3. Para gerar a versão de produção e visualizá-la localmente:

   ```bash
   npm run build
   npm run preview
   ```

Os arquivos prontos para publicação são gerados na pasta `dist`. Os templates HTML são importados como texto no módulo da SPA e incluídos na build do Vite.

## Publicação automática

O workflow `.github/workflows/deploy.yml` compila o projeto com Vite e publica a pasta `dist` no GitHub Pages sempre que há um push em `main`. Pull requests para `main` executam a build para conferir se ela funciona, sem publicar a versão.

Na primeira configuração do repositório, em **Settings > Pages > Build and deployment**, selecione **GitHub Actions** como fonte. Depois que o workflow estiver na branch `main`, cada atualização ou merge nessa branch dispara a publicação. A URL fica disponível nas execuções do workflow e na seção **Pages** do repositório.

## Observação sobre o formulário

O formulário serve para demonstração: os dados são guardados apenas no navegador e não são enviados a um servidor. O CPF é validado, mas não é armazenado. Evite preencher o formulário com informações pessoais reais.

## Versionamento

O projeto segue um fluxo GitFlow simplificado: `main` representa a versão estável, `develop` reúne as alterações e branches `feature/` são usadas para funcionalidades específicas. As orientações estão em [docs/GITFLOW.md](docs/GITFLOW.md).

## Documentação relacionada

- [Detalhes da SPA e do cadastro](docs/README-PROJETO.md)
- [Fluxo de branches GitFlow](docs/GITFLOW.md)
- [Perfil da autora](docs/README-PERFIL.md)
