describe("Investor Registration with Correct Information", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("investortest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Correct Information Investor Form Testing", () => {
    cy.visit("/role-register");
    cy.get('[data-id="Investor-role"]').click();
    cy.wait(1000);
    cy.get('[data-id="submit-role"]').click();
    cy.wait(1000);

    cy.get("input[type=file]").selectFile(
      "cypress/fixtures/test-profile-image.jpg",
      {
        force: true,
      },
    );
    cy.wait(2000);
    cy.get('[data-id="firstname-input"]').type("Steven");
    cy.get('[data-id="lastname-input"]').type("Jonathan");
    cy.get('[data-id="nid-input"]').type("1234567890");

    // Select a day
    cy.get("select").eq(0).select("12").should("have.value", "12");
    // Select a month
    cy.get("select").eq(1).select("4").should("have.value", "4");
    // Select a year
    cy.get("select").eq(2).select("2003").should("have.value", "2003");

    cy.get('[data-id="national-input"]').type("United State");
    cy.get('[data-id="net-input"]').type("1000000");
    cy.wait(3000);

    cy.get('[data-id="submit"]').click();
    cy.wait(3000);

    cy.get('[data-id="label"]').contains("Submit Success");
    // Check Description of Success Form
    cy.get('[data-id="desc"]').contains(
      "Waiting for admin approval of your information",
    );
    cy.wait(1000);

    // Go to Investor Profile
    cy.get('[data-id="go-to-profile"]').click();
    cy.wait(3000);
    cy.location("pathname").should("include", "/investor-profile");

    // Check Label of Request is Waitlisted
    cy.get('[data-id="request-label"]').contains("Not Approved Yet");
    cy.wait(3000);
  });
});

describe("Investor Registration with Incorrect Information", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("investortest02@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Incorrect Information Investor Form Testing", () => {
    cy.visit("/role-register");
    cy.get('[data-id="Investor-role"]').click();
    cy.wait(1000);
    cy.get('[data-id="submit-role"]').click();
    cy.wait(1000);

    cy.get("input[type=file]").selectFile(
      "cypress/fixtures/test-dog-image.jpeg",
      {
        force: true,
      },
    );
    cy.wait(2000);
    cy.get('[data-id="firstname-input"]').type("wadwasdwa");
    cy.get('[data-id="lastname-input"]').type("dwawda");
    cy.get('[data-id="nid-input"]').type("9999999");

    // Select a day
    cy.get("select").eq(0).select("12").should("have.value", "12");
    // Select a month
    cy.get("select").eq(1).select("4").should("have.value", "4");
    // Select a year
    cy.get("select").eq(2).select("2003").should("have.value", "2003");

    cy.get('[data-id="national-input"]').type("wadawdaw");
    cy.get('[data-id="net-input"]').type("1000000");
    cy.wait(3000);

    cy.get('[data-id="submit"]').click();
    cy.wait(3000);

    cy.get('[data-id="label"]').contains("Submit Success");
    // Check Description of Success Form
    cy.get('[data-id="desc"]').contains(
      "Waiting for admin approval of your information",
    );
    cy.wait(1000);

    // Go to Investor Profile
    cy.get('[data-id="go-to-profile"]').click();
    cy.wait(3000);
    cy.location("pathname").should("include", "/investor-profile");

    // Check Label of Request is Waitlisted
    cy.get('[data-id="request-label"]').contains("Not Approved Yet");
    cy.wait(3000);
  });
});

describe("Investor Navigation", () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit("/signin");
    cy.get('[data-id="email-input"]').type("investortest01@gmail.com");
    cy.get('[data-id="password-input"]').type("ABCDa4321#");
    cy.get('[data-id="submit"]').click();
    cy.wait(1000);
  });

  it("Investor Navigation Testing", () => {
    cy.viewport(1920, 1080);
    cy.visit("/");
    cy.get('[data-id="avatar-dropdown"]').click();
    cy.get('[data-id="profile-label"]').contains("Investor Profile").click();
    cy.wait(2000);

    cy.location("pathname").should("include", "/investor-profile");

    // Check Label of Request is Waitlisted
    cy.get('[data-id="request-label"]').contains("Not Approved Yet");
    cy.wait(3000);
  });
});
