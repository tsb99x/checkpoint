<template>
    <div id="app">
        <form @submit.prevent="createTask()">
            <input type="text" v-model.trim.lazy="newTaskText" />
            <button>+</button>
        </form>
        <div v-for="task in tasks" :key="task.id">
            {{ task }}
        </div>
    </div>
</template>

<script>
    const TASKS_KEY = 'tasks'

    function task(text) {
        return {
            text,
            isDone: false
        }
    }

    export default {
        name: 'App',
        data() {
            return {
                newTaskText: '',
                tasks: []
            }
        },
        mounted() {
            this.loadTasks()
        },
        methods: {
            createTask() {
                if (!this.newTaskText) return

                let newTask = task(this.newTaskText)
                this.tasks.push(newTask)
                this.saveTasks()
                this.newTaskText = ''
            },
            loadTasks() {
                let json = localStorage.getItem(TASKS_KEY)
                this.tasks = JSON.parse(json) || []
            },
            saveTasks() {
                let json = JSON.stringify(this.tasks)
                localStorage.setItem(TASKS_KEY, json)
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
