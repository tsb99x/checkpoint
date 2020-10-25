<template>
    <div>
        {{ title }}
        <button data-cy="finish-task-btn" @click="finishTask()">
            ✓
        </button>
        <button data-cy="move-task-up-btn" @click="moveTaskUp()">
            ↑
        </button>
        <button data-cy="move-task-down-btn" @click="moveTaskDown()">
            ↓
        </button>
    </div>
</template>

<script>
    import { actions } from './state'

    export default {
        name: 'ActiveTask',
        props: {
            id: String,
            title: String
        },
        methods: {
            finishTask() {
                actions.finishTask(this.id)
            },

            moveTaskUp() {
                actions.moveTaskUp(this.id)
            },

            moveTaskDown() {
                actions.moveTaskDown(this.id)
            }
        }
    }
</script>
