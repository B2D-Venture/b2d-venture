describe('Form Authentication', () => {
  beforeEach(() => {
    cy.visit('/signin')
    cy.get('[data-id="email-input"]').type("tcgcardpk001@gmail.com")
    cy.get('[data-id="password-input"]').type("ABCDa4321#")
    cy.get('[data-id="submit"]').click()
    cy.wait(3000)
  });

  it('Investor Form Testing', () => {
    cy.visit('/role-register')
    cy.get('[data-id="Investor-role"]').click()
    cy.get('[data-id="submit-role"]').click()
    cy.wait(1000)

    cy.get('[data-id="profile-input"]').selectFile('cypress/fixtures/test-image.jpg', { force: true })
    cy.get('[data-id="firstname-input"]').type("Test")
    cy.get('[data-id="lastname-input"]').type("Testing")
    cy.get('[data-id="nid-input"]').type("1234567891234")
    cy.get('[data-id="date"]').click()
    cy.get('button[name="day"]').contains('1').click();
    cy.get('[data-id="email-input"]').type("testing123@gmail.com")
    cy.get('[data-id="national-input"]').type("USA")
    cy.get('[data-id="net-input"]').type("1000000")
    cy.wait(1000)

    cy.get('[data-id="submit"]').click()
    cy.wait(2000)
  })

  it('Company Form Testing', () => {
    cy.visit('/role-register')
    cy.get('[data-id="Company-role"]').click()
    cy.wait(1000)
    cy.get('[data-id="submit-role"]').click()
    cy.wait(1000)

    cy.get('[data-id="profile-input"]').selectFile('cypress/fixtures/test-b2d-logo.png', { force: true })
    cy.get('[data-id="banner-input"]').selectFile('cypress/fixtures/test-banner.png', { force: true })
    cy.get('[data-id="company-input"]').type("Test Company")
    cy.get('[data-id="abbr-input"]').type("TST")
    cy.get('[data-id="desc-input"]').type("Description of Company")
    cy.get('[data-id="totalShare-input"]').type("10000000")
    cy.get('[data-id="funding-input"]').type("10000000")
    cy.get('[data-id="min-input"]').type("1000")
    cy.get('[data-id="max-input"]').type("10000")
    cy.get('[data-id="date"]').click()
    cy.get('button[name="day"]').contains('1').click();
    cy.get('[data-id="sec-input"]').type("SecType")
    cy.get('[data-id="share-input"]').type("1200")
    cy.wait(1000)

    cy.get('[data-id="submit"]').click()
  })
})
