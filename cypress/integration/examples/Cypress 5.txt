/// <reference types="Cypress" />

// helper to select a date in the React date picker
function selectDate({ year, month, day }) {
  cy.get('.react-date-picker__inputGroup').click()

  // navigate up to year selection
  cy.get('.react-calendar__navigation__label').click()
  cy.get('.react-calendar__navigation__label').click()

  // choose year
  cy.contains('.react-calendar__tile', year).click()

  // choose month (zero-based index)
  cy.get('.react-calendar__year-view__months__month')
    .eq(month - 1)
    .click()

  // choose day
  cy.contains('abbr.react-calendar__tile', day).click()
}

describe('Calendar test', () => {
  it('Verify date selection', () => {
    const targetDate = { year: '2027', month: 6, day: '15' }

    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')

    selectDate(targetDate)

    // verify inputs: month, day, year
    cy.get('.react-date-picker__inputGroup__input')
      .should('have.length', 3)
      .then(($inputs) => {
        expect($inputs.eq(0)).to.have.value(String(targetDate.month))
        //.eq() can be used with Cypress chain of commands
        expect($inputs.eq(1)).to.have.value(targetDate.day)
        expect($inputs.eq(2)).to.have.value(targetDate.year)
      })
  })
})


//filter function in Cypress
cy.get('ul li')
  .filter('.active')             // only <li> elements with class "active"
  .should('have.length', 2)


cy.get('input')
  .filter(':visible')            // only inputs currently visible
  .should('have.length', 5)

cy.get('tr')
  .filter((index, element) => {
    // element is a raw DOM node
    return element.innerText.includes('Pending')
  })
  .should('have.length.at.least', 1)
