describe ('Scenario Verifikasi Fungsi Login', () => {
    it('Login dengan username valid dan password valid', () => {
        cy.visit('https://www.saucedemo.com/') 
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', 'https://www.saucedemo.com/inventory.html')
    })
})