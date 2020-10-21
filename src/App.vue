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
                {{ task.title }}
                <button data-cy="finish-task-btn" @click="finishTask(task.id)">
                    ✓
                </button>
                <button data-cy="move-task-up-btn" @click="moveTaskUp(task.id)">
                    ↑
                </button>
                <button
                    data-cy="move-task-down-btn"
                    @click="moveTaskDown(task.id)"
                >
                    ↓
                </button>
            </div>
        </div>
        ---
        <div data-cy="done-tasks">
            <div v-for="task in doneTasks" :key="task.id">
                <strike>{{ task.title }}</strike>
                <button
                    data-cy="activate-task-btn"
                    @click="activateTask(task.id)"
                >
                    ↯
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { actions, getters } from './state'

    export default {
        name: 'App',
        data() {
            return {
                newTaskText: ''
            }
        },
        computed: {
            ...getters
        },
        methods: {
            ...actions,
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
