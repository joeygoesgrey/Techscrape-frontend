<template>
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <LoadingComp />
    </div>
    <div v-else-if="recommendedArticles.length < 1" class="px-6 pt-6">
        No Recommended Articles yet We are still studying your Activity
    </div>
    <div class="w-full p-6 mx-auto" v-else>
        <strong class="text-2xl ">
            Recommended Articles Based on Your Activity
        </strong>
        <div class="-mx-3">
            <div
                class="relative mt-4 flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">

                <div class="flex-auto p-4">
                    <div class="flex flex-wrap -mx-3">
                        <div class=" w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-6 xl:w-3/12"
                            v-for="result in recommendedArticles" :key="result.id">
                            <div
                                class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                <div class="relative">
                                    <a class="block shadow-xl rounded-2xl">
                                        <img loading="lazy" :src="result.post_description_image"
                                            alt="Image for {{ result.title }}"
                                            class="w-full shadow-soft-2xl h-60 rounded-2xl" />
                                    </a>
                                </div>
                                <div class="flex-auto px-1 pt-3">
                                    <p
                                        class="relative z-10 mb-1 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">
                                        {{ result.category }} </p>
                                    <a href="">
                                        <h1>{{ result.title }}</h1>
                                    </a>
                                    <p class="mb-6 leading-normal text-sm">{{ result.description }}</p>
                                    <div class="flex items-center justify-between">
                                        <router-link :to="`/feed/${result.slug}`">
                                            <button type="button"
                                                class="inline-block px-4 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">
                                                Read Article
                                            </button>
                                        </router-link>

                                        <div class="mt-2">
                                            <a class="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                                                data-target="tooltip_trigger" data-placement="bottom">
                                                <img class="w-full rounded-circle" alt="Image placeholder"
                                                    src="/download.jpeg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { API_BASE_URL } from '../utils';
import { mapState, useStore } from 'vuex'; // Import useStore
import LoadingComp from '../components/LoadingComp.vue';
export default defineComponent({
    computed: {
        ...mapState(['loading'])
    },
    components: {
        LoadingComp
    },
    setup() {
        const store = useStore(); // Get access to the store
        // Use ref to define recommendedArticles as a reactive property
        const recommendedArticles = ref([]);

        const fetchRecommendedArticles = () => {
            // Set loading state to true at the start of the API request
            store.commit('SET_LOADING', true);

            // Replace with the actual URL of your FastAPI endpoint
            const apiUrl = `${API_BASE_URL}/tech/recommendations`;

            // Make a GET request to the endpoint
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    // Update the recommendedArticles value with the fetched data
                    recommendedArticles.value = data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Set loading state back to false once the API call is complete
                    store.commit('SET_LOADING', false);
                });
        };


        // Call fetchRecommendedArticles when the component is mounted
        onMounted(() => {
            fetchRecommendedArticles();
        });

        // Return the recommendedArticles ref
        return {
            recommendedArticles,
        };
    },
});
</script>
