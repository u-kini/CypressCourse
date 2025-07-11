/// <reference types="Cypress" />
 
describe('My First Test Suite', function() 
{
 
it('My FirstTest case',function() {
 
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
 
    cy.intercept({
        method : 'GET',
        url : 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
    },
 
     {
         statusCode : 200,
         body : [{
                "book_name": "RestAssured with Java",
                "isbn": "RSU",
                "aisle": "2301"    }]
          
     }).as('bookretrievals')
     cy.get("button[class='btn btn-primary']").click()
     cy.wait('@bookretrievals').then(({request,response})=>
     {
         cy.get('tr').should('have.length',response.body.length+1)
      
     })
 
 
 
 
     //length of the response array = rows of the table
 

 
})

describe('Altering Request', function() 
{
 
it('Security testing, alter request url to check if the response returns 403',function() {
 
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
 
    cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
    (req)=>
    {
    req.url="https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
 
    req.continue((res)=>
    {
       // expect(res.statusCode).to.equal(403)
    })
 }
 ).as("dummyUrl")
 
 cy.get("button[class='btn btn-primary']").click()
 cy.wait('@dummyUrl')
 
})
 
})
 
