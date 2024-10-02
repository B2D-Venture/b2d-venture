describe('template spec', () => {
  it('Investor Form Testing', () => {
    cy.visit('/role-register')
    cy.get('[data-id="Investor-role"]').click()
    cy.wait(1000)
    cy.get('[data-id="submit-role"]').click()
    cy.wait(1000)

    cy.get('[data-id="profile-input"]').selectFile('cypress/fixtures/test-image.jpg', { force: true })
    cy.get('[data-id="firstname-input"]').type("Test")
    cy.get('[data-id="lastname-input"]').type("Testing")
    cy.get('[data-id="nid-input"]').type("1234567891234")
    cy.get('[data-id="birthdate"]').click()
    cy.get('button[name="day"]').contains('1').click();
    cy.get('[data-id="email-input"]').type("testing123@gmail.com")
    cy.get('[data-id="national-input"]').type("USA")
    cy.get('[data-id="net-input"]').type("1000000")
    cy.wait(1000)

    cy.get('[data-id="submit-investor"]').click()
  })
})