<template>
    <div id="root">
        <strike>{{ title }}</strike>
        <button data-cy="activate-task-btn" @click="activateTask()">
            ↯
        </button>
    </div>
</template>

<script>
    import { actions } from './state'

    export default {
        name: 'DoneTask',
        props: {
            id: String,
            title: String
        },
        methods: {
            activateTask() {
                actions.activateTask(this.id)
            }
        }
    }
</script>

<style scoped>
    #root {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.33rem 1rem;
        margin: 0.25rem 0;
        background-color: grey;
    }
</style>
