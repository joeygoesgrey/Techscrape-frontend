<script>
import { computed, ref, watch } from 'vue';
import { useStore, mapState } from 'vuex';
import { getRepliesByCommentId, API_BASE_URL } from '../utils';
import moment from 'moment';
import DeleteForm from './DeleteForm.vue';
import ReplyForm from './ReplyForm.vue';

export default {
    name: "RepliesComponent",
    components: {
        DeleteForm,
        ReplyForm
    },
    props: {
        comment_id: {
            type: Number,
            required: true
        },
        comment_content: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const store = useStore();
        const replies = ref([]);

        // Use the global showRepliesFor state from Vuex store
        const showRepliesFor = computed(() => store.state.showRepliesFor);

        // Function to fetch replies
        const FetchReplies = async (comment_id) => {
            try {
                const response = await getRepliesByCommentId(comment_id);
                if (response) {
                    replies.value = response.replies || [];
                }
            } catch (error) {
                console.error(error);
            }
        };

        watch(() => store.state.commentsChangeTracker, () => {
            FetchReplies(props.comment_id);
        }, { immediate: true });

        // Function to format the date-time
        const formatDateTime = (dateTimeStr) => {
            return moment(dateTimeStr).fromNow();
        };

        // Function to toggle the visibility of replies
        const toggleShowReplies = (replyId) => {
            store.commit('TOGGLE_SHOW_REPLIES', replyId);
            console.log(showRepliesFor)
        };

        return {
            API_BASE_URL,
            replies,
            showRepliesFor,  // Use the computed property
            formatDateTime,
            getReplies: FetchReplies,
            toggleShowReplies  // Use this function in the template
        };
    },

    computed: {
        ...mapState(['post']),
    }
}
</script>
<template>
    <div v-for="(reply, replyIndex) in replies" :key="reply.id">
        <!-- <div v-if=""> -->
        <article class="p-6 mb-3 mt-2 sm:ml-4 md:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
            <small class="my-5">
                Replying to : {{ reply.parent_comment_content }}
            </small>
            <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                    <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img class="mr-2 w-6 h-6 rounded-full" :src="`${API_BASE_URL}/${reply.user.picture}`">{{
                            reply.user.email }}
                    </p>
                    <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate :datetime="reply.created_date">{{
                        formatDateTime(reply.created_date) }}</time></p>
                </div>
                <DeleteForm :comment_id="reply.id" :key="reply.id" />
            </footer>
            <p class="text-gray-500 dark:text-gray-400">{{ reply.content }} </p>
            <div class="flex flex-row items-center sm:w-full md:w-6/12">
                <i @click="toggleShowReplies(reply.id)" class="cursor-pointer fa fa-eyes mt-3 w-3/12"
                    v-if="reply.replies_count > 0">{{
                        reply?.replies_count }}</i>
                <ReplyForm :parent_id="reply.id" :key="reply.id" />
            </div>
        </article>
    </div>
</template>
