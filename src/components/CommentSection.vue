<template>
    <section class="bg-white dark:bg-gray-900 antialiased mt-3">
        <div>

            <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Leave a comment</h2>
            </div>
            <form class="flex-row mb-3">
                <div
                    class="py-2 md:w-9/12 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <textarea id="comment" rows="4"
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..." required></textarea>
                </div>
                <button type="submit"
                    class="inline-flex  bg-gradient-to-tl from-purple-700 to-pink-500 items-center py-2.5 text-xs px-3 font-medium text-center rounded-lg focus:ring-1 focus:to-pink-500  dark:focus:ring-primary-900 hover:from-purple-700">
                    Comment
                </button>
            </form>
            <!-- PARENT SECTION -->
            <article class="px-6 text-base bg-white rounded-lg dark:bg-gray-900 pb-6" v-for="(comment, index) in comments"
                :key="index">
                <footer class="flex justify-between items-center mb-2">
                    <div class="flex items-center">
                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
                                class="mr-2 w-6 h-6 rounded-full"
                                src="https://techcrunch.com/wp-content/uploads/2019/12/GettyImages-717166755.jpg?w=430&h=230&crop=1"
                                :alt="comment.user.email">{{ comment.user.email }}</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate :datetime="comment.created_date"
                                :title="formatDateTime(comment.created_date)">{{ formatDateTime(comment.created_date) }}</time></p>
                    </div>
                    <button @click="showDeleteOptions[index] = !showDeleteOptions[index]" :class="{
                        'inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600': !showDeleteOptions[index],
                        'hidden': showDeleteOptions[index]
                    }" type=" button">
                        <i class="fa fa-trash "> </i>
                    </button>
                    <div v-if="showDeleteOptions[index]"
                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button">
                        <i class="fa fa-times cursor-pointer text-red-500" @click="showDeleteOptions[index] = !showDeleteOptions[index]">
                        </i>
                        <i class="fa fa-check  cursor-pointer mx-4 text-green-500"
                            @click="showDeleteOptions[index] = !showDeleteOptions[index]"> </i>
                    </div>
                </footer>
                <p class="text-gray-500 dark:text-gray-400">{{ comment.content }}</p>
                <div class="flex items-center mt-4 space-x-4">
                    <button type="button"
                        class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                        @click="showReplyInputs[index] = !showReplyInputs[index]">
                        <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 20 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        </svg>
                        Reply
                    </button>
                    <div class="flex-row flex" v-if="showReplyInputs[index]">
                        <!-- Conditionally render for this comment -->
                        <textarea rows="1"
                            class="px-0 w-9/12 text-sm text-gray-900 border-3 focus:ring-1 px-2 py-2 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a reply..." required></textarea>
                        <i class="fa fa-reply mx-4 py-4 cursor-pointer"></i>
                    </div>
                </div>

                <!-- CHILD SECTION -->
                <article class="p-6 mb-3 mt-2 sm:ml-4 md:ml-12 text-base bg-white rounded-lg dark:bg-gray-900"
                    v-for="(reply, replyIndex) in comment.replies" :key="replyIndex">
                    <em class="my-5">
                        Replying to {{ comment.content }}
                    </em>
                    <footer class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img class="mr-2 w-6 h-6 rounded-full" :src="reply.user.picture"
                                    alt="Michael Gough">{{ reply.user.email }}
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate :datetime="reply.created_date"
                                    title="February 8th, 2022">{{ formatDateTime(reply.created_date) }}</time></p>
                        </div>
                        <button @click="showDeleteOptions[comment.id + replyIndex] = !showDeleteOptions[comment.id + replyIndex]" :class="{
                            'inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600': !showDeleteOptions[comment.id + replyIndex],
                            'hidden': showDeleteOptions[comment.id + replyIndex]
                        }" type=" button">
                            <i class="fa fa-trash "> </i>
                        </button>
                        <div v-if="showDeleteOptions[comment.id + replyIndex]"
                            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                            <i class="fa fa-times cursor-pointer text-red-500" @click="showDeleteOptions[comment.id + replyIndex] = !showDeleteOptions[comment.id + replyIndex]">
                            </i>
                            <i class="fa fa-check  cursor-pointer mx-4 text-green-500"
                                @click="showDeleteOptions[comment.id + replyIndex] = !showDeleteOptions[comment.id + replyIndex]"> </i>
                        </div>
                    </footer>
                    <p class="text-gray-500 dark:text-gray-400">{{ reply.content }} ☺️</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <button type="button"
                            class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                            @click="showReplyInputs[comment.id + replyIndex] = !showReplyInputs[comment.id + replyIndex]">
                            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                            </svg>
                            Reply
                        </button>
                        <div class="flex-row flex" v-if="showReplyInputs[comment.id + replyIndex]">
                            <!-- Conditionally render for this comment -->
                            <textarea rows="1"
                                class="px-0 w-9/12 text-sm text-gray-900 border-3 focus:ring-1 px-2 py-2 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a reply..." required></textarea>
                            <i class="fa fa-reply mx-4 py-4 cursor-pointer"></i>
                        </div>
                    </div>
                </article>
            </article>
        </div>
    </section>
</template>
<script>
import { defineComponent, ref } from 'vue';
import moment from 'moment';

export default defineComponent({
    data() {
        const comments = [
            {
                "id": 100,
                "created_date": "2023-09-15T12:30:00",
                "scraped_news_id": 123,
                "user": {
                    "id": 1,
                    "picture": "https://techcrunch.com/wp-content/uploads/2019/12/GettyImages-717166755.jpg?w=430&h=230&crop=1",
                    "email": "user1@example.com"
                },
                "parent_id": null,
                "content": "This is the first comment.",
                "replies": [
                    {
                        "id": 3,
                        "created_date": "2023-09-15T14:00:00",
                        "scraped_news_id": 123,
                        "user": {
                            "id": 1,
                            "picture": "https://techcrunch.com/wp-content/uploads/2019/12/GettyImages-717166755.jpg?w=430&h=230&crop=1",
                            "email": "user1@example.com"
                        },
                        "parent_id": 1,
                        "content": "Thanks for your response!"
                    },
                    {
                        "id": 4,
                        "created_date": "2023-09-15T14:30:00",
                        "scraped_news_id": 123,
                        "user": {
                            "id": 2,
                            "picture": "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
                            "email": "user2@example.com"
                        },
                        "parent_id": 1,
                        "content": "You're welcome!"
                    }
                ]
            },
 
        ]
        return {
            comments,
            showDeleteOptions: Array(comments.length).fill(false),
            showReplyInputs: Array(comments.length).fill(false)
        }
    },
    methods: {
        formatDateTime(dateTimeStr) {
            return moment(dateTimeStr).fromNow();
        }
    }
})
</script>
