<template>
    <nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-main navbar-scroll="true">
        <div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <nav>
                <h6 class="mb-0 font-bold capitalize">TechScrape</h6>
            </nav>

            <div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
                <div class="flex items-center md:ml-auto md:pr-4">
                    <ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">

                        <li class="flex items-center pl-4 xl:hidden">
                            <a @click="toggleSidebar()"
                                class="block p-0 text-sm transition-all ease-nav-brand text-slate-500 mx-4 ">
                                <div class="w-4.5 overflow-hidden">
                                    <i
                                        class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                    <i
                                        class="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                    <i class="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                                </div>
                            </a>
                        </li>


                        <!-- notifications -->

                        <li class="relative flex items-center pr-2">
                            <p class="hidden transform-dropdown-show"></p>
                            <a @click="show_notification = !show_notification"
                                class="cursor-pointer block p-0 text-sm transition-all ease-nav-brand text-slate-500"
                                dropdown-trigger aria-expanded="false">
                                <i class="cursor-pointer fa fa-bell"></i>
                            </a>

                            <ul v-if="show_notification"
                                :class="{ 'opacity-0': !show_notification, 'opacity-100': show_notification }"
                                class="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer transition ease-in-out duration-150">

                                <li class="relative mb-2">
                                    <a class="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                                        href="javascript:;">
                                        <div class="flex py-1">
                                            <div class="my-auto">
                                                <img src="../assets/img/small-logos/icon-sun-cloud.png"
                                                    class="inline-flex items-center justify-center mr-4 text-sm text-white bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl" />
                                            </div>
                                            <div class="flex flex-col justify-center">
                                                <h6 class="mb-1 text-sm font-normal leading-normal"><span
                                                        class="font-semibold">Techscrape wishes you a warm welcome </span></h6>
                                                <p class="mb-0 text-xs leading-tight text-slate-400">
                                                    <i class="mr-1 fa fa-clock"></i>
                                                    now
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>

<script>
import { ref, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const show_notification = ref(false);
        return { show_notification, store };
    },
    computed:{
        
    },
    methods: {
        toggleSidebar() {
            this.$store.commit('TOGGLE_SIDEBAR');
        }
    },
})
</script>