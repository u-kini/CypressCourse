/// <reference types="Cypress" />

describe('Price validation test suite', () => {
  it('Validates the price of Python course', () => {

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    cy.get("tr").each(($row) => {
      const courseName = $row.find("td:nth-child(2)").text().trim() //Grabs second column cell in each row

      if (courseName.includes("Python")) {
        const price = $row.find("td:nth-child(3)").text().trim()
        expect(price).to.equal("26")
      }
    })
  })
})
 //.next() can used to grab the immediate next sibling of a selected element

//There is no direct mouseover support in cypress, we have to use jquery method called "show"
//here we have to invoke on hidden element's immediate parent element

cy.get('div.mouse-hover-content').invoke('show')
//jquery method called "show" overrides any CSS display: none, visibility: hidden, or opacity: 0

cy.contains('Top').click()
//Or we can directly click on hidden elements using {force: true}
cy.contains('Top').click({force: true})


//Handling iframes in Cypress

npm install -D cypress-iframe
import 'cypress-iframe'

cy.frameLoaded(selector) to assert the iframe is ready
cy.iframe(selector) to grab its body and wrap it for chaining


describe('Iframe test with plugin', () => {
  it('can click a button inside an iframe', () => {
    cy.visit('/page-with-iframe')

    // wait for the iframe to load
    cy.frameLoaded('iframe#myFrame')

    // get its body and find elements as normal
    cy.iframe('iframe#myFrame')
      .find('button#submit')
      .click()

   //if we want to use get then use
    cy.iframe('iframe#myFrame').within(() => {
    cy.get('button#submit').click()
    })

    // then make assertions on parent page or inside iframe
    cy.iframe('iframe#myFrame')
      .find('.result')
      .should('contain.text', 'Success')
  })
})

