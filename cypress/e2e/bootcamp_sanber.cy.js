import loginPage from "../support/pom/prktk_loginPage"
import loginData from "../fixtures/loginData.json"

describe ('Scenario Verifikasi Fungsi Login', () => {
    it('Login dengan username valid dan password valid', () => {
        // cy.visit('https://www.saucedemo.com/') 
        loginPage.visit()

        // cy.get('[data-test="username"]').type('standard').should('have.value','standard_user')
        loginPage.inputUsername(loginData.validUsername)

        // cy.get('#password').type('secret_sauce')
        loginPage.inputPassword(loginData.validPassword)

        // cy.get('#login-button').click()
        loginPage.loginButton()

        // cy.url().should('include', 'inventory')
        loginPage.asssertionLogin()
    })
    //test2
    it('Login dengan username valid dan password invalid', () => {
        loginPage.visit()
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()
        //loginPage.asssertionLogin()
    })
    //test3
    it('Login dengan username invalid dan password invalid', () => {
        loginPage.visit()
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.invalidPassword)
        loginPage.loginButton()
    })
    //test4
    it('Login dengan username invalid dan password valid', () => {
        loginPage.visit()
        loginPage.inputUsername(loginData.invalidUsername)
        loginPage.inputPassword(loginData.validPassword)
        loginPage.loginButton()
    })


})