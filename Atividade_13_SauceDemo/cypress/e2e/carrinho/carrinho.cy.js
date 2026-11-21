describe("Carrinho - SauceDemo", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("include", "/inventory.html");
  });

  it("RF-03/RF-04 - Deve exibir produtos e adicionar item ao carrinho atualizando contador", () => {
    // RF-03 - listagem de produtos após autenticação
    cy.get(".inventory_list").should("be.visible");
    cy.get(".inventory_item").should("have.length.at.least", 6);
    cy.get(".inventory_item_name").first().should("be.visible").and("not.be.empty");
    cy.get(".inventory_item_price").first().should("be.visible").and("contain", "$");

    // RF-04 - inclusão no carrinho e contador
    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should("be.visible").click();
    cy.get(".shopping_cart_badge").should("be.visible").and("have.text", "1");
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible").and("contain", "Remove");
  });

  it("RF-05/RF-06 - Deve remover item do carrinho e manter consistência das informações", () => {
    // Captura info do produto na listagem
    cy.contains(".inventory_item", "Sauce Labs Backpack").within(() => {
      cy.get(".inventory_item_name").invoke("text").as("nomeProduto");
      cy.get(".inventory_item_price").invoke("text").as("precoProduto");
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    });

    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");

    // RF-06 - consistência das informações no carrinho
    cy.get("@nomeProduto").then((nome) => {
      cy.get(".inventory_item_name").should("have.text", String(nome).trim());
    });
    cy.get("@precoProduto").then((preco) => {
      cy.get(".inventory_item_price").should("have.text", String(preco).trim());
    });
    cy.get(".cart_quantity").should("have.text", "1");

    // RF-05 - remoção
    cy.get('[data-test="remove-sauce-labs-backpack"]').should("be.visible").click();
    cy.get(".cart_item").should("not.exist");
    cy.get(".shopping_cart_badge").should("not.exist");
  });
});