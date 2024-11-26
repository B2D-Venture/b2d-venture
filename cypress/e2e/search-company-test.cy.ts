describe("Search Company Test", () => {
  let companyName = "B2D Venture";
  let wrongCompanyName = "awdkmalkdmlkmawd";

  it("Company Found Test", () => {
    cy.viewport(1300, 1000);
    cy.visit("/company");
    cy.wait(3000);

    cy.get('[data-id="search-input"]').eq(1).type(companyName);
    cy.wait(2000);

    cy.get('[data-id="search-input"]').eq(1).type("{enter}");

    cy.wait(2000);
    cy.get('[data-id="company-card"]').should("have.length", 1);
    cy.get('[data-id="company-card"]').invoke("text").should("eq", companyName);

    cy.wait(2000);
  });

  it("Company Not Found Test", () => {
    cy.viewport(1300, 1000);
    cy.visit("/company");
    cy.wait(3000);

    cy.get('[data-id="search-input"]').eq(1).type(wrongCompanyName);
    cy.wait(2000);

    cy.get('[data-id="search-input"]').eq(1).type("{enter}");

    cy.wait(2000);
    cy.get('[data-id="company-card"]').should("have.length", 0);
    cy.contains("p", "No companies found.").should("be.visible");

    cy.wait(2000);
  });

  it("Navbar Search Test", () => {
    cy.viewport(1300, 1000);
    cy.visit("/");
    cy.wait(2000);

    cy.get('[data-id="search-input"]').eq(0).type(companyName);
    cy.wait(2000);
    cy.get('[data-id="search-input"]').eq(0).type("{enter}");

    cy.location("pathname").should("include", "/company");
    cy.get('[data-id="company-card"]').should("have.length", 1);
    cy.get('[data-id="company-card"]').invoke("text").should("eq", companyName);

    cy.wait(2000);
  });
});
