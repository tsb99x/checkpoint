describe('CheckPoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should add a task and save it', () => {
        const noteText = 'some random note'

        cy.get('input').type(noteText)
        cy.get('button').click()
        cy.contains('div', noteText)

        cy.reload()
        cy.contains('div', noteText)
    })
})
