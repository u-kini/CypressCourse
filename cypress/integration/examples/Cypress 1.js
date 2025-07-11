/// <reference types="Cypress" />
 //Triple-Slash Directive

describe('My First Test Suite', function() 
{
 
it('My FirstTest case',function() {
cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
cy.get('.search-keyword').type('ca')

cy.wait(2000)
cy.get('.product').should('have.length',5)
cy.get('.product:visible').should('have.length',4)

//Parent child chaining
cy.get('.products').as('productLocator')
cy.get('@productLocator').find('.product').should('have.length',4) 
//find searches within the parent for elements

cy.get(':nth-child(3) > .product-action > button').click()
//:nth-child(3) means 3rd child of any parent, The > combinator means “Only look at its direct children"

cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()
{
    console.log('sf')
})

//.eq(2).contains('ADD TO CART') → Picks the third product from the list and finds an element that literally contains the text “ADD TO CART”.
 
cy.get('@productLocator').find('.product').each(($el) => {  //$el is a jQuery object
 
const textVeg=$el.find('h4.product-name').text()

if(textVeg.includes('Cashews'))
{
cy.wrap($el).find('button').click()  
//In Cypress, cy.wrap() takes a plain value—like a string, object, or jQuery element
//wraps it back into Cypress’s command chain, so you can keep using Cypress commands like .find(), .click(), .should(), etc
}
})
 
//assert if logo text is correctly displayed
cy.get('.brand').should('have.text','GREENKART')
 
//this is to print in logs
cy.get('.brand').then(function(logoelement)
{
    cy.log(logoelement.text())  //text() comes from jQuery
 
})

cy.get('.cart-icon > img').click()

// const logo = cy.get('.brand')            ❌ Problem: doesn't store a resolved element
// cy.log(cy.get('.brand').text())          ❌ Problem: `.text()` runs before `cy.get()` resolves

 
})
 
 
 
})
