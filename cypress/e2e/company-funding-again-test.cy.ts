describe("Company Funding Again Test", () => {
  let newTotalShares = "50000";
  let newFundingTarget = "1200";
  let newPriceShare = "100";
  let newMinInvest = "5";
  let newMaxInvest = "100";

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("Company Raise Funding Testing", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="profile-label"]').contains("Company Profile").click();
    cy.wait(2000);

    // Check if the company name is correct
    cy.get('[data-id="company-label"]')
      .invoke("text")
      .should("eq", "B2D Venture");
    cy.wait(3000);

    // Check if the company can raise funding when deadline is reached
    cy.get('[data-id="Days Left"]')
      .invoke("text")
      .then((text: string) => {
        const daysLeft = parseInt(text, 10);
        expect(daysLeft).to.be.eq(0);
      });

    cy.get('[data-id="funding-btn"]').click();
    cy.wait(2000);

    // Inform new raise funding
    cy.get('[data-id="total-share-input"]').type(newTotalShares);
    cy.get('[data-id="funding-target-input"]').type(newFundingTarget);
    cy.get('[data-id="price-share-input"]').type(newPriceShare);
    // Select a day
    cy.get("select").eq(0).select("1").should("have.value", "1");
    // Select a month
    cy.get("select").eq(1).select("1").should("have.value", "1");
    // Select a year
    cy.get("select").eq(2).select("2025").should("have.value", "2025");

    cy.get('[data-id="min-invest-input"]').type(newMinInvest);
    cy.get('[data-id="max-invest-input"]').type(newMaxInvest);
    cy.wait(3000);

    cy.get('[type="submit"]').click();
    cy.wait(1500);

    // Check if the company not update the funding
    cy.get('[data-id="Days Left"]')
      .invoke("text")
      .then((text: string) => {
        const daysLeft = parseInt(text, 10);
        expect(daysLeft).to.be.eq(0);
      });

    cy.get('[data-id="Valuation"]')
      .invoke("text")
      .then((text: string) => {
        const valuation = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(valuation).to.be.not.eq(
          Number(newTotalShares) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Funding Target"]')
      .invoke("text")
      .then((text: string) => {
        const funding = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(funding).to.be.not.eq(Number(newFundingTarget));
      });

    cy.get('[data-id="Maximum Investment"]')
      .invoke("text")
      .then((text: string) => {
        const maxInvestment = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(maxInvestment).to.be.not.eq(
          Number(newMaxInvest) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Minimum Investment"]')
      .invoke("text")
      .then((text: string) => {
        const minInvestment = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(minInvestment).to.be.not.eq(
          Number(newMinInvest) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Price per Share"]')
      .invoke("text")
      .then((text: string) => {
        const price = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(price).to.be.not.eq(Number(newPriceShare));
      });

    cy.get('[data-id="Total Shares"]')
      .invoke("text")
      .then((text: string) => {
        const total = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(total).to.be.not.eq(Number(newTotalShares));
      });

    cy.wait(3000);
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="signout"]').click();
    cy.wait(1000);

    // Sign in as an Admin
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("admintest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);

    cy.visit("/admin");
    cy.location("pathname").should("include", "/admin");
    cy.wait(3000);

    cy.get('[data-id="funding-tab"]').click();
    cy.wait(2000);

    cy.get('[data-id="sort-button"]').click();
    cy.get('[data-id="funding-card-name"]')
      .eq(0)
      .should("have.text", "B2D Venture");

    cy.get('[data-id="accordion-trigger"]').eq(0).click();
    cy.wait(2000);

    cy.get('[data-id="approve-button"]').eq(0).click();
    cy.wait(2000);

    // Go to the company profile, check if the company has updated the funding
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="signout"]').click();
    cy.wait(1000);

    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);

    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="profile-label"]').contains("Company Profile").click();
    cy.wait(2000);

    cy.get('[data-id="Days Left"]')
      .invoke("text")
      .then((text: string) => {
        const daysLeft = parseInt(text, 10);
        expect(daysLeft).to.be.not.eq(0);
      });

    cy.get('[data-id="Valuation"]')
      .invoke("text")
      .then((text: string) => {
        const valuation = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(valuation).to.be.eq(
          Number(newTotalShares) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Funding Target"]')
      .invoke("text")
      .then((text: string) => {
        const funding = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(funding).to.be.eq(
          Number(newFundingTarget) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Maximum Investment"]')
      .invoke("text")
      .then((text: string) => {
        const maxInvestment = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(maxInvestment).to.be.eq(
          Number(newMaxInvest) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Minimum Investment"]')
      .invoke("text")
      .then((text: string) => {
        const minInvestment = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(minInvestment).to.be.eq(
          Number(newMinInvest) * Number(newPriceShare),
        );
      });

    cy.get('[data-id="Price per Share"]')
      .invoke("text")
      .then((text: string) => {
        const price = parseInt(text.replace(/\$|,/g, "").trim(), 10);
        expect(price).to.be.eq(Number(newPriceShare));
      });

    cy.get('[data-id="Total Shares"]')
      .invoke("text")
      .then((text: string) => {
        const total = parseInt(text.replace(",", "").trim(), 10);
        expect(total).to.be.eq(Number(newTotalShares));
      });

    cy.get('[data-id="Investors"]')
      .invoke("text")
      .then((text: string) => {
        const investors = parseInt(text, 10);
        expect(investors).to.be.eq(0);
      });

    cy.wait(3000);
  });
});
