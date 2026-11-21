// Support file - Atividade 13
// Mantido simples conforme requisito (sem comandos personalizados obrigatórios).
Cypress.on("uncaught:exception", () => {
  // Evita falha por erros de scripts de terceiros no ambiente de demonstração
  return false;
});