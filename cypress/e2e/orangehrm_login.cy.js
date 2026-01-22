import loginPage from "../support/pom/loginPage";
import data from "../fixtures/orangehrmData.json";

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes("Cannot read properties of undefined (reading 'response')")) {
    return false; //prevent cypress from failing the test
  }
});

describe('OrangeHRM - Login', () => {
//open login page before each test
  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-LOGIN-001 – User can log in successfully with valid credentials', () => {
     //intercept dashboard request to make sure login completes properly
    cy.intercept('GET', '**/dashboard/**').as('dashboard');

    loginPage.inputUsername(data.validUsername);
    loginPage.inputPassword(data.validPassword);
    loginPage.clickLogin();

    //wait until dashboard is fully loaded
    cy.wait('@dashboard', { timeout: 20000 });
    loginPage.assertLoginSuccess();
  });

  it('TC-LOGIN-002 – Login should fail when the username is empty and password is provided', () => {
    loginPage.inputPassword(data.validPassword);
    loginPage.clickLogin();
    loginPage.assertRequired();
  });

  it('TC-LOGIN-003 – Login should fail when the password is empty and username is provided', () => {
    loginPage.inputUsername(data.validUsername);
    loginPage.clickLogin();
    loginPage.assertRequired();
  });

  it('TC-LOGIN-004 – Login should fail when both username and password are empty', () => {
    loginPage.clickLogin();
    loginPage.assertRequired();
  });

  it('TC-LOGIN-005 – Login should fail with an invalid username and a valid password', () => {
    loginPage.inputUsername(data.invalidUsername);
    loginPage.inputPassword(data.validPassword);
    loginPage.clickLogin();
    loginPage.assertInvalidCredentials();
  });

  it('TC-LOGIN-006 – Login should fail with a valid username and an invalid password', () => {
    loginPage.inputUsername(data.validUsername);
    loginPage.inputPassword(data.invalidPassword);
    loginPage.clickLogin();
    loginPage.assertInvalidCredentials();
  });

  it('TC-LOGIN-007 – Login should fail with an invalid username and an invalid password', () => {
    loginPage.inputUsername(data.invalidUsername);
    loginPage.inputPassword(data.invalidPassword);
    loginPage.clickLogin();
    loginPage.assertInvalidCredentials();
  });

  it('TC-LOGIN-008 – User can log out successfully after logging in', () => {
    //wait for dashboard request to confirm login finished
    cy.intercept('GET', '**/dashboard/**').as('dashboard');

    loginPage.inputUsername(data.validUsername);
    loginPage.inputPassword(data.validPassword);
    loginPage.clickLogin();

    cy.wait('@dashboard', { timeout: 20000 });
    loginPage.assertLoginSuccess();

    loginPage.logout();
    loginPage.assertOnLoginPage();
  });

   it('TC-LOGIN-009 – Login should be rejected when the username contains leading or trailing spaces', () => {
    //covers a common user input mistake (extra spaces)
    loginPage.inputUsername(`  ${data.validUsername}  `)
    loginPage.inputPassword(data.validPassword)
    loginPage.clickLogin()
    loginPage.assertInvalidCredentials()
  })

  it('TC-LOGIN-010 – Password field should hide typed characters', () => {
    //ensure password is not shown as plain text
    loginPage.usernameInput().should('be.visible')
    loginPage.passwordInput().should('have.attr', 'type', 'password')
  })
  
});
