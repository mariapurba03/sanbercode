describe('Authorization API Test', () =>{
    it('Single User', () => {
        cy.request({
            method:'GET',
            url:'https://reqres.in/api/users/2', 
            headers: {
                'x-api-key' : 'reqres_eca94d29f35449d19193eb3f8f3bd7c0'
            }
        }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('data')
        })
    })
    //kedua
    it('Create Record', () => {
        cy.request({
            method:'POST',
            url:'https://reqres.in/api/users',
            body:{
                "name": "Maria",
                "job": "qa tester"
            },
            headers: {
                'x-api-key' : 'reqres_eca94d29f35449d19193eb3f8f3bd7c0'
            }
        }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name')
                expect(response.body).to.have.property('job')
        })
    })
})