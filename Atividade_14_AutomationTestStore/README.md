# Atividade 14 - Automação de Testes de Interface com Cypress (Automation Test Store)

## Objetivo
Suíte automatizada de testes de interface para o e-commerce [Automation Test Store](https://automationteststore.com/), cobrindo navegação, catálogo, carrinho, formulários e responsividade.

## Tecnologias
- Node.js
- Cypress

## Estrutura
```text
Atividade_14_AutomationTestStore/
  cypress.config.js
  package.json
  README.md
  registro-defeitos.md
  relatorio-execucao.md
  cypress/
    e2e/
      modulo01-navegacao/navegacao.cy.js
      modulo02-catalogo/catalogo.cy.js
      modulo03-carrinho/carrinho.cy.js
      modulo04-formularios/formularios.cy.js
      modulo05-responsividade/responsividade.cy.js
    support/e2e.js
    screenshots/
```

## Matriz de requisitos e categorias
| Teste | Módulo | RF | Categoria |
|---|---|---|---|
| Navegar da página inicial para categoria e retornar | M1 | RF-01, RF-03 | Positivo |
| Categoria apresenta produtos correspondentes | M1 | RF-02 | Positivo |
| Estados/comportamentos de navegação | M1 | RF-04 | Comportamento/Estado |
| Informações essenciais dos produtos | M2 | RF-05 | Positivo |
| Listagem para detalhes do produto | M2 | RF-06 | Positivo |
| Busca produto existente | M2 | RF-07 | Positivo |
| Busca produto inexistente | M2 | RF-07 | Negativo |
| Consistência de informações comerciais | M2 | RF-08 | Consistência |
| Inclusão de produto no carrinho | M3 | RF-09 | Positivo |
| Atualizar quantidade e recalcular valores | M3 | RF-10, RF-11 | Comportamento/Estado |
| Remover produto e carrinho vazio | M3 | RF-12 | Comportamento/Estado |
| Campos obrigatórios ausentes no contato | M4 | RF-13 | Negativo |
| Login inválido exibe erro/orientação | M4 | RF-14 | Negativo |
| Cadastro com campos obrigatórios vazios | M4 | RF-13 | Negativo |
| Navegação em desktop e mobile | M5 | RF-15 | Responsividade |
| Localizar produto e interagir com carrinho em mobile | M5 | RF-16 | Responsividade |

## Contagem por categoria
| Categoria | Quantidade |
|---|---:|
| Testes positivos | 6 |
| Testes negativos | 4 |
| Comportamento e estados da interface | 3 |
| Responsividade | 2 |
| Consistência de informações | 1 |
| **Total** | **16** |

## Instalação
```bash
npm install
```

## Execução
```bash
npm test
npm run test:open
npm run test:headed
```

## Evidências
Capturas em `cypress/screenshots/` geradas pelos testes e/ou em falhas.

## Observações
- Testes independentes, sem `cy.wait` fixo desnecessário.
- Sem Page Object Model/CI-CD, conforme atividade.
- Defeitos reais identificados (se houver) estão em `registro-defeitos.md`.
- Resumo de execução em `relatorio-execucao.md`.