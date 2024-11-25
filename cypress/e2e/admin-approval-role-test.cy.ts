describe("Admin Approve Request", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("admintest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Admin Approve Company Request Testing", () => {
    cy.visit("/admin");
    cy.location("pathname").should("include", "/admin");
    cy.wait(3000);

    cy.get('[data-id="company-tab"]').click();
    cy.get('[data-id="company-card-name"]')
      .eq(0)
      .should("have.text", "B2D Venture");
    cy.get('[data-id="accordion-trigger"]').eq(0).click();
    cy.wait(3000);

    cy.get('[data-id="approve-button"]').eq(0).click();
    cy.get('[data-id="company-card-name"]')
      .eq(0)
      .should("not.have.text", "B2D Venture");
    cy.wait(3000);
  });

  it("Admin Approve Investor Request Testing", () => {
    cy.visit("/admin");
    cy.location("pathname").should("include", "/admin");
    cy.wait(3000);

    cy.get('[data-id="investor-tab"]').click();
    cy.get('[data-id="investor-card-name"]')
      .eq(0)
      .should("have.text", "Steven Jonathan");
    cy.get('[data-id="accordion-trigger"]').eq(0).click();
    cy.wait(3000);

    cy.get('[data-id="approve-button"]').eq(0).click();
    cy.get('[data-id="investor-card-name"]')
      .eq(0)
      .should("not.have.text", "Steven Jonathan");
    cy.wait(3000);
  });
});

describe("Admin Reject Request", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("admintest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Admin Reject Company Request Testing", () => {
    cy.visit("/admin");
    cy.location("pathname").should("include", "/admin");
    cy.wait(3000);

    cy.get('[data-id="company-tab"]').click();
    cy.get('[data-id="company-card-name"]')
      .eq(0)
      .should("have.text", "Dog Venture");
    cy.get('[data-id="accordion-trigger"]').eq(0).click();
    cy.wait(3000);

    cy.get('[data-id="reject-button"]').eq(0).click();
    cy.get('[data-id="checkbox-message"]').eq(0).click();
    cy.get('[data-id="checkbox-message"]').eq(1).click();
    cy.get('[data-id="checkbox-message"]').eq(2).click();
    cy.get('[data-id="checkbox-message"]').eq(3).click();
    cy.get('[data-id="checkbox-message"]').eq(4).click();
    cy.get('[data-id="checkbox-message"]').eq(5).click();
    cy.get('[data-id="checkbox-message"]').eq(6).click();
    cy.wait(3000);

    cy.get('[type="submit"]').click();
    cy.wait(3000);
  });

  it("Admin Reject Investor Request Testing", () => {
    cy.visit("/admin");
    cy.location("pathname").should("include", "/admin");
    cy.wait(3000);

    cy.get('[data-id="investor-tab"]').click();
    cy.get('[data-id="investor-card-name"]')
      .eq(0)
      .should("have.text", "wadwasdwa dwawda");
    cy.get('[data-id="accordion-trigger"]').eq(0).click();
    cy.wait(3000);

    cy.get('[data-id="reject-button"]').eq(0).click();
    cy.get('[data-id="checkbox-message"]').eq(0).click();
    cy.get('[data-id="checkbox-message"]').eq(1).click();
    cy.get('[data-id="checkbox-message"]').eq(2).click();
    cy.wait(3000);

    cy.get('[type="submit"]').click();
    cy.wait(3000);
  });
});
