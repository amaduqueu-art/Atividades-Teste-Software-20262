Cypress.on("uncaught:exception", () => {
  // O site de demonstração pode gerar erros de scripts terceiros; não invalidar testes de UI.
  return false;
});