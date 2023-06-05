
describe('Make a booking with all fields filled out', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get('button').contains('Booking').click()
    cy.get("#cy_title").type("Cypress title")
    cy.get("#cy_date").type("01/01/2024")
    cy.get("#cy_time").type("11:25")
    cy.get("#cy_duration").type("30")
    cy.get('mat-select[formControlName=room]').click().get('mat-option').contains('Rum 3').click();
    cy.get("#cy_description").type("Cypress can help make automated testing!")
    cy.get('button').contains('Gem bookning').click()
  })
})


