describe ('Scenario Verifikasi Fungsi Login', () => {
    it('Login dengan username valid dan password valid', () => {
        //Kunjungi web
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') 
        //cari dan masukkan username
        cy.get('[name="username"]').type('Admin')
        //cari dan masukkan password
        cy.get('[name="password"]').type('admin123')
        //masukkan intercept
        cy.intercept('Get','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionsummary')
        //klik tombol login
        cy.get('[type="submit"]').click()
        //verifikasi hasil intercept
        cy.wait('@actionsummary').its('response.statusCode').should('eq',200)
        
    })
})