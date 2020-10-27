<template>
    <div>
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
