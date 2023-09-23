<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const show_chatSection = ref(false)
        return { show_chatSection }
    }
})
</script>
<template>
    <div>
        <a fixed-plugin-button @click="show_chatSection = !show_chatSection"
            class="bottom-7.5 right-7.5 text-xl z-990 shadow-soft-lg rounded-circle fixed cursor-pointer bg-white px-4 py-2 text-slate-700">
            <i class="py-2 pointer-events-none fa fa-robot">
            </i>
        </a>

        <div
            :class="{ 'z-990 z-sticky shadow-soft-3xl w-90 ease-soft -right-90 fixed top-0 left-auto flex h-full min-w-0 flex-col break-words rounded-none border-0 bg-white bg-clip-border px-2.5 duration-200': !show_chatSection, 'z-sticky shadow-soft-3xl w-90 ease-soft fixed top-0 left-auto flex h-full min-w-0 flex-col break-words rounded-none border-0 bg-white bg-clip-border duration-200 right-0': show_chatSection }">

            <div class="px-1 pt-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                <div class="float-left">
                    <h5 class="mt-4 mb-0">TECHSCRAPE CHATBOT</h5>
                    <p class="text-center">Interact for article AI summary </p>
                </div>
                <div class="float-right mt-6">
                    <button @click="show_chatSection = !show_chatSection"
                        class="inline-block p-0 mb-4 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro ease-soft-in tracking-tight-soft bg-150 bg-x-25 active:opacity-85 text-slate-700">
                        <i class="fa fa-times"></i>
                    </button>
                </div>

            </div>

            <hr class="h-px mx-0 my-1 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

            <div class="relative w-full pt-2 overflow-y-auto h-[40rem]">
                <ul class="space-y-2">
                    <li class="flex justify-end mb-5 mt-5" v-for="i in 2" :key="i">
                        <div
                            class="from-purple-700 to-pink-500 bg-gradient-to-tl relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow flex">
                            <img class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos">
                            <span class="block">For instance like this: if I'm starving to death, and a loaf of bread cost
                                us a quarter, which will buy the loaf of bread.... </span>
                        </div>
                    </li>

                    <li class="flex justify-start mt-5 mb-5" v-for="i in 2" :key="i">
                        <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow flex">
                            <img class="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos">
                            <span class="block">how are you?</span>
                        </div>
                    </li>

                </ul>
            </div>

            <div class="flex items-center justify-between w-full p-3 border-t border-gray-300">


                <input type="text" placeholder="Message"
                    class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                    name="message" required />

                <button type="submit">
                    <svg class="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </div>


        </div>
    </div>
</template>