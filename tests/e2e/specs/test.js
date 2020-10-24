const RANDOM_NOTE = 'random note'

function getByCy(selector) {
    return cy.get(`[data-cy=${selector}]`)
}

function taskInput() {
    return getByCy('task-input')
}

function createTaskBtn() {
    return getByCy('create-task-btn')
}

function finishTaskBtn() {
    return getByCy('finish-task-btn')
}

function activateTaskBtn() {
    return getByCy('activate-task-btn')
}

function activeTasks() {
    return getByCy('active-tasks')
}

function doneTasks() {
    return getByCy('done-tasks')
}

function moveTaskUpBtn() {
    return getByCy('move-task-up-btn')
}

function moveTaskDownBtn() {
    return getByCy('move-task-down-btn')
}

describe('checkpoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should create a task and save it', () => {
        taskInput().type(RANDOM_NOTE)
        createTaskBtn().click()
        activeTasks().contains(RANDOM_NOTE)

        cy.reload()
        activeTasks().contains(RANDOM_NOTE)
    })

    it('should not create an empty task', () => {
        createTaskBtn().click()
        activeTasks()
            .children()
            .should('have.length', 0)

        taskInput().type(`{enter}`)
        activeTasks()
            .children()
            .should('have.length', 0)
    })

    it('should mark tasks as finished and as active', () => {
        taskInput().type(`${RANDOM_NOTE}{enter}`)
        activeTasks().contains(RANDOM_NOTE)
        doneTasks()
            .contains(RANDOM_NOTE)
            .should('not.exist')

        finishTaskBtn().click()
        doneTasks().contains(RANDOM_NOTE)
        activeTasks()
            .contains(RANDOM_NOTE)
            .should('not.exist')

        activateTaskBtn().click()
        activeTasks().contains(RANDOM_NOTE)
        doneTasks()
            .contains(RANDOM_NOTE)
            .should('not.exist')
    })

    it('should sort tasks properly', () => {
        const TASK_A = 'task a'
        const TASK_B = 'task b'

        function expectTaskOrder(arr) {
            activeTasks().within(() => {
                arr.forEach((el, idx) =>
                    cy
                        .get('div')
                        .eq(idx)
                        .should('contain', el)
                )
            })
        }

        function forActiveTask(taskText, fn) {
            activeTasks()
                .contains(taskText)
                .within(fn)
        }

        taskInput().type(`${TASK_A}{enter}`)
        taskInput().type(`${TASK_B}{enter}`)
        expectTaskOrder([TASK_B, TASK_A])

        forActiveTask(TASK_A, () => moveTaskDownBtn().click())
        expectTaskOrder([TASK_B, TASK_A])

        forActiveTask(TASK_A, () => moveTaskUpBtn().click())
        expectTaskOrder([TASK_A, TASK_B])

        forActiveTask(TASK_A, () => moveTaskUpBtn().click())
        expectTaskOrder([TASK_A, TASK_B])

        forActiveTask(TASK_A, () => moveTaskDownBtn().click())
        expectTaskOrder([TASK_B, TASK_A])
    })
})
