describe("Autenticação - SauceDemo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("RF-01 - Deve autenticar com credenciais válidas", () => {
    cy.get('[data-test="username"]').should("be.visible").type("standard_user");
    cy.get('[data-test="password"]').should("be.visible").type("secret_sauce");
    cy.get('[data-test="login-button"]').should("be.enabled").click();

    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("be.visible").and("have.text", "Products");
    cy.get(".inventory_list").should("be.visible");
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
  });

  it("RF-02 - Deve exibir erro ao autenticar com credenciais inválidas", () => {
    cy.get('[data-test="username"]').type("usuario_invalido");
    cy.get('[data-test="password"]').type("senha_errada");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("eq", "https://www.saucedemo.com/");
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Username and password do not match");
    cy.get(".inventory_list").should("not.exist");
  });
});