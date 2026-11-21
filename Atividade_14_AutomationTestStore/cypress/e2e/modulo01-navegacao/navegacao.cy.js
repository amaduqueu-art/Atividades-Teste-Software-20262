describe("Módulo 01 - Navegação e Organização da Interface", () => {
  it("[POSITIVO][RF-01][RF-03] Deve navegar da página inicial para categoria e retornar à inicial", () => {
    cy.visit("/");
    cy.get("#categorymenu").should("be.visible");
    cy.contains("#categorymenu a", "Apparel & accessories").click({ force: true });

    cy.url().should("include", "path=");
    cy.get(".heading1 .maintext").should("be.visible").and("contain", "Apparel & accessories");
    cy.get(".thumbnails .prdocutname, .fixed_wrapper .prdocutname").should("have.length.greaterThan", 0);
    cy.screenshot("m1-rf01-categoria");

    // RF-03 - retornar à página anterior/inicial
    cy.go("back");
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
    cy.get(".logo img").should("be.visible").click();
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });

  it("[POSITIVO][RF-02] Deve apresentar produtos correspondentes à categoria selecionada", () => {
    cy.visit("/");
    cy.contains("#categorymenu a", "Skincare").click({ force: true });

    cy.get(".heading1 .maintext").should("contain", "Skincare");
    cy.get(".fixed_wrapper .prdocutname").should("have.length.greaterThan", 0);
    cy.get(".fixed_wrapper .prdocutname").each(($el) => {
      cy.wrap($el).should("be.visible").and("not.be.empty");
    });
    // Verifica que breadcrumbs/categoria indicam contexto correto
    cy.get(".breadcrumb").should("contain", "Skincare");
    cy.screenshot("m1-rf02-produtos-categoria");
  });

  it("[COMPORTAMENTO][RF-04] Deve apresentar estados/comportamentos adequados nos elementos de navegação", () => {
    cy.visit("/");
    const menu = "#categorymenu";
    cy.get(menu).should("be.visible");

    // Hover/interação altera estado visível do submenu
    cy.contains("#categorymenu > nav > ul > li > a", "Makeup").trigger("mouseover");
    cy.contains("#categorymenu li a", "Cheeks").should("be.visible");

    // Link ativo/navegável após interação
    cy.contains("#categorymenu li a", "Cheeks").click({ force: true });
    cy.url().should("include", "path=");
    cy.get(".heading1 .maintext").should("contain", "Cheeks");
    cy.get(".breadcrumb li").should("have.length.greaterThan", 1);
    cy.screenshot("m1-rf04-estado-navegacao");
  });
});