<script>
import { defineComponent } from 'vue';
import { mapState, useStore } from 'vuex';
import { ReplytoComment, getRepliesByCommentId } from '../utils';

export default defineComponent({
    data() {
        return {
            content: "",
            showReplyForm: false,
            store: useStore()
        }
    },
    computed: {
        ...mapState(['post', 'showRepliesFor']),
    },

    props: {
        parent_id: Number
    },
    methods: {
        toggleshowReplyForm() {
            this.showReplyForm = !this.showReplyForm;
        },
        async submitReply() {
            const payload = {
                content: this.content,
                scraped_news_id: this.post?.id,
                parent_id: this.parent_id,
            };

            try {
                const statusCode = await ReplytoComment(payload);
                if (statusCode === 201) {
                    this.$store.dispatch('handlerefreshCommentsDataChange');
                    this.toggleshowReplyForm();
                    this.content = "";
                    this.$store.commit('UPDATE_COMMENTS_TRACKER');
                    // If the parent_id exists in the showRepliesFor state, toggle its value
                    if (this.showRepliesFor[this.parent_id] !== undefined) {
                        // this.$store.commit('TOGGLE_SHOW_REPLIES', this.parent_id);
                    }
                }
            } catch (error) {
                console.error("Failed to submit comment:", error);
            }
        },

    },
})
</script>

<template>
    <div class="flex items-center mt-4 space-x-4">
        <button type="button" @click="toggleshowReplyForm"
            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 20 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
            </svg>
            Reply
        </button>
        <form class="flex-row flex" v-if="showReplyForm" @submit.prevent="submitReply">
            <textarea rows="1"
                class="px-0 w-9/12 text-sm text-gray-900 border-3 focus:ring-1 px-2 py-2 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a reply..." required v-model="content"></textarea>
            <button type="submit" class="fa fa-reply mx-4 py-4 cursor-pointer"></button>
        </form>
    </div>
</template>
