function onTasksInStorage(fn) {
    cy.should(() => {
        let json = localStorage.getItem('tasks')
        let tasks = JSON.parse(json)
        fn(tasks)
    })
}

describe('CheckPoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should create a task and save it', () => {
        const NOTE_TEXT = 'some random note'

        function checkTaskExists() {
            cy.contains('div', NOTE_TEXT)
            onTasksInStorage(tasks => {
                let texts = tasks.map(task => task.text)
                expect(texts).to.include(NOTE_TEXT)
            })
        }

        cy.get('input').type(NOTE_TEXT)
        cy.get('button').click()
        checkTaskExists()

        cy.reload()
        checkTaskExists()
    })

    it('should not create an empty task', () => {
        cy.get('button').click()
        onTasksInStorage(tasks => {
            expect(tasks).to.be.null
        })
    })
})
