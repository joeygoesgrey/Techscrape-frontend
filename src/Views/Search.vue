<script>
import { API_BASE_URL } from '../utils';
import axios from 'axios';

export default {
    name: "SearchView",
    data() {
        return {
            searchTerm: '', // Store the user's input
            searchResults: [], // Store API search results
            API_BASE_URL,
            searchPost: null,
        };
    },

    methods: {
        async makeAPICall() {
            // Check if the search term has 5 or more characters
            if (this.searchTerm.length >= 5) {
                try {
                    // Make the API request
                    const response = await axios.get(`${this.API_BASE_URL}/tech/search-suggestions`, {
                        params: {
                            search: this.searchTerm,
                        },
                    });

                    // Handle API response here, you can set it to searchResults
                    this.searchResults = response.data;
                } catch (error) {
                    // Handle errors
                    console.error('Error making API request:', error);
                    // You can also set an error message to inform the user
                }
            }
        },
        async makeAPICallforresults(result) {
            try {
                // Make the API request
                const response = await axios.get(`${this.API_BASE_URL}/tech/search`, {
                    params: {
                        search: result,
                    },
                });

                // Handle API response here, you can set it to searchResults
                this.searchPost = response?.data;
            } catch (error) {
                // Handle errors
                console.error('Error making API request:', error);
                // You can also set an error message to inform the user
            }
        },

    },
}

</script>
<template>
    <div class="w-full px-6 py-6 mx-auto">
        <div class="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
            <span
                class="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <i class="fas fa-search"></i>
            </span>
            <input type="text"
                class="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                placeholder="Search here..." v-model="searchTerm" @keyup="makeAPICall" />

        </div>

        <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            v-if="searchResults.length > 0">
            <ul>
                <li v-for="(result, index) in searchResults" :key="index">
                    <a @click="makeAPICallforresults(result)" class="inline text-blue-500 cursor-pointer">
                        <i class="fa fa-search py-2"></i>
                        <p class="font-normal inline mx-2">{{ result }}</p>
                    </a>
                </li>
            </ul>
        </div>

        <div class="w-full p-6 mx-auto" v-if="searchPost">

            <div class="-mx-3">
                <div
                    class="relative mt-4 flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">

                    <div class="flex-auto p-4">
                        <div class="flex flex-wrap justify-center -mx-3">
                            <div class=" w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-6 xl:w-3/12"
                                v-for="result in searchPost.results.items" :key="result.id">
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

    </div>
</template>