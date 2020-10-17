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
            <div v-for="task in activeTasks" :key="task.id">
                {{ task.text }}
                <button data-cy="finish-task-btn" @click="finishTask(task)">
                    ✓
                </button>
            </div>
        </div>
        ---
        <div data-cy="done-tasks">
            <div v-for="task in doneTasks" :key="task.id">
                <strike>{{ task.text }}</strike>
                <button data-cy="activate-task-btn" @click="activateTask(task)">
                    ↯
                </button>
            </div>
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
        computed: {
            activeTasks: function() {
                return this.tasks.filter(task => !task.isDone)
            },
            doneTasks: function() {
                return this.tasks.filter(task => task.isDone)
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
            finishTask(task) {
                task.isDone = true
                this.saveTasks()
            },
            activateTask(task) {
                task.isDone = false
                this.saveTasks()
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
