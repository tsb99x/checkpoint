import Vue from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { loadJson, saveJson } from './util'

const EVENTS = 'events'
const ORDER = 'order'

const CREATE_TASK = 'createTask'
const FINISH_TASK = 'finishTask'
const ACTIVATE_TASK = 'activateTask'

let events

export const state = Vue.observable({
    tasks: {},
    order: []
})

export function initialize() {
    events = loadJson(EVENTS, [])
    events.forEach(event => processors.apply(event))
    state.order = loadJson(ORDER, collectOrder())
}

export const getters = {
    activeTasks() {
        return Object.values(state.tasks)
            .filter(task => !task.isDone)
            .sort(
                (a, b) => state.order.indexOf(a.id) - state.order.indexOf(b.id)
            )
    },

    doneTasks() {
        return Object.values(state.tasks).filter(task => task.isDone)
    }
}

const processors = {
    apply(event) {
        this[event.type][event.version || 'v1'](event)
    },
    createTask: {
        v1(event) {
            Vue.set(state.tasks, event.entityId, {
                id: event.entityId,
                title: event.title,
                isDone: false
            })
        }
    },
    finishTask: {
        v1(event) {
            state.tasks[event.entityId].isDone = true
        }
    },
    activateTask: {
        v1(event) {
            state.tasks[event.entityId].isDone = false
        }
    }
}

function pushEvent(event) {
    processors.apply(event)
    events.push(event)
    saveJson(EVENTS, events)
}

function newEvent(type, entityId) {
    return { type, entityId, timestamp: Date.now() }
}

function collectOrder() {
    return Object.values(state.tasks)
        .filter(it => !it.isDone)
        .map(it => it.id)
}

function persistOrder() {
    saveJson(ORDER, state.order)
}

function moveTask(taskId, indexOffset) {
    let oldIdx = state.order.indexOf(taskId)
    let newIdx = oldIdx + indexOffset
    if (newIdx < 0 || newIdx >= state.order.length) return

    let otherId = state.order[newIdx]
    Vue.set(state.order, oldIdx, otherId)
    Vue.set(state.order, newIdx, taskId)
    persistOrder()
}

export const actions = {
    createTask(title) {
        if (!title) return

        let event = { title, ...newEvent(CREATE_TASK, uuidv4()) }
        pushEvent(event)
        state.order.unshift(event.entityId)
        persistOrder()
    },

    finishTask(taskId) {
        let event = newEvent(FINISH_TASK, taskId)
        pushEvent(event)
        let taskIdx = state.order.indexOf(taskId)
        state.order.splice(taskIdx, 1)
        persistOrder()
    },

    activateTask(taskId) {
        let event = newEvent(ACTIVATE_TASK, taskId)
        pushEvent(event)
        state.order.push(taskId)
        persistOrder()
    },

    moveTaskUp(taskId) {
        moveTask(taskId, -1)
    },

    moveTaskDown(taskId) {
        moveTask(taskId, +1)
    }
}
