describe("Investor Investment", () => {
  let companyId: string;

  before(() => {
    cy.viewport(1920, 1080);
    // Sign in as company to get company id
    cy.visit("/signin");
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

      // Sign out
      cy.get('[data-id="avatar-dropdown"]').click();
      cy.get('[data-id="signout"]').click();

      // Sign in as investor
      cy.visit("/signin");
      cy.wait(2000);
      cy.get('[data-id="email-input"]').type("investortest01@gmail.com");
      cy.get('[data-id="password-input"]').type("ABCDa4321#");
      cy.get('[data-id="submit"]').click();
      cy.wait(1000);

      cy.visit("/");
      cy.visit("/company/" + companyId);

      cy.get('[data-id="company-label"]')
        .invoke("text")
        .then((text: string) => {
          expect(text).to.eq("B2D Venture");
        });

      // If days left is not 0, can invest
      cy.get('[data-id="Days Left"]')
        .invoke("text")
        .then((text: string) => {
          const daysLeft = parseInt(text, 10);
          if (daysLeft > 0) {
            cy.get('[data-id="Minimum Investment"]')
              .invoke("text")
              .then((text: string) => {
                const cleanedText = text.replace(/\$|,/g, "").trim();

                const minInvestment = parseInt(cleanedText, 10);

                cy.get('[data-id="Price per Share"]')
                  .invoke("text")
                  .then((text: string) => {
                    const cleanedText = text.replace(/\$|,/g, "").trim();
                    const pricePerShare = parseInt(cleanedText, 10);
                    const shareAmount = Math.floor(
                      minInvestment / pricePerShare
                    );

                    cy.get('[data-id="invest-btn"]').click();
                    cy.wait(2000);

                    cy.get('[data-id="investable-invest-amount"]')
                      .invoke("text")
                      .then((text: string) => {
                        const initialInvestableAmount = parseFloat(
                          text
                            .replace("Available: $", "")
                            .replace(/,/g, "")
                            .trim()
                        );

                        cy.get('[data-id="share-amount-input"]').type(
                          shareAmount.toString()
                        );
                        cy.wait(2000);

                        cy.get('[data-id="submit-investment"]').click();
                        cy.wait(2000);

                        cy.visit("/investor-profile");
                        cy.wait(2500);

                        // Check if investable amount is correct
                        cy.get('[data-id="amount"]')
                          .invoke("text")
                          .then((text: string) => {
                            const cleanedNewText = text.replace(/\$|,/g, "").trim();
                            const currentAmount = parseInt(cleanedNewText, 10);
                            expect(currentAmount).to.eq(
                              initialInvestableAmount - minInvestment
                            );
                          });

                        // Check if the company name that the investor invested in is correct
                        cy.get('[data-id="company-name-logo-box"]')
                          .invoke("text")
                          .then((text: string) => {
                            expect(text).to.eq("B2D Venture");
                          });

                        // Check if the investment amount is correct
                        cy.get('[data-id="invest-amount"]')
                          .invoke("text")
                          .then((text: string) => {
                            const cleanedText = text.replace(/\$|,/g, "").trim();
                            const investAmount = parseInt(cleanedText, 10);
                            expect(investAmount).to.eq(minInvestment);
                          });

                        // Check if the status is waitlisted
                        cy.get('[data-id="status"]')
                          .invoke("text")
                          .then((text: string) => {
                            expect(text.trim()).to.eq("Waitlisted");
                          });
                      });
                  });

                cy.visit("/");
                cy.get('[data-id="avatar-dropdown"]').click();
                cy.get('[data-id="signout"]').click();
                cy.wait(1000);

                // Company sign in to approve the investor request
                cy.visit("/signin");
                cy.get('[data-id="email-input"]').type(
                  "companytest01@gmail.com"
                );
                cy.get('[data-id="password-input"]').type("ABCDa4321#");
                cy.get('[data-id="submit"]').click();
                cy.wait(1000);

                // Go to company profile
                cy.visit("/");
                cy.get('[data-id="avatar-dropdown"]').click();
                cy.get('[data-id="profile-label"]')
                  .contains("Company Profile")
                  .click();
                cy.wait(2000);

                // Click on investor request to approve
                cy.get('[data-id="Investor Request"]').click();
                cy.wait(4000);

                cy.get('[data-id="approve"]').click();
                cy.wait(2000);

                cy.visit("/");
                cy.get('[data-id="avatar-dropdown"]').click();
                cy.get('[data-id="profile-label"]')
                  .contains("Company Profile")
                  .click();
                cy.wait(2000);

                // Check if progress bar is updated
                cy.get('[data-id="progress-bar-invest"]')
                  .invoke("text")
                  .then((text: string) => {
                    const cleanedText = text.replace(/\$|,/g, "").trim();
                    const progress = parseInt(cleanedText, 10);
                    expect(progress).to.eq(minInvestment);
                  });
              });
          }
        });
    });
  });
});
