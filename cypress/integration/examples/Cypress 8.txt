/// <reference types="cypress" />

//const neatCSV = require('neat-csv')

import neatCSV from 'neat-csv'; //for reading csv files

let productName

describe('JWT Session', () => {

  it('is logged in through local storage', async() => {


    //When you login to a webpage, request will get triggered and we will get token in response, and that response will be stored in local/session storage
    //For every request that token will be used/sent
    //If we manually add token in local storage, then it will not ask for login
  

 //Custom command created in commands.js for login and token is stored in environment variable 
 cy.LoginAPI().then(function()

    {

        cy.visit("https://rahulshettyacademy.com/client",

        {

            onBeforeLoad :function(window)

            {

                window.localStorage.setItem('token',Cypress.env('token'))

            }



        })       



    })

    cy.get(".card-body b").eq(1).then(function(ele)

      {

      productName =  ele.text();  //Here product name is stored for future use

      })

    cy.get(".card-body button:last-of-type").eq(1).click();

    cy.get("[routerlink*='cart']").click();

    cy.contains("Checkout").click();

    cy.get("[placeholder*='Country']").type("ind")

    cy.get('.ta-results button').each(($e1, index, $list) => {



      if($e1.text()===" India")

      {

          cy.wrap($e1).click()

      }

  })

    cy.get(".action__submit").click();

    cy.wait(2000)

    cy.get(".order-summary button").click();

//all the files that are downloaded through automation will get stored in downloads folder

   
  //we have to read the entire csv file content and convert that into text format
  //fileServerFolder - inbuilt variable that holds the path of the project
  cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_rahul.csv")

  .then(async(text)=>  //anonymous function

  {

    const csv =  await neatCSV(text)
    
    //csv will be a javascript object
    console.log(csv)

    const actualProductCSV = csv[0]["Product Name"] //because there is space we have to use [] instead of .

    expect(productName).to.equal(actualProductCSV)

  })

  })

  })

