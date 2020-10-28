<template>
    <form @submit.prevent="createTask()">
        <input
            data-cy="task-input"
            type="text"
            v-model.trim.lazy="newTaskText"
        />
        <button data-cy="create-task-btn">+</button>
    </form>
</template>

<script>
    import { actions } from './state'

    export default {
        name: 'TaskInput',
        data() {
            return {
                newTaskText: ''
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

<style scoped>
    form {
        display: flex;
        justify-content: stretch;
        align-items: center;
        margin: 1rem 0;
    }

    input {
        flex-grow: 1;
    }
</style>
