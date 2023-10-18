<template>
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <LoadingCompVue />
    </div>
    <div v-else>
        <div class="max-w-full">
            <div class="px-5 md:px-4 bg-white rounded-2xl ">
                <div class="flex justify-between pt-3">
                    <strong>
                        {{ post?.category }}
                    </strong>
                    <strong>
                        {{ formatDateTime(post?.datetime) }}
                    </strong>
                </div>
                <!-- {{ post.body }} -->
                <div v-html="post?.body"></div>

                <div class="flex justify-between">
                    <h1 class="mt-2 text-base font-bold inline">
                        Article by {{ post?.author }}
                    </h1>
                    <a class="relative z-20 mt-2 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                        data-target="tooltip_trigger" data-placement="bottom">
                        <img class="w-full rounded-circle" alt="Image placeholder" src="/download.jpeg" />
                    </a>
                </div>

                <CommentSection v-if="token" :postId="post?.id" />
                <div v-else class="text-center text-xl pb-4">
                    <b>
                        In order to comment on an article you have to <a href="/sign-in" class="underline">
                            be registered
                        </a>
                    </b>
                </div>
            </div>
        </div>
        <Chat />
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import Chat from '../components/Chat.vue';
import moment from 'moment';
import CommentSection from '../components/CommentSection.vue';
import { getPostBySlug } from '../utils';
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router'; // Import useRoute to access route parameters
import LoadingCompVue from '../components/LoadingComp.vue';

export default defineComponent({
    components: {
        Chat, CommentSection, LoadingCompVue,
    },
    computed: {
        ...mapState(['post']),
        ...mapState(['token']),
        ...mapState(['loading']),
    },
    methods: {
        formatDateTime(dateTimeStr) {
            return moment(dateTimeStr).fromNow();
        },
    },
    setup() {
        const store = useStore();
        const route = useRoute(); // Access route information using useRoute

        onMounted(async () => {
            store.commit('SET_LOADING');
            const response = await getPostBySlug(route.params.slug); // Use route.value.params.slug to access the slug
            store.commit('SET_POST', response);
            store.commit('SET_LOADING');
        });
    },

});

</script>

<style scoped>
.img-fluid {
    max-width: 100%;
    height: auto;
}
</style>