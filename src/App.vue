<template>
    <div id="app">
        <form @submit.prevent="createTask()">
            <input
                data-cy="task-input"
                type="text"
                v-model.trim.lazy="newTaskText"
            />
            <button data-cy="create-task-btn">+</button>
        </form>
        <div data-cy="active-tasks">
            <active-task
                v-for="task in activeTasks"
                :key="task.id"
                :id="task.id"
                :title="task.title"
            />
        </div>
        ---
        <div data-cy="done-tasks">
            <done-task
                v-for="task in doneTasks"
                :key="task.id"
                :id="task.id"
                :title="task.title"
            />
        </div>
    </div>
</template>

<script>
    import { actions, getters } from './state'
    import ActiveTask from './ActiveTask'
    import DoneTask from './DoneTask'

    export default {
        name: 'App',
        components: {
            ActiveTask,
            DoneTask
        },
        data() {
            return {
                newTaskText: ''
            }
        },
        computed: {
            activeTasks() {
                return getters.activeTasks()
            },

            doneTasks() {
                return getters.doneTasks()
            }
        },
        methods: {
            createTask() {
                actions.createTask(this.newTaskText)
                this.newTaskText = ''
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
