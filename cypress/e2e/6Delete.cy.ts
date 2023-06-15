

describe('Delete booking', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get("#cy_delete").click()
  })
})

describe('Delete last booking', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get("#cy_delete").click()
  })
})
