<template>
    <div>
        <form v-if="isEditMode" @submit.prevent="saveTitle()">
            <input
                data-cy="title-input"
                type="text"
                v-model.trim.lazy="newTitle"
            />
            <button data-cy="save-title-btn">💾</button>
        </form>
        <span v-if="!isEditMode">{{ title }}</span>
        <button
            v-if="!isEditMode"
            data-cy="edit-task-title-btn"
            @click="editTask()"
        >
            ✎
        </button>
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
        data() {
            return {
                newTitleInput: '',
                isEditMode: false
            }
        },
        props: {
            id: String,
            title: String
        },
        methods: {
            editTask() {
                this.newTitle = this.title
                this.isEditMode = true
            },

            saveTitle() {
                actions.editTaskTitle(this.id, this.newTitle)
                this.isEditMode = false
            },

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

<style scoped>
    form {
        display: inline;
    }
</style>
