<template>
    <footer class="pt-4">
        <div class="w-full px-6 mx-auto">
            <div class="flex flex-wrap items-center -mx-3 lg:justify-between">
                <div class="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                    <div class="text-sm leading-normal text-center text-slate-500 lg:text-left">
                        ©
                        {{ date }}

                        <a href="https://www.linkedin.com/in/joseph-edomobi-2b8a7620a" class="font-semibold text-slate-700"
                            target="_blank">Joseph
                            Edomobi</a>

                    </div>
                </div>
                <div class="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                    <ul class="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">

                        <li class="nav-item">
                            <a :href="`${API_BASE_URL}/redoc`"
                                class="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                                target="_blank">API</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { defineComponent } from 'vue';
import API_BASE_URL from '../utils';
export default defineComponent({
    data() {
        return {
            API_BASE_URL: API_BASE_URL,  // set it as a property of the returned object
        };
    },
    setup() {
        const date = new Date().getFullYear()
        return { date }
    },
})
</script>