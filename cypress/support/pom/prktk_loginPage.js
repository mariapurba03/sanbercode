class loginPage{
    visit() {
        cy.visit('https://www.saucedemo.com/')
    }
    inputUsername(username){
        cy.get('[data-test="username"]').type('username').should('have.value','standard_user')
    } 
    inputPassword(password){
        cy.get('#password').type(password)
    }
    loginButton(){
        cy.get('#login-button').click()
    }
    asssertionLogin(){
        cy.url().should('include', 'inventory')
    } 
}
export default new loginPage()