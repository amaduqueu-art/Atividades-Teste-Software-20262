# Atividade 13 - Automação de Testes UI e E2E com Cypress (SauceDemo)

## Objetivo
Automação de testes de interface e E2E no site [SauceDemo](https://www.saucedemo.com/), cobrindo autenticação, carrinho e fluxo completo de compra.

## Tecnologias
- Node.js
- Cypress

## Estrutura
```text
Atividade_13_SauceDemo/
  cypress.config.js
  package.json
  README.md
  cypress/
    e2e/
      autenticacao/
        login.cy.js
      carrinho/
        carrinho.cy.js
      compra/
        compra_e2e.cy.js
    support/
      e2e.js
    screenshots/   # evidências geradas pela execução
```

## Requisitos cobertos
| Código | Requisito | Teste |
|---|---|---|
| RF-01 | Autenticação com credenciais válidas | `autenticacao/login.cy.js` |
| RF-02 | Credenciais inválidas | `autenticacao/login.cy.js` |
| RF-03 | Listagem de produtos após autenticação | `carrinho/carrinho.cy.js` |
| RF-04 | Inclusão no carrinho e contador | `carrinho/carrinho.cy.js` |
| RF-05 | Remoção do carrinho | `carrinho/carrinho.cy.js` |
| RF-06 | Consistência de informações do produto no carrinho | `carrinho/carrinho.cy.js` |
| RF-07 | Preenchimento de dados no checkout | `compra/compra_e2e.cy.js` |
| RF-08 | Conclusão da compra e confirmação | `compra/compra_e2e.cy.js` |

## Cenários automatizados (mínimo 5)
1. **Positivo - Login válido**: autentica com `standard_user` e valida acesso à listagem.
2. **Negativo - Login inválido**: valida mensagem de erro e permanência na tela de login.
3. **Carrinho - Adição**: valida listagem, inclusão de produto e atualização do contador.
4. **Carrinho - Remoção/Consistência**: valida dados do produto no carrinho e remoção.
5. **E2E - Compra completa**: login → produtos → carrinho → checkout → confirmação.

## Instalação
```bash
npm install
```

## Execução
```bash
# Executar toda a suíte (headless)
npm test

# Executar com interface do Cypress
npm run test:open

# Executar headless com browser Electron visível
npm run test:headed
```

## Evidências
As capturas de tela são salvas em `cypress/screenshots/` durante a execução. O teste E2E também gera screenshots nomeadas por etapa (`01-listagem-produtos`, etc.).

## Observações
- O projeto usa seletores `data-test` do SauceDemo para maior estabilidade.
- Não foi utilizado Page Object Model, fixtures ou comandos personalizados, conforme solicitado.
- Os testes são independentes e podem ser executados sem intervenção manual.