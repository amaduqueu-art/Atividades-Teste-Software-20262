describe("Módulo 05 - Responsividade e Experiência de Navegação", () => {
  it("[RESPONSIVIDADE][RF-15] Deve disponibilizar elementos principais de navegação em desktop e mobile", () => {
    // Desktop
    cy.viewport(1366, 768);
    cy.visit("/");
    cy.get(".logo img").should("be.visible");
    cy.get("#categorymenu").should("be.visible");
    cy.get("#filter_keyword").should("be.visible");
    cy.get(".block_7 .dropdown-toggle, .topcart .dropdown-toggle, a[href*='checkout/cart']").should("exist");
    cy.screenshot("m5-rf15-desktop");

    // Mobile
    cy.viewport("iphone-x");
    cy.visit("/");
    cy.get(".logo img").should("be.visible");
    cy.get(".navbar-toggle, .sr-only, #categorymenu").should("exist");
    // menu mobile pode estar colapsado; botão de menu deve existir
    cy.get("body").then(($body) => {
      if ($body.find(".navbar-toggle:visible").length) {
        cy.get(".navbar-toggle:visible").first().click();
      }
    });
    cy.get("#categorymenu, .nav-pills, .categorymenu").should("exist");
    cy.get("a[href*='checkout/cart'], .block_7, .topcart").should("exist");
    cy.screenshot("m5-rf15-mobile");
  });

  it("[RESPONSIVIDADE][RF-16] Deve permitir localizar produto e interagir com carrinho em resolução mobile", () => {
    cy.viewport("iphone-6");
    cy.visit("/");

    // Localizar produto via busca
    cy.get("#filter_keyword").should("exist").clear({ force: true }).type("cream{enter}", { force: true });
    cy.url().should("include", "keyword=cream");
    cy.get(".fixed_wrapper .prdocutname, .thumbnails .prdocutname").should("have.length.greaterThan", 0);
    cy.screenshot("m5-rf16-mobile-busca");

    // Abrir produto e adicionar ao carrinho
    cy.get(".fixed_wrapper .prdocutname, .thumbnails .prdocutname").first().click({ force: true });
    cy.get(".productname .bgnone, h1.productname").should("be.visible");
    cy.get(".cart").should("exist").click({ force: true });

    cy.url().should("include", "rt=checkout/cart");
    cy.get("body").should("contain.text", "Shopping Cart");
    cy.get("input[name*='quantity'], .product-list, table").should("exist");
    cy.screenshot("m5-rf16-mobile-carrinho");
  });
});