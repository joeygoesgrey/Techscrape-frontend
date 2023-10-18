<template>
    <div class="w-full px-6 mx-auto mb-9">
        <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl"
            style="background-image: url('../assets/img/curved-images/curved6.jpg'); background-position-y: 50%">
            <span
                class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
        </div>
         <div
            class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
            <div class="flex flex-wrap -mx-3">
                <div class="flex-none w-auto max-w-full px-3">
                    <div
                        class="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                        <img :src="`${API_BASE_URL}/${UserInfo?.picture}`" alt="profile_image"
                            class="w-full shadow-soft-sm rounded-xl" />

                    </div>
                </div>
                <div class="flex-none w-auto max-w-full px-3 my-auto">
                    <div class="h-full">
                        <h5 class="mb-1 font-semibold leading-normal">{{ UserInfo?.email }}</h5>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 xl:w-5/12">
            <div
                class="relative flex flex-col  min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                    <h6 class="mb-0">Platform Settings</h6>
                </div>
                <div class="flex-auto p-4">
                    <h6 class="font-bold leading-tight uppercase text-xs text-slate-500">Account</h6>
                    <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                        <li class="relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit">
                            <div class="min-h-6 mb-0.5 block pl-0">
                                <input id="mention"
                                    class="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
                                    type="checkbox" checked />
                                <label for="mention"
                                    class="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Notify 
                                    me when someone mentions me in a comment </label>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </div>


        <div class="w-full max-w-full px-3 lg-max:mt-6 xl:w-5/12">
            <div
                class="relative flex flex-col  min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                    <h6 class="mb-0">Notifications</h6>
                </div>
                <div class="flex-auto p-4">
                    <ul class="flex flex-col pl-0 mb-0 rounded-lg">
                        <li class="relative flex items-center px-0 py-2 mb-2 bg-white border-0 rounded-t-lg text-inherit">
                            <div
                                class="inline-flex items-center justify-center w-12 h-12 mr-4 text-white transition-all duration-200 text-base ease-soft-in-out rounded-xl">
                                <img src="../assets/img/curved-images/curved6.jpg"
                                    alt="kal" class="w-full shadow-soft-2xl rounded-xl" />
                            </div>
                            <div class="flex flex-col items-start justify-center">
                                <h6 class="mb-0 leading-normal text-sm">Techscrape</h6>
                                <p class="mb-0 leading-tight text-xs">Thank you for being a part of Techscrape</p>
                            </div>

                        </li>
                    </ul>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { getUserInfo, API_BASE_URL } from '../utils';
import { mapState, useStore } from 'vuex'

export default defineComponent({
    data() {
        return { API_BASE_URL }
    },
    computed: {
        ...mapState(['UserInfo']),
    },
    setup() {
        const store = useStore();

        onMounted(async () => {
            try {
                const userInfo = await getUserInfo();
                store.commit('SET_USERINFO', userInfo);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        });
    },
})
</script>