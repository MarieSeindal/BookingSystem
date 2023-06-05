/**
 * Test Login and out.
 * */
describe('Log in and out', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
  })
})

