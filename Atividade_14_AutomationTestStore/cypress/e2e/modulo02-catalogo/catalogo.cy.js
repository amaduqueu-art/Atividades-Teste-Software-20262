describe("Módulo 02 - Catálogo e Apresentação de Produtos", () => {
  it("[POSITIVO][RF-05] Deve apresentar informações essenciais dos produtos na listagem", () => {
    cy.visit("/index.php?rt=product/category&path=43");
    cy.get(".heading1 .maintext").should("contain", "Skincare");

    cy.get(".fixed_wrapper").first().within(() => {
      cy.get(".prdocutname").should("be.visible").and("not.be.empty");
    });
    cy.get(".thumbnail").first().within(() => {
      cy.get(".price, .oneprice, .pricenew").should("be.visible");
      cy.get("a.productcart, .productcart, i.fa-cart-plus, .fa-shopping-cart").should("exist");
    });
    cy.screenshot("m2-rf05-info-produto");
  });

  it("[POSITIVO][RF-06] Deve navegar da listagem para a página de detalhes do produto", () => {
    cy.visit("/index.php?rt=product/category&path=43");
    cy.get(".fixed_wrapper .prdocutname").first().invoke("text").then((nome) => {
      const nomeTrim = nome.trim();
      cy.get(".fixed_wrapper .prdocutname").first().click();
      cy.get(".bgnone").should("be.visible").and("contain", nomeTrim);
      cy.get(".productname .bgnone, h1.productname").should("be.visible");
      cy.get(".productpageprice, .productfilneprice").should("exist");
      cy.get("#product_description, .tab-content").should("be.visible");
      cy.url().should("include", "product_id=");
      cy.screenshot("m2-rf06-detalhe-produto");
    });
  });

  it("[POSITIVO][RF-07] Deve retornar resultados para busca de produto existente", () => {
    cy.visit("/");
    cy.get("#filter_keyword").should("be.visible").clear().type("shoes{enter}");
    cy.url().should("include", "keyword=shoes");
    cy.get(".thumbnails .prdocutname, .fixed_wrapper .prdocutname").should("have.length.greaterThan", 0);
    cy.get(".heading1 .maintext").should("contain.text", "Search");
    cy.screenshot("m2-rf07-busca-existente");
  });

  it("[NEGATIVO][RF-07] Deve apresentar comportamento adequado para busca de produto inexistente", () => {
    cy.visit("/");
    const termo = "zzzzproduto_inexistente_12345";
    cy.get("#filter_keyword").clear().type(`${termo}{enter}`);
    cy.url().should("include", "keyword=");
    cy.get("body").then(($body) => {
      const texto = $body.text().toLowerCase();
      expect(texto).to.satisfy((t) =>
        t.includes("no product") || t.includes("there is no product") || t.includes("0 products") || t.includes("não")
      );
    });
    cy.screenshot("m2-rf07-busca-inexistente");
  });

  it("[CONSISTENCIA][RF-08] Deve manter consistência das informações comerciais entre listagem e detalhes", () => {
    cy.visit("/index.php?rt=product/category&path=43");
    cy.get(".fixed_wrapper").first().within(() => {
      cy.get(".prdocutname").invoke("text").as("nomeLista");
    });
    cy.get(".thumbnail").first().find(".price, .oneprice, .pricenew").first().invoke("text").as("precoLista");

    cy.get(".fixed_wrapper .prdocutname").first().click();
    cy.get("@nomeLista").then((nome) => {
      cy.get(".bgnone").should("contain", String(nome).trim());
    });
    cy.get("@precoLista").then((preco) => {
      const p = String(preco).replace(/\s+/g, " ").trim();
      // Preço deve aparecer na página de detalhes (pode ter formato similar)
      cy.get(".productpageprice, .productfilneprice, .productprice").first().invoke("text").then((precoDetalhe) => {
        const d = precoDetalhe.replace(/\s+/g, " ").trim();
        expect(d).to.contain(p.replace('$','').trim().split('.')[0]);
      });
    });
    cy.screenshot("m2-rf08-consistencia");
  });
});