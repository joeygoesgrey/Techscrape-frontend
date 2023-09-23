<template>
    <div class="w-full p-6 mx-auto">

        <div class="-mx-3">
            <div
                class="relative mt-4 flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">

                <div class="flex-auto p-4">
                    <div class="flex flex-wrap -mx-3">
                        <div class="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-6 xl:w-3/12"
                            v-for="sec in security" :key="sec.id">
                            <div
                                class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                                <div class="relative">
                                    <a class="block shadow-xl rounded-2xl">
                                        <img loading="lazy" :src="sec.post_description_image" alt="img-blur-shadow"
                                            class="w-full shadow-soft-2xl h-60 rounded-2xl" />
                                    </a>
                                </div>
                                <div class="flex-auto px-1 pt-3">
                                    <p
                                        class="relative z-10 mb-1 leading-normal text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 text-sm bg-clip-text">
                                        {{ sec.category }}</p>
                                    <a href="">
                                        <h1>{{ sec.title }}</h1>
                                    </a>
                                    <p class="mb-6 leading-normal text-sm">{{ sec.description }}</p>
                                    <div class="flex items-center justify-between">
                                        <router-link :to="`/feed/${sec.slug}`">
                                            <button type="button"
                                                class="inline-block px-4 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">
                                                Read Article
                                            </button>
                                        </router-link>

                                        <div class="mt-2">
                                            <a class="relative z-20 inline-flex items-center justify-center w-6 h-6 text-white transition-all duration-200 border-2 border-white border-solid ease-soft-in-out text-xs rounded-circle hover:z-30"
                                                data-target="tooltip_trigger" data-placement="bottom">
                                                <img class="w-full rounded-circle" alt="Image placeholder"
                                                    src="../../public/download.jpeg" />
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
import { defineComponent, onMounted } from 'vue';
import { getPostsByCategory } from '../utils'; // Import your utility function
import { mapState, useStore } from 'vuex'; // Import useStore

export default defineComponent({
    computed: {
        ...mapState(['security']),
    },
    setup() {
        const store = useStore(); // Get access to the store

        // Use onMounted to perform actions after the component is mounted
        onMounted(async () => {
            const response = await getPostsByCategory("security");
            store.commit('SET_SECURITY', response.results.items);
            console.log(store.state.security); // Access state directly from the store
        });
    },
});
</script>

