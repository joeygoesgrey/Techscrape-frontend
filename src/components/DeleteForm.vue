<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { delCommentsById } from '../utils';

export default defineComponent({
    data() {
        return {
            showDeleteOptions: false
        }
    },
    computed: {
        ...mapState(['post', 'showRepliesFor']),
    },
    props: {
        comment_id: Number
    },
    methods: {
        toggleDeleteOptions() {
            this.showDeleteOptions = !this.showDeleteOptions;
        },
        async deleteComment() {
            try {
                const response = await delCommentsById(this.comment_id);
                this.toggleDeleteOptions();
                this.$store.dispatch('handlerefreshCommentsDataChange');
                this.$store.commit('UPDATE_COMMENTS_TRACKER');
            } catch (error) {
                console.error("Failed to delete comment:", error);
            }
        },

    },

})
</script>

<template>
    <button
        class='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        type=" button" @click="toggleDeleteOptions" v-if="!showDeleteOptions">
        <i class="fa fa-trash "> </i>
    </button>
    <div v-else
        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button">
        <i class="fa fa-times cursor-pointer text-red-500" @click="toggleDeleteOptions"></i>
        <i class="fa fa-check  cursor-pointer mx-4 text-green-500" @click="deleteComment"></i>
    </div>
</template>
