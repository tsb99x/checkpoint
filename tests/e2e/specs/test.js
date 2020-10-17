const NOTE_TEXT = 'some random note'

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

const ACTIVE_TASKS = task => !task.isDone
const DONE_TASKS = task => task.isDone

function afterToPass(filterFn) {
    function allTasks() {
        let json = localStorage.getItem('tasks')
        console.log(`retrieved json: ${json}`)
        return JSON.parse(json)
    }

    return {
        be: {
            null() {
                cy.should(() => {
                    expect(allTasks()).to.be.null
                })
            }
        },
        include(text) {
            cy.should(() => {
                let processed = allTasks()
                    .filter(filterFn)
                    .map(task => task.text)
                expect(processed).to.include(text)
            })
        }
    }
}

expect.storage = {
    tasks: {
        to: afterToPass(() => true),
        filter: filterFn => ({
            to: afterToPass(filterFn)
        })
    }
}

describe('CheckPoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should create a task and save it', () => {
        taskInput().type(NOTE_TEXT)
        createTaskBtn().click()
        activeTasks().contains(NOTE_TEXT)
        expect.storage.tasks.to.include(NOTE_TEXT)

        cy.reload()
        activeTasks().contains(NOTE_TEXT)
        expect.storage.tasks.to.include(NOTE_TEXT)
    })

    it('should not create an empty task', () => {
        createTaskBtn().click()
        expect.storage.tasks.to.be.null()
    })

    it('should mark tasks as finished and as active', () => {
        taskInput().type(NOTE_TEXT)
        createTaskBtn().click()
        activeTasks().contains(NOTE_TEXT)
        expect.storage.tasks.filter(ACTIVE_TASKS).to.include(NOTE_TEXT)

        finishTaskBtn().click()
        doneTasks().contains(NOTE_TEXT)
        expect.storage.tasks.filter(DONE_TASKS).to.include(NOTE_TEXT)

        activateTaskBtn().click()
        activeTasks().contains(NOTE_TEXT)
        expect.storage.tasks.filter(ACTIVE_TASKS).to.include(NOTE_TEXT)
    })
})
