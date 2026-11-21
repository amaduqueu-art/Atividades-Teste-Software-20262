describe("Módulo 03 - Gerenciamento do Carrinho", () => {
  const adicionarProduto = () => {
    cy.visit("/index.php?rt=product/product&product_id=68");
    cy.get(".productname .bgnone, h1.productname").should("be.visible");
    cy.get(".cart").click();
    cy.url().should("include", "rt=checkout/cart");
  };

  it("[POSITIVO][RF-09] Deve incluir produto no carrinho", () => {
    cy.visit("/index.php?rt=product/product&product_id=68");
    cy.get(".productname .bgnone, h1.productname").invoke("text").then((nome) => {
      cy.get(".cart").click();
      cy.url().should("include", "rt=checkout/cart");
      cy.get("#cart_checkout1, #cart_checkout2, .product-list, table").should("exist");
      cy.get("body").should("contain", nome.trim().substring(0, 10));
      cy.get("td.align_left a, .product-list a").should("exist");
      cy.screenshot("m3-rf09-add-carrinho");
    });
  });

  it("[COMPORTAMENTO][RF-10][RF-11] Deve atualizar quantidade e recalcular valores do carrinho", () => {
    adicionarProduto();

    // Captura total antes
    cy.get("table tbody tr").contains("td", "Total:").siblings("td").last().invoke("text").as("totalAntes");
    cy.get("input[name*='quantity']").first().clear().type("2");
    cy.get("#cart_update").click();

    // RF-10 - quantidade atualizada
    cy.get("input[name*='quantity']").first().should("have.value", "2");
    // RF-11 - valor recalculado
    cy.get("@totalAntes").then((totalAntes) => {
      cy.get("table tbody tr").contains("td", "Total:").siblings("td").last().invoke("text").then((totalDepois) => {
        const parse = (s) => parseFloat(String(s).replace(/[^0-9.,]/g, "").replace(",", "."));
        expect(parse(totalDepois)).to.be.greaterThan(parse(totalAntes));
      });
    });
    cy.screenshot("m3-rf10-rf11-atualizacao");
  });

  it("[COMPORTAMENTO][RF-12] Deve remover produto e exibir comportamento adequado com carrinho vazio", () => {
    adicionarProduto();

    // Remoção
    cy.get("a[href*='remove'], .btn.btn-sm.btn-default, i.fa-trash-o").first().click({ force: true });

    // Estado carrinho vazio / sem item
    cy.url().should("include", "rt=checkout/cart");
    cy.get("body").then(($body) => {
      const t = $body.text().toLowerCase();
      expect(t).to.satisfy((txt) =>
        txt.includes("your shopping cart is empty") || txt.includes("cart is empty") || txt.includes("empty")
      );
    });
    cy.get(".contentpanel, #maincontainer").should("be.visible");
    cy.screenshot("m3-rf12-carrinho-vazio");
  });
});