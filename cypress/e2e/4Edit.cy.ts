
describe('Edit booking', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get("#cy_edit").click()
    cy.wait(500);
    cy.get("#cy_title").type(" ").type("Edited Title Cypress")
    cy.get("#cy_calendarButton").click().get('button').contains("14").click()
    cy.get('mat-select[formControlName=room]').click().get('mat-option').contains('Hal 2').click();
    cy.get("#cy_description").type(" ").type("Edited Cypress can help make automated testing! it is very awesome :)")
    cy.get('button').contains('Opdater bookning').click()
  })
})
