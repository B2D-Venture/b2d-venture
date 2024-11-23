describe("Company Registration with Correct Information", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Company Correct Information Form Testing", () => {
    cy.visit("/role-register");
    cy.get('[data-id="Company-role"]').click();
    cy.wait(1000);
    cy.get('[data-id="submit-role"]').click();
    cy.wait(1000);

    cy.get("input[type=file]")
      .first()
      .selectFile("cypress/fixtures/test-b2d-logo.png", {
        force: true,
      });
    cy.get("input[type=file]")
      .eq(1)
      .selectFile("cypress/fixtures/test-banner.png", {
        force: true,
      });
    cy.get('[data-ut-element="button"]').eq(1).click();
    cy.wait(2000);

    cy.get('[data-id="company-input"]').type("B2D Venture", { delay: 100 });
    cy.get('[data-id="abbr-input"]').type("B2D", { delay: 100 });
    cy.get('[data-id="registrationNumber-input"]').type("12345", {
      delay: 100,
    });
    cy.get('[data-id="desc-input"]').type(
      "It's a company that provides a platform for investors to invest in companies.",
      { delay: 25 },
    );
    cy.get('[data-id="funding-input"]').type("500", { delay: 100 });
    cy.get('[data-id="min-input"]').type("5", { delay: 100 });
    cy.get('[data-id="max-input"]').type("100", { delay: 100 });

    // Select a day
    cy.get("select").eq(0).select("1").should("have.value", "1");
    // Select a month
    cy.get("select").eq(1).select("1").should("have.value", "1");
    // Select a year
    cy.get("select").eq(2).select("2025").should("have.value", "2025");

    cy.get('[data-id="share-input"]').type("50", { delay: 100 });
    cy.get('[data-id="totalShare-input"]').type("3000", { delay: 100 });

    // Upload Data Room Document
    cy.get("input[type=file]")
      .last()
      .selectFile("cypress/fixtures/b2d-dataroom.pdf", {
        force: true,
      });
    cy.get('[data-ut-element="button"]').eq(1).click();

    cy.get('[data-id="editor"]')
      .click()
      .type(
        `
        B2D  Venture  is  not  just  a  company;  it  is  a  mission-driven  platform  that  connects  visionary  investors  with  the  companies  shaping  the  future. 
        {enter} With  a  commitment  to  transparency,  security,  and  growth,  B2D  Venture  serves  as  a  bridge  between  the  world's  most  promising  businesses  and  those  who  believe  in  their  potential.
    `,
        { parseSpecialCharSequences: true },
      );

    cy.wait(2000);

    cy.get('[data-id="submit"]').click();
    cy.wait(1000);

    cy.get('[data-id="go-to-profile"]').click();
    cy.wait(3000);

    cy.get('[data-id="company-label"]').contains("B2D Venture");
    cy.get('[data-id="publish-label"]').contains("Publish on Website");
    cy.wait(3000);

    cy.get('[data-id="publish-button"]').click();
    cy.wait(2000);
    cy.get('[data-id="publish-confirm"]').click();

    // Check Label of Request is Waitlisted
    cy.get('[data-id="request-label"]')
      .should("be.visible")
      .contains("Not Approved Yet");
    cy.wait(3000);
  });
});

describe("Company Registration with Incorrect Information", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("companytest02@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Company Incorrect Information Form Testing", () => {
    cy.visit("/role-register");
    cy.get('[data-id="Company-role"]').click();
    cy.wait(1000);
    cy.get('[data-id="submit-role"]').click();
    cy.wait(1000);

    cy.get("input[type=file]")
      .first()
      .selectFile("cypress/fixtures/test-dog-image.jpeg", {
        force: true,
      });
    cy.get("input[type=file]")
      .eq(1)
      .selectFile("cypress/fixtures/test-dog-image.jpeg", {
        force: true,
      });
    cy.get('[data-ut-element="button"]').eq(1).click();
    cy.wait(2000);

    cy.get('[data-id="company-input"]').type("Dog Venture", { delay: 100 });
    cy.get('[data-id="abbr-input"]').type("DOG", { delay: 100 });
    cy.get('[data-id="registrationNumber-input"]').type("12345", {
      delay: 100,
    });
    cy.get('[data-id="desc-input"]').type(
      "It's a dog company that provides a platform for dogs to invest in companies.",
      { delay: 25 },
    );
    cy.get('[data-id="funding-input"]').type("500", { delay: 100 });
    cy.get('[data-id="min-input"]').type("5", { delay: 100 });
    cy.get('[data-id="max-input"]').type("100", { delay: 100 });

    // Select a day
    cy.get("select").eq(0).select("1").should("have.value", "1");
    // Select a month
    cy.get("select").eq(1).select("1").should("have.value", "1");
    // Select a year
    cy.get("select").eq(2).select("2025").should("have.value", "2025");

    cy.get('[data-id="share-input"]').type("50", { delay: 100 });
    cy.get('[data-id="totalShare-input"]').type("3000", { delay: 100 });

    cy.get('[data-id="editor"]').click().type(`Hong  Hong  Hong  !!!`);
    cy.wait(2000);

    cy.get('[data-id="submit"]').click();
    cy.wait(1000);

    cy.get('[data-id="go-to-profile"]').click();
    cy.wait(3000);

    cy.get('[data-id="company-label"]').contains("Dog Venture");
    cy.get('[data-id="publish-label"]').contains("Publish on Website");
    cy.wait(3000);

    cy.get('[data-id="publish-button"]').click();
    cy.wait(2000);
    cy.get('[data-id="publish-confirm"]').click();

    // Check Label of Request is Waitlisted
    cy.get('[data-id="request-label"]')
      .should("be.visible")
      .contains("Not Approved Yet");
    cy.wait(3000);
  });
});

describe("Company Navigation", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("companytest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Investor Navigation Testing", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="profile-label"]').contains("Company Profile").click();
    cy.wait(2000);

    // Check Label of Request is Waitlisted
    cy.get('[data-id="request-label"]').contains("Not Approved Yet");
    cy.wait(3000);
  });
});
