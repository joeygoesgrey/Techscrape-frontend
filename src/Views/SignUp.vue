<template>
    <section class="flex items-center justify-center min-h-screen">

        <div class="container">
            <div class="w-full max-w-full px-3 mx-auto mt-0 text-center text-black mb-4">
                <h1 class="mt-12 mb-2">Welcome!</h1>
                <p> TechScrape - Tech News at your Fingertips - </p>
            </div>

            <div class="">
                <div class="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                    <div
                        class="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                        <div v-if="errorMessage" class="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                            <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    {{ errorMessage }}
                                </div>
                            </div>
                        </div>

                        <div class="flex-auto p-6">
                            <form role="form text-left" @submit.prevent="validateForm">
                                <div class="mb-4">
                                    <input type="email"
                                        class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                        placeholder="Email" aria-label="Name" aria-describedby="email-addon" required
                                        v-model="email" />
                                </div>
                                <div class="mb-4">
                                    <input type="password" required v-model="password"
                                        class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                        placeholder="Password" autocomplete="off" />
                                </div>
                                <div class="mb-4">
                                    <input type="password" required v-model="confirmPassword"
                                        class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                        placeholder="Confirm Password" aria-label="Password"
                                        aria-describedby="password-addon" autocomplete="off" />
                                </div>

                                <div class="text-center">
                                    <button type="submit"
                                        class="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white">Sign
                                        up</button>
                                </div>
                                <p class="mt-4 mb-0 leading-normal text-sm">Already have an account? <a href="/sign-in"
                                        class="font-bold text-slate-700">Sign in</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue';
import { API_BASE_URL } from '../utils';
import axios from "axios";

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: "",
        };
    },
    methods: {
        async validateForm() {
            // Clear any previous error messages
            alert("i am being called ")
            this.errorMessage = "";

            if (!this.email || !this.password || !this.confirmPassword) {
                this.errorMessage = 'Please fill in all fields.';
                return;
            }

            if (this.password !== this.confirmPassword) {
                this.errorMessage = 'Passwords do not match.';
                return;
            }

            if (!this.isValidEmail(this.email)) {
                this.errorMessage = 'Invalid email address.';
                return;
            }

            try {
                const response = await axios.post(`${API_BASE_URL}/user/signup/demo`, {
                    email: this.email,
                    password: this.password,
                });
                if (response.status === 201) {
                    this.$router.push('/sign-in');
                }

            } catch (error) {
                if (error.response.status === 422) {
                    // Handle the case where the email already exists
                    this.errorMessage = 'Email already exists. Please use a different email.';
                    // Clear password and confirm password fields
                    this.password = '';
                    this.confirmPassword = '';
                } else {
                    // Handle other API request errors
                    console.error('API request error:', error);
                    this.errorMessage = 'An error occurred while signing up. Please try again later.';
                }
            }
        },


        isValidEmail(email) {
            // You can implement your own email validation logic here.
            // This is a basic example. You might want to use a library for more robust validation.
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(email);
        },
        // ...
    }

})
</script>
