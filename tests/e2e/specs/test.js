describe('CheckPoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should add a task', () => {
        const noteText = 'some random note'

        cy.get('input').type(noteText)
        cy.get('button').click()
        cy.contains('div', noteText)
    })
})
