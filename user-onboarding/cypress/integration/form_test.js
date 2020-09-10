describe("Form testing", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })
    it("fills out name", () => {
        const name = 'Brandon'
        const email = 'bmmaroni@gmail.com'
        const password = 'test123'

        cy.get('#name').type(name).should('have.value', name)

        cy.get('#email').type(email).should('have.value', email)

        cy.get('#password').type(password).should('have.value', password)

        cy.get('#terms').check().should('be.checked')
    })
})