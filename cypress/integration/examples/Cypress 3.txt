https://docs.cypress.io/api/cypress-api/catalog-of-events

For Ex
In Cypress, cy.on('window:alert', callback) Intercepts the window:alert event triggered by browser and captures text

cy.on('window:alert', (alertText) => {
  expect(alertText).to.equal('This is an alert!');
});


//Child Windows, Cypress by default doesn't support child windows ( we cannot switch to window like selenium)
workaround
1. Make new tab to load in the current tab
-- use jquery to remove "target" attribute at run time and invoke DOM again

describe('Handling Child Windows', () => {
    it('Should handle child window', () => {
      
       cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
 
       cy.get("#opentab").invoke('removeAttr','target').click();
       In Cypress, the .invoke() method is used to call the jQuery method.
       In this case removeAttr()
 
       //handles cross origin/domain
       cy.origin("https://www.qaclickacademy.com",()=>
       {
        cy.get("#navbarSupportedContent a[href*='about']").click();
        cy.get(".mt-50 h2").should('contain','QAClick Academy');
 
       })

    });
 
});
 
 
 
 
 
 
 
  
  
  
  
  
  
