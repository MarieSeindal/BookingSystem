describe('Make a booking with allDay', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get('button').contains('Booking').click()
    cy.get("#cy_title").type("Title Cypress")
    cy.get("#cy_calendarButton").click().get('button').contains("22").click()
    cy.get('mat-select[formControlName=room]').click().get('mat-option').contains('Hal 1').click();
    cy.get("#cy_allDay").click('left')
    cy.get("#cy_description").type("Cypress can help make automated testing! it is very awesome :)")
    cy.get('button').contains('Gem bookning').click()
  })
})


