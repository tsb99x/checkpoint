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
                <button
                    data-cy="move-task-up-btn"
                    @click="shiftPosition(task, -1)"
                >
                    ↑
                </button>
                <button
                    data-cy="move-task-down-btn"
                    @click="shiftPosition(task, +1)"
                >
                    ↓
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
    import Vue from 'vue'

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
            shiftPosition(origTask, indexOffset) {
                let origIndex = this.tasks.indexOf(origTask)
                let newIndex = origIndex + indexOffset
                if (newIndex >= this.activeTasks.length || newIndex < 0) return

                let otherTask = this.tasks[newIndex]
                Vue.set(this.tasks, origIndex, otherTask)
                Vue.set(this.tasks, newIndex, origTask)
                this.saveTasks()
            },
            loadTasks() {
                let json = localStorage.getItem(TASKS_KEY)
                this.tasks = JSON.parse(json) || []
            },
            saveTasks() {
                this.tasks = this.activeTasks.concat(this.doneTasks)
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
