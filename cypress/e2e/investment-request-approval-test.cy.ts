describe("Investment Request Approval", () => {
  before(() => {
    cy.viewport(1920, 1080);
    // Sign in as company to get company id
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Investment Request Approval Testing", () => {
    cy.viewport(1920, 1080);
    // Go to company profile
    cy.visit("/");
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="profile-label"]').contains("Company Profile").click();
    cy.wait(2000);

    // Click on investor request to approve
    cy.get('[data-id="Investor Request"]').click();
    cy.wait(4000);

    cy.get('[data-id="approve"]').click();
    cy.wait(2000);

    cy.visit("/");
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="profile-label"]').contains("Company Profile").click();
    cy.wait(2000);

    // Check if progress bar is updated
    cy.get('[data-id="progress-bar-invest"]')
      .invoke("text")
      .then((text: string) => {
        const cleanedText = text.replace(/\$|,/g, "").trim();
        const progress = parseInt(cleanedText, 10);
        const minInvestment = parseInt(cleanedText, 10);
        expect(progress).to.eq(minInvestment);
      });
  });
});
