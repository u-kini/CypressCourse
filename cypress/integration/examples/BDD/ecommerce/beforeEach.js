
beforeEach(()=>{
    //runs once before all tests in this block
    cy.fixture('example').then(function(data)
    {
        this.data=data
    //even though we have written this.data inside a separate folder,
    //we can still access it through out ecommerce folder
    })

})
