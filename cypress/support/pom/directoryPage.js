import data from "../../fixtures/orangehrmData.json"

class DirectoryPage {
  //open directory page directly using baseUrl from fixture
  visit() {
    cy.visit(`${data.baseUrl}/web/index.php/directory/viewDirectory`)
  }

  //---locators---
  employeeNameInput() {
    return cy.get('input[placeholder="Type for hints..."]')
  }

  jobTitleDropdown() {
    //first dropdown on the filter section (job title)
    return cy.get('.oxd-select-wrapper').eq(0) 
  }

  locationDropdown() {
    //second dropdown on the filter section (location)
    return cy.get('.oxd-select-wrapper').eq(1) 
  }

  searchButton() {
    return cy.contains('button', 'Search')
  }

  resetButton() {
    return cy.contains('button', 'Reset')
  }

  resultsHeader() {
    return cy.contains('Records Found')
  }

  noRecords() {
    return cy.contains('No Records Found')
  }

  //--- assertions---
  assertOnDirectoryPage() {
    cy.url().should('include', '/web/index.php/directory/viewDirectory')
    cy.contains('Directory').should('be.visible')
    cy.contains('Employee Name').should('be.visible')
    cy.contains('Job Title').should('be.visible')
    cy.contains('Location').should('be.visible')
  }

  assertHasResults() {
    this.resultsHeader().should('be.visible')
  }

  assertNoResults() {
    this.noRecords().should('be.visible')
  }

  //---actions---
  typeEmployeeName(name) {
    this.employeeNameInput().clear().type(name)
  }

  selectJobTitle(jobTitle) {
  //job title dropdown can be dynamic, so we wait for the dropdown container
  this.jobTitleDropdown().click()

  cy.get('.oxd-select-dropdown', { timeout: 10000 })
    .should('be.visible')
    .contains(jobTitle)
    .scrollIntoView()
    .click()
}

  selectLocation(location) {
    this.locationDropdown().click()
    cy.contains('.oxd-select-option', location).click()
  }

  clickSearch() {
    this.searchButton().click()
  }

  clickReset() {
  this.resetButton().should('be.visible').click()
}
//new
fieldByLabel(label) {
  return cy.contains('label', label)
    .parents('.oxd-input-group')
    .find('.oxd-select-wrapper')
}

selectedTextByLabel(label) {
  return cy.contains('label', label)
    .parents('.oxd-input-group')
    .find('.oxd-select-text')
}

 assertFiltersCleared() {
  // cek Job Title kembali default
  this.selectedTextByLabel('Job Title')
    .should('contain.text', '-- Select --')

  // cek Location kembali default
  this.selectedTextByLabel('Location')
    .should('contain.text', '-- Select --')

  // hasil list kembali tampil normal
  this.assertHasResults()
}


}

export default new DirectoryPage()
