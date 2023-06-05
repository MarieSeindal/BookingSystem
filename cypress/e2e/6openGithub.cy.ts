describe('Navigate to frontend documentation github', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get('button').contains('Dokumentation').click()
    cy.get('a').contains('Frontend').click()
    cy.get('button').contains('Log ud').click()
  })
})
