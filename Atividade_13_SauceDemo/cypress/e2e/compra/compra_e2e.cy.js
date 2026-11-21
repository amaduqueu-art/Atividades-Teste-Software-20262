describe("Compra E2E - SauceDemo", () => {
  it("RF-07/RF-08 - Deve concluir a jornada completa de compra com sucesso", () => {
    // Autenticação
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");

    // Listagem de produtos
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
    cy.get(".inventory_item_name").first().should("be.visible");
    cy.screenshot("01-listagem-produtos");

    // Seleção de produto e captura de dados
    cy.contains(".inventory_item", "Sauce Labs Backpack").within(() => {
      cy.get(".inventory_item_name").invoke("text").as("nomeProduto");
      cy.get(".inventory_item_price").invoke("text").as("precoProduto");
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });
    cy.get(".shopping_cart_badge").should("have.text", "1");

    // Carrinho
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
    cy.get(".title").should("have.text", "Your Cart");
    cy.get("@nomeProduto").then((nome) => {
      cy.get(".inventory_item_name").should("have.text", String(nome).trim());
    });
    cy.get(".cart_quantity").should("have.text", "1");
    cy.screenshot("02-carrinho");

    // Checkout - preenchimento RF-07
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");
    cy.get(".title").should("have.text", "Checkout: Your Information");
    cy.get('[data-test="firstName"]').should("be.visible").type("Ana");
    cy.get('[data-test="lastName"]').should("be.visible").type("Silva");
    cy.get('[data-test="postalCode"]').should("be.visible").type("49000-000");
    cy.screenshot("03-checkout-informacoes");
    cy.get('[data-test="continue"]').click();

    // Revisão
    cy.url().should("include", "/checkout-step-two.html");
    cy.get(".title").should("have.text", "Checkout: Overview");
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    cy.get(".summary_subtotal_label").should("contain", "$");
    cy.get(".summary_total_label").should("contain", "Total");
    cy.screenshot("04-checkout-overview");

    // Confirmação RF-08
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".title").should("have.text", "Checkout: Complete!");
    cy.get(".complete-header").should("be.visible").and("have.text", "Thank you for your order!");
    cy.get(".complete-text").should("be.visible").and("not.be.empty");
    cy.get('[data-test="back-to-products"]').should("be.visible");
    cy.screenshot("05-confirmacao-compra");
  });
});