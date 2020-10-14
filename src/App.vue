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

    function loadJson(key) {
        let json = localStorage.getItem(key)
        return JSON.parse(json)
    }

    function saveJson(key, obj) {
        let json = JSON.stringify(obj)
        localStorage.setItem(key, json)
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
            this.tasks = loadJson(TASKS_KEY) || []
        },
        methods: {
            createTask() {
                this.tasks.push(this.newTaskText)
                saveJson(TASKS_KEY, this.tasks)
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
