describe("DataRoom Request Approval", () => {
  let companyId: string;

  before(() => {
    cy.viewport(1920, 1080);
    // Sign in as company to get company id
    cy.visit("/signin");
    cy.wait(1000);
    cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Investor Investment Testing", () => {
    cy.viewport(1920, 1080);
    cy.request({
      method: "GET",
      url: "/api/company",
    }).then((response) => {
      expect(response.status).to.eq(200);
      companyId = response.body.company.id;
      cy.log(companyId);
      // Sign out
      cy.get('[data-id="avatar-dropdown"]').click();
      cy.get('[data-id="signout"]').click();
      cy.wait(3000);

      // Sign in as investor
      cy.visit("/signin");
      cy.wait(2000);
      cy.get('[data-id="email-input"]').type("investortest01@gmail.com");
      cy.get('[data-id="password-input"]').type("ABCDa4321#");
      cy.get('[data-id="submit"]').click();
      cy.wait(3000);

      cy.visit("/");
      cy.visit("/company/" + companyId);

      cy.wait(3000);
      cy.get('[data-id="company-label"]')
        .invoke("text")
        .then((text: string) => {
          expect(text).to.eq("B2D Venture");
        });

      cy.get('[data-id="request-data-room"]').click();

      // Check if alert is shown
      cy.get('[role="alert"]').should("be.visible");
      cy.wait(4000);

      cy.visit("/");
      cy.get('[data-id="avatar-dropdown"]').click();
      cy.get('[data-id="signout"]').click();
      cy.wait(1000);

      // Company sign in to approve the data room request
      cy.visit("/signin");
      cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
      cy.get('[data-id="password-input"]').type("ABCDa4321#");
      cy.get('[data-id="submit"]').click();
      cy.wait(1000);

      // Go to company profile
      cy.visit("/");
      cy.get('[data-id="avatar-dropdown"]').click();
      cy.get('[data-id="profile-label"]').contains("Company Profile").click();
      cy.wait(2000);

      cy.get('[data-id="Data Room Request"]').click();
      cy.wait(2000);

      cy.get('[data-id="approve-button"]').eq(0).click();
      cy.wait(3000);

      cy.visit("/");
      cy.wait(2000);

      cy.get('[data-id="avatar-dropdown"]').click();
      cy.get('[data-id="signout"]').click();
      cy.wait(3000);

      cy.visit("/signin");
      cy.wait(2000);
      cy.get('[data-id="email-input"]').type("investortest01@gmail.com");
      cy.get('[data-id="password-input"]').type("ABCDa4321#");
      cy.get('[data-id="submit"]').click();
      cy.wait(3000);

      cy.visit("/investor-profile");
      cy.wait(2000);
      cy.get("[id='radix-:Rmfnejt6:-trigger-request']").click();

      cy.get('[data-id="status"]').last().should("have.text", "Finalized");
      cy.wait(3000);
    });
  });
});
