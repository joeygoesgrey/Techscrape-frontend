<template>
    <div class="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
        <div
            class="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
            <div class="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                <h6>Activities overview</h6>
                <p class="text-sm leading-normal">
                    <i class="fa fa-arrow-up text-lime-500"></i>
                    <span class="font-semibold mx-2">24%</span> this month
                </p>
            </div>
            <div class="flex-auto p-4">
                <div
                    class="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px">
                    <div class="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
                        <span
                            class="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                            <i
                                class="relative z-10 leading-none text-transparent fa fa-bell leading-pro bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent"></i>
                        </span>
                        <div class="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                            <h6 class="mb-0 text-sm font-semibold leading-normal text-slate-700">$2400, Design
                                changes</h6>
                            <p class="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">22 DEC 7:20 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({

})
</script>