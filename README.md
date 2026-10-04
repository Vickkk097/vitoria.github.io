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
- **Imagens:** imagens externas do Unsplash.

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

Como o projeto usa `fetch` e módulos JavaScript, ele precisa ser aberto por um servidor local. Abrir o `index.html` diretamente com `file://` pode impedir o carregamento dos templates.

1. Clone o repositório e entre na pasta:

   ```bash
   git clone https://github.com/Vickkk097/vitoria.github.io.git
   cd vitoria.github.io
   ```

2. Abra a pasta no VS Code e instale a extensão **Live Server**, se ainda não tiver.
3. Abra o `index.html` e selecione **Go Live**.
4. O site será aberto no navegador pelo servidor local.

O projeto não precisa de instalação de pacotes npm. No momento, não há comandos de build ou de testes automatizados configurados.

## Observação sobre o formulário

O formulário serve para demonstração: os dados são guardados apenas no navegador e não são enviados a um servidor. O CPF é validado, mas não é armazenado. Evite preencher o formulário com informações pessoais reais.

## Versionamento

O projeto segue um fluxo GitFlow simplificado: `main` representa a versão estável, `develop` reúne as alterações e branches `feature/` são usadas para funcionalidades específicas. As orientações estão em [docs/GITFLOW.md](docs/GITFLOW.md).

## Documentação relacionada

- [Detalhes da SPA e do cadastro](docs/README-PROJETO.md)
- [Fluxo de branches GitFlow](docs/GITFLOW.md)
- [Perfil da autora](docs/README-PERFIL.md)
