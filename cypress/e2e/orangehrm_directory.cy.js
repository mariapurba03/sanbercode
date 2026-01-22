// cypress/e2e/orangehrm_directory.cy.js

import loginPage from '../support/pom/loginPage'
import directoryPage from '../support/pom/directoryPage'

describe('OrangeHRM - Directory', () => {
  const data = {
    validUsername: 'Admin',
    validPassword: 'admin123',
    //must exist in the Directory "Job Title" dropdown (demo data can be limited)
    jobTitle: 'HR Manager',
    location: 'New York Sales Office',
    invalidName: 'zzzzzzzzzzzzzz'
  }

  beforeEach(() => {
    //start from the login page for a clean session each time
    loginPage.visit()
    //quick sanity check that the login UI is ready before typing
    cy.get('.orangehrm-login-container', { timeout: 15000 })
      .should('be.visible')

    //log in
    loginPage.inputUsername(data.validUsername)
    loginPage.inputPassword(data.validPassword)
    loginPage.clickLogin()
    loginPage.assertLoginSuccess()

    //navigate directly to Directory
    directoryPage.visit()
    directoryPage.assertOnDirectoryPage()
  })

  it('TC-DIR-001 – User can access the Directory page and view the main filters', () => {
    directoryPage.assertOnDirectoryPage()
  })

  it('TC-DIR-002 – Directory displays employee list on initial load', () => {
    directoryPage.assertHasResults()
  })

  it(`TC-DIR-003 – Filter employees by Job Title (${data.jobTitle})`, () => {
    directoryPage.selectJobTitle(data.jobTitle)
    directoryPage.clickSearch()
    directoryPage.assertHasResults()
  })

  it(`TC-DIR-004 – Filter employees by Location (${data.location})`, () => {
    directoryPage.selectLocation(data.location)
    directoryPage.clickSearch()
    directoryPage.assertHasResults()
  })

  it(`TC-DIR-005 - Filter employees using Job Title (${data.jobTitle}) + Location (${data.location})`, () => {
    directoryPage.selectJobTitle(data.jobTitle)
    directoryPage.selectLocation(data.location)
    directoryPage.clickSearch()
    directoryPage.assertHasResults()
  })

  it('TC-DIR-006 – No records are displayed when filtering by a non existent employee name', () => {
    directoryPage.typeEmployeeName(data.invalidName)
    directoryPage.clickSearch()
    directoryPage.assertNoResults()
  })

  it('TC-DIR-007 – Reset clears all filters and restores the default employee list', () => {
    directoryPage.selectJobTitle(data.jobTitle)
    directoryPage.selectLocation(data.location)
    directoryPage.typeEmployeeName(data.invalidName)

    directoryPage.clickReset()
    directoryPage.assertFiltersCleared()
    directoryPage.assertHasResults()
  })
})
