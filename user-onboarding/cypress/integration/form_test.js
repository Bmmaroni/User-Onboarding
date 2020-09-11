describe("Form testing", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
    })
    it("fills out form", () => {
        const name = 'Brandon'
        const email = 'bmmaroni@gmail.com'
        const password = 'test123'

        cy.get('[data-cy=submit_button').should('be.disabled')

        cy.get('#name').type(name).should('have.value', name)

        cy.get('#email').type(email).should('have.value', email)

        cy.get('#password').type(password).should('have.value', password)

        cy.get('#terms').check().should('be.checked')

        cy.get('[data-cy=submit_button').should('be.not.disabled')
    })
})