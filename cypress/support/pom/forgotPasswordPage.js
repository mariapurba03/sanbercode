import data from "../../fixtures/orangehrmData.json";

class forgotPasswordPage {
  //open login page as the entry point
  visitLogin() {
    cy.visit(`${data.baseUrl}/web/index.php/auth/login`);
  }
  //---locators---
  forgotPasswordLink() {
    return cy.contains('Forgot your password?');
  }

  usernameInput() {
    return cy.get('input[name="username"]');
  }

  resetButton() {
    return cy.get('button[type="submit"]');
  }

  cancelButton() {
    return cy.contains('button', 'Cancel');
  }

  //---actions---
  openForgotPasswordPage() {
    this.forgotPasswordLink().click();
    //ensure navigation to reset password page
    cy.url().should('include', '/auth/requestPasswordResetCode');
  }

  inputUsername(username) {
    this.usernameInput().clear().type(username);
  }

  clickReset() {
    this.resetButton().click();
  }

  clickCancel() {
    this.cancelButton().click();
  }

  //---assertions---
  assertRequired() {
    //validation message for empty username field
    cy.contains('Required').should('be.visible');
  }

  assertResetSuccess() {
    //confirmation message after requesting password reset
    cy.contains(/Reset Password link sent successfully/i).should('be.visible');
  }

  assertBackToLogin() {
    //user should return to login page after cancelling
    cy.url().should('include', '/auth/login');
    cy.contains('Login').should('be.visible');
  }
}

export default new forgotPasswordPage();
