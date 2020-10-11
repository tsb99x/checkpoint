<template>
    <div id="app">
        <input
            type="text"
            v-model.trim.lazy="newTaskText"
            @keyup.enter="createTask"
        />
        <button @click="createTask">+</button>
        <div v-for="task in tasks" :key="task.id">
            {{ task }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                newTaskText: '',
                tasks: []
            }
        },
        methods: {
            createTask() {
                this.tasks.push(this.newTaskText)
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
