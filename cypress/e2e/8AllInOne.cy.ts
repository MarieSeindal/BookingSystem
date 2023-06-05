describe('Log in and out', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get('button').contains('Log ud').click()
  })
})

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


describe('Delete booking', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get("#cy_delete").click()
  })
})

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

describe('Delete last booking', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.wait(500);
    cy.get('button').contains('Cypress').click()
    cy.get("#cy_delete").click()
  })
})
