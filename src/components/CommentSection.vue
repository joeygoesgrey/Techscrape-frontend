<template>
    <section class="bg-white dark:bg-gray-900 antialiased mt-3">

        <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Leave a comment</h2>
        </div>
        <form class="flex-row mb-3" @submit.prevent="submitComment">
            <div
                class="py-2 md:w-9/12 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <textarea id="comment" rows="4" v-model="user_comment"
                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
            </div>
            <button type="submit"
                class="cursor-pointer inline-flex  bg-gradient-to-tl from-purple-700 to-pink-500 items-center py-3 text-xs px-4 font-medium text-center rounded-lg focus:ring-1 focus:to-pink-500  dark:focus:ring-primary-900 hover:from-purple-700">
                <small class="cursor-pointer"> Comment</small>
            </button>
        </form>
        <strong class="py-9">
            {{ commentsData ? commentsData.total_comments : 0 }} {{ commentsData && commentsData.total_comments === 1 ?
                'Comment' : 'Comments' }}
        </strong>
        <div v-if="commentsData && commentsData.comments.length > 0">
            <!-- PARENT SECTION -->
            <article class="px-6 text-base bg-white rounded-lg dark:bg-gray-900 pb-6"
                v-for="(comment, index) in commentsData.comments" :key="index">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                class="mr-2 w-6 h-6 rounded-full" :src="`${API_BASE_URL}/${comment.user.picture}`"
                                :alt="comment.user.email">{{
                                    comment.user.email }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate :datetime="comment.created_date"
                                :title="formatDateTime(comment.created_date)">{{ formatDateTime(comment.created_date)
                                }}</time></p>
                    </div>
                    <DeleteForm :comment_id="comment.id" />

                </footer>
                <p class="text-gray-500 dark:text-gray-400 pl-6">{{ comment.content }}</p>
                <div class="flex flex-row items-center sm:w-full md:w-6/12">
                    <i @click="toggleshowReplies(comment.id)" class="cursor-pointer fa fa-eye mt-3 w-3/12"
                        v-if="comment.replies_count > 0"> </i>
                    <ReplyForm :parent_id="comment.id" />
                </div>
                <RepliesComponent v-if="showRepliesFor[comment.id]" :comment_id="comment.id"
                    :comment_content="comment.content" :key="comment.id" />
            </article>
        </div>
        <div class="flex flex-center pb-12" v-else>
            No comments yet... Be the first to comment
        </div>
    </section>
</template>


<script>
import { defineComponent, reactive, watch } from 'vue';
import moment from 'moment';
import { getCommentsByPostId, MakeComments, API_BASE_URL, getRepliesByCommentId } from '../utils';
import ReplyForm from './ReplyForm.vue';
import DeleteForm from './DeleteForm.vue';
import { mapState, useStore } from 'vuex';
import RepliesComponent from './RepliesComp.vue';


export default defineComponent({
    components: {
        ReplyForm, DeleteForm,
        RepliesComponent
    },
    props: {
        postId: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapState(['commentsData']),
    },
    setup(props) {
        const store = useStore();
        const showRepliesFor = reactive({});

        // Function to fetch comments
        const fetchComments = async (postId) => {
            if (postId) {
                const response = await getCommentsByPostId(postId);
                store.commit('SET_COMMENTSDATA', response);
            } else {
                console.error("Post ID is not available");
            }
        };
        function toggleshowReplies(commentId) {
            if (showRepliesFor[commentId] === undefined) {
                showRepliesFor[commentId] = true;
            } else {
                showRepliesFor[commentId] = !showRepliesFor[commentId];
            }
        }

        watch(() => props.postId, (newPostId, oldPostId) => {
            fetchComments(newPostId);
        }, { immediate: true });

        return {
            showRepliesFor,
            toggleshowReplies
        }
    },

    data() {
        return {
            user_comment: "",
            showReplyForm: false,
            API_BASE_URL,
        };
    },

    methods: {
        formatDateTime(dateTimeStr) {
            return moment(dateTimeStr).fromNow();
        },
        async submitComment() {
            const payload = {
                content: this.user_comment,
                scraped_news_id: this.postId,
                parent_id: null,
            };

            try {
                const statusCode = await MakeComments(payload);
                if (statusCode === 201) {
                    this.user_comment = "";
                    this.$store.dispatch('handlerefreshCommentsDataChange');
                }
            } catch (error) {
                console.error("Failed to submit comment:", error);
            }
        },
    }
})
</script>
