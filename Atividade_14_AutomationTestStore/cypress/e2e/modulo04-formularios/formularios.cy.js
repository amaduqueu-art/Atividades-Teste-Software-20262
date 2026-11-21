describe("Módulo 04 - Formulários e Validação de Interface", () => {
  it("[NEGATIVO][RF-13] Deve validar campos obrigatórios ausentes no formulário de contato", () => {
    cy.visit("/index.php?rt=content/contact");
    cy.get("#ContactUsFrm").should("be.visible");
    // Limpa campos e submete vazio
    cy.get("#ContactUsFrm_first_name").clear();
    cy.get("#ContactUsFrm_email").clear();
    cy.get("#ContactUsFrm_enquiry").clear();
    cy.get("button[title='Submit'], input[title='Submit'], .col-md-6 .btn").contains(/submit/i).click({ force: true });

    // Deve permanecer ou mostrar erro/validação
    cy.url().should("include", "rt=content/contact");
    cy.get("body").then(($body) => {
      const t = $body.text().toLowerCase();
      expect(t).to.satisfy((txt) =>
        txt.includes("required") || txt.includes("error") || txt.includes("please") || txt.includes("name")
      );
    });
    cy.get(".alert-danger, .help-block, .has-error, .element_error").should("exist");
    cy.screenshot("m4-rf13-contato-obrigatorios");
  });

  it("[NEGATIVO][RF-14] Deve exibir mensagem de erro/orientação ao tentar login com dados inválidos", () => {
    cy.visit("/index.php?rt=account/login");
    cy.get("#loginFrm_loginname").should("be.visible").type("usuario_inexistente_qa");
    cy.get("#loginFrm_password").should("be.visible").type("senha_errada");
    cy.get("button[title='Login']").click();

    cy.get(".alert-danger, .alert-error").should("be.visible");
    cy.get(".alert-danger, .alert-error").invoke("text").should("match", /error|incorrect|not provided|warning/i);
    cy.url().should("include", "rt=account/login");
    cy.screenshot("m4-rf14-login-erro");
  });

  it("[NEGATIVO][RF-13] Deve validar obrigatoriedade no cadastro de conta com campos vazios", () => {
    cy.visit("/index.php?rt=account/create");
    cy.get("#AccountFrm_firstname").should("be.visible");
    // Submete sem preencher obrigatórios
    cy.get("button[title='Continue']").click();

    cy.url().should("include", "rt=account/create");
    cy.get(".alert-danger, .alert-error").should("be.visible");
    cy.get("body").then(($body) => {
      const t = $body.text().toLowerCase();
      expect(t).to.satisfy((txt) =>
        txt.includes("error") || txt.includes("required") || txt.includes("you must") || txt.includes("please")
      );
    });
    cy.get(".help-block, .has-error, label.control-label").should("exist");
    cy.screenshot("m4-rf13-cadastro-obrigatorios");
  });
});