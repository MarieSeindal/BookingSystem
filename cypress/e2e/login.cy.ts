/**
 * Test Login and out.
 * */
// describe('Log in and out', () => {
//   it('passes', () => {
//     cy.visit('/login')
//     cy.wait(500);
//     cy.get('button').contains('Cypress').click()
//     cy.get('button').contains('Log ud').click()
//   })
// })
//
// describe('Navigate to frontend documentation github', () => {
//   it('passes', () => {
//     cy.visit('/login')
//     cy.wait(500);
//     cy.get('button').contains('Cypress').click()
//     cy.get('button').contains('Dokumentation').click()
//     cy.get('a').contains('Frontend').click()
//     cy.get('button').contains('Log ud').click()
//   })
// })

describe('Navigate to backend documentation github', () => {
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
    // cy.get(mat-slide-toggle#cy_allDay .mat-slide-toggle-input').should('be.checked');
    // cy.get('button').contains('Log ud').click()
  })
})

