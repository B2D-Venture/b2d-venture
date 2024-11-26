describe("Investor Topup", () => {
  let investorEmail = "investortest01@gmail.com";
  let investorAmount: number;
  let amount = 100000;

  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type(investorEmail);
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Topup Testing", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.wait(1000);
    cy.visit("/investor-profile");
    cy.wait(3000);

    cy.get('[data-id="amount"]')
      .invoke("text")
      .then((text: string) => {
        const cleanedText = text.replace("$", "").replace(",", "").trim();
        investorAmount = parseInt(cleanedText, 10);

        // Fill top up form
        cy.get('[data-id="top-up"]').click();
        cy.get('[data-id="email-input"]').should("have.value", investorEmail);
        cy.get('[data-id="nameOnCard-input"]').type("Steven Jonathan");
        cy.get('[data-id="address-input"]').type("512 Echo Lane Applegate");
        cy.get('[data-id="cardNumber-input"]').type("4111111111111111");
        cy.get('[data-id="city-input"]').type("Jakarta");
        cy.get('[data-id="expMonth-input"]').type("12");
        cy.get('[data-id="topUpAmount-input"]').type(amount.toString());
        cy.get('[data-id="state-input"]').type("California");
        cy.get('[data-id="zipCode-input"]').type("95703");
        cy.get('[data-id="expYear-input"]').type("2025");
        cy.get('[data-id="cvv-input"]').type("123");
        cy.wait(2000);

        cy.get('[type="submit"]').click();
        cy.wait(3000);
        // check if the amount is updated
        cy.get('[data-id="amount"]')
          .invoke("text")
          .then((text: string) => {
            const cleanedNewText = text.replace("$", "").replace(",", "").trim();
            const newAmount = parseInt(cleanedNewText, 10);
            expect(newAmount).to.eq(investorAmount + amount);
          });

        cy.wait(3000);
      });
  });
});
