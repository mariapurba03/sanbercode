// cypress/e2e/orangehrm_directory.cy.js

import loginPage from '../support/pom/loginPage'
import directoryPage from '../support/pom/directoryPage'

describe('OrangeHRM - Directory', () => {
  const data = {
    validUsername: 'Admin',
    validPassword: 'admin123',

    // Job Title harus benar-benar ADA di dropdown Directory
    jobTitle: 'HR Manager',

    location: 'New York Sales Office',
    invalidName: 'zzzzzzzzzzzzzz'
  }

  beforeEach(() => {
    // buka halaman login
    loginPage.visit()

    // pastikan halaman login benar-benar siap (SPA ready)
    cy.get('.orangehrm-login-container', { timeout: 15000 })
      .should('be.visible')

    // proses login
    loginPage.inputUsername(data.validUsername)
    loginPage.inputPassword(data.validPassword)
    loginPage.clickLogin()
    loginPage.assertLoginSuccess()

    // buka halaman Directory
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
