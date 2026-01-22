import data from "../../fixtures/orangehrmData.json";

class loginPage {
  //open OrangeHRM login page using baseUrl from fixture
  visit() {
    cy.visit(`${data.baseUrl}/web/index.php/auth/login`);
  }
  //---locators---
  usernameInput() {
    return cy.get('input[name="username"]');
  }

  passwordInput() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('button[type="submit"]');
  }

  errorMessage() {
    return cy.get('.oxd-alert-content-text');
  }

  userDropdown() {
    //user menu on the top right after login
    return cy.get('.oxd-userdropdown-name');
  }

  logoutLink() {
    return cy.contains('a', 'Logout');
  }

  //---actions---
  inputUsername(username) {
    this.usernameInput().clear().type(username);
  }

  inputPassword(password) {
    this.passwordInput().clear().type(password);
  }

  clickLogin() {
    this.loginButton().click();
  }

  //---assertions--- 
  assertLoginSuccess() {
    //successful login should land on dashboard
    cy.url().should('include', '/web/index.php/dashboard');
    cy.contains('Dashboard').should('be.visible');
  }

  assertInvalidCredentials() {
    this.errorMessage().should('contain.text', 'Invalid credentials');
  }

  assertRequired() {
    //form validation for empty required fields
    cy.contains('Required').should('be.visible');
  }

  logout() {
    this.userDropdown().click();
    this.logoutLink().click();
  }

  assertOnLoginPage() {
    //after logout, user should return to login page
    cy.url().should('include', '/web/index.php/auth/login');
    cy.contains('Login').should('be.visible');
  }
}

export default new loginPage();
