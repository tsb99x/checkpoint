function expectTasksInStorageToEq(obj) {
    cy.should(() => expect(localStorage.getItem('tasks')).to.eq(obj))
}

describe('CheckPoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should create a task and save it', () => {
        const noteText = 'some random note'

        cy.get('input').type(noteText)
        cy.get('button').click()
        cy.contains('div', noteText)
        expectTasksInStorageToEq(`["${noteText}"]`)

        cy.reload()
        cy.contains('div', noteText)
        expectTasksInStorageToEq(`["${noteText}"]`)
    })

    it('should not create an empty task', () => {
        cy.get('button').click()
        expectTasksInStorageToEq(null)
    })
})
