# Fluxo de branches — Rede Semente

O projeto seguirá um fluxo GitFlow simplificado, adequado ao trabalho individual e compatível com uma publicação pelo GitHub Pages.

- `main`: versão estável que corresponde ao site publicado. Só recebe alterações revisadas e prontas para lançamento.
- `develop`: integração contínua das funcionalidades concluídas. É a base para iniciar novas tarefas.
- `feature/<nome-curto>`: branch temporária criada a partir de `develop`, por exemplo `feature/spa-router` ou `feature/form-validation`. Ao terminar, é revisada e incorporada a `develop`.
- `release/<versao>`: preparação de uma versão, quando houver ajustes finais de documentação, acessibilidade e produção. Após a revisão, é incorporada a `main` e sincronizada de volta com `develop`.
- `hotfix/<nome-curto>`: correção urgente criada a partir de `main`; depois de validada, volta tanto para `main` quanto para `develop`.

## Regras de uso

1. Não desenvolver diretamente em `main`.
2. Usar commits pequenos, com mensagens que indiquem a mudança.
3. Revisar e verificar a funcionalidade antes de integrar uma `feature` em `develop`.
4. Publicar somente a partir de uma versão revisada em `main`.
5. Manter a branch `develop` sincronizada depois de uma publicação ou hotfix.

## Estado inicial

Esta política documenta o fluxo proposto. As branches só aparecem no histórico do Git depois da inicialização do repositório e do primeiro commit; a autoria desse commit deve usar o nome e o e-mail escolhidos pela pessoa responsável pelo projeto.
