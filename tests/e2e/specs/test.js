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

const ALL_TASKS = () => true
const ACTIVE_TASKS = task => !task.isDone
const DONE_TASKS = task => task.isDone
const TASK_TEXT = task => task.text

function onTasksInStorage(fn) {
    cy.should(() => {
        let json = localStorage.getItem('tasks')
        let tasks = JSON.parse(json)
        fn(tasks)
    })
}

function checkTaskIsInStorage(filter, mapper, value) {
    onTasksInStorage(tasks => {
        let processed = tasks.filter(filter).map(mapper)
        expect(processed).to.include(value)
    })
}

describe('CheckPoint', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should create a task and save it', () => {
        taskInput().type(NOTE_TEXT)
        createTaskBtn().click()
        activeTasks().contains(NOTE_TEXT)
        checkTaskIsInStorage(ALL_TASKS, TASK_TEXT, NOTE_TEXT)

        cy.reload()
        activeTasks().contains(NOTE_TEXT)
        checkTaskIsInStorage(ALL_TASKS, TASK_TEXT, NOTE_TEXT)
    })

    it('should not create an empty task', () => {
        createTaskBtn().click()
        onTasksInStorage(tasks => {
            expect(tasks).to.be.null
        })
    })

    it('should mark tasks as finished and as active', () => {
        taskInput().type(NOTE_TEXT)
        createTaskBtn().click()
        activeTasks().contains(NOTE_TEXT)
        checkTaskIsInStorage(ACTIVE_TASKS, TASK_TEXT, NOTE_TEXT)

        finishTaskBtn().click()
        doneTasks().contains(NOTE_TEXT)
        checkTaskIsInStorage(DONE_TASKS, TASK_TEXT, NOTE_TEXT)

        activateTaskBtn().click()
        activeTasks().contains(NOTE_TEXT)
        checkTaskIsInStorage(ACTIVE_TASKS, TASK_TEXT, NOTE_TEXT)
    })
})
