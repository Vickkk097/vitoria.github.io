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

## Aplicação no repositório

O repositório local foi inicializado com um commit-base em `main`. A partir dele, foi criada `develop` para integração e `feature/gitflow-workflow` para registrar esta organização e documentar o fluxo. Depois da revisão, a feature é incorporada em `develop`; `main` continua como linha-base até que a etapa de acessibilidade e preparação de produção seja concluída.

O remoto `origin` aponta para o repositório GitHub informado. O código ainda não foi enviado ao remoto nem publicado.

## Exemplo de comandos

```sh
git switch develop
git switch -c feature/nova-funcionalidade
# implementar e registrar commits pequenos
git switch develop
git merge --no-ff feature/nova-funcionalidade
git branch -d feature/nova-funcionalidade
```
