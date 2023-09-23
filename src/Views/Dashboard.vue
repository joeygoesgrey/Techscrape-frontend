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
                placeholder="Type here..." v-model="searchTerm" @keyup="makeAPICall" />

        </div>

        <div class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            v-if="searchResults.length > 0">
            <ul>
                <li v-for="(result, index) in searchResults" :key="index">
                    <a href="" class="inline text-blue-500">
                        <i class="fa fa-search py-2"></i>
                        <p class="font-normal inline mx-2">{{ result }}</p>
                    </a>
                </li>
            </ul>
        </div>


    </div>
</template>