<template>
    <div id="app">
        <task-input />
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
    import { getters } from './state'
    import TaskInput from './TaskInput'
    import ActiveTask from './ActiveTask'
    import DoneTask from './DoneTask'

    export default {
        name: 'App',
        components: {
            TaskInput,
            ActiveTask,
            DoneTask
        },
        computed: {
            activeTasks() {
                return getters.activeTasks()
            },

            doneTasks() {
                return getters.doneTasks()
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
        margin: 0 auto;
        margin-top: 60px;
        max-width: 24rem;
    }
</style>
