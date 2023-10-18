<template>
    <section>
        <div class="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
            <div class="container z-10">
                <div class="flex flex-wrap mt-0 -mx-3">
                    <div
                        class="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                        <div
                            class="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                            <div class="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                                <h3
                                    class="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                                    Welcome back</h3>
                                <p class="mb-0">Enter your credentials to sign in</p>
                                <small>
                                    Email: "testuser@mail.com"
                                    <i class="fas fa-clipboard cursor-pointer"
                                        @click="copyToClipboard(' testuser@mail.com')"></i>
                                </small>
                                <br>
                                <small>
                                    Password: "testuser@mail.com"
                                    <i class="fas fa-clipboard cursor-pointer"
                                        @click="copyToClipboard(' testuser@mail.com')"></i>
                                </small>
                            </div>
                            <div class="flex-auto p-4">
                                <div v-if="errorMessage"
                                    class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert">
                                    <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span class="sr-only">Info</span>
                                    <div>
                                        <span class="font-medium">{{ errorMessage }} </span>
                                    </div>
                                </div>
                                <form role="form" @submit.prevent="validateForm">
                                    <label class="mb-2 ml-1 font-bold text-xs text-slate-700">Email</label>
                                    <div class="mb-4">
                                        <input type="email" v-model="email"
                                            class="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                            placeholder="Email" aria-label="Email" aria-describedby="email-addon" />
                                    </div>
                                    <label class="mb-2 ml-1 font-bold text-xs text-slate-700">Password</label>
                                    <div class="mb-4">
                                        <input type="password" v-model="password"
                                            class="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                                            placeholder="Password" aria-label="Password"
                                            aria-describedby="password-addon" />
                                    </div>

                                    <div class="text-center">
                                        <button type="submit"
                                            class="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85">
                                            {{ loading ? 'Verifying...' : 'Sign in' }}</button>
                                    </div>
                                </form>
                            </div>
                            <div
                                class="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                                <p class="mx-auto mb-6 leading-normal text-sm">
                                    Don't have an account?
                                    <a href="/sign-up"
                                        class="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">Sign
                                        up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                        <div
                            class="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                            <div class="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                                style="background-image: url('../assets/img/curved-images/curved6.jpg')"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue';
import { API_BASE_URL, axios, encrypt, storeDataInSession } from '../utils';
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router'; // Import useRoute to access route parameters

export default defineComponent({
    data() {
        return {
            email: '',
            password: '',
            errorMessage: "",
        };
    },
    computed: {
        ...mapState(["loading"])
    },

    setup() {
        const store = useStore();
        const route = useRoute(); // Access route information using useRoute
        return { store, route }; // Return store so it can be accessed in methods

    },
    methods: {
        async validateForm() {
            // Clear any previous error messages
            this.errorMessage = "";

            if (!this.email || !this.password) {
                this.errorMessage = 'Please fill in all fields.';
                return;
            }

            if (!this.isValidEmail(this.email)) {
                this.errorMessage = 'Invalid email address.';
                return;
            }

            try {
                const response = await axios.post(`${API_BASE_URL}/user/login`, {
                    username: this.email,
                    password: this.password,
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

                this.store.commit('SET_LOADING');
                console.log(response.data)
                storeDataInSession("access_token", encrypt(response.data.access_token))
                storeDataInSession("refresh_token", encrypt(response.data.refresh_token))
                // console.log(re_access_token, re_refresh_token)
                this.$router.push('/');

            } catch (error) {
                if (error.response) { // Check if response is available
                    if (error.response.status === 422 || error.response.status === 403) {
                        // Handle the case where the email already exists
                        this.errorMessage = 'Invalid Credentials';
                        // Clear password and confirm password fields
                        this.password = '';
                        this.confirmPassword = '';
                        this.store.commit('SET_LOADING');
                    } else {
                        // Handle other API request errors
                        console.error('API request error:', error);
                        this.errorMessage = 'An error occurred while signing up. Please try again later.';
                    }
                } else {
                    // Handle cases where the request never made it to the server
                    console.error('Full Error:', error);
                    this.errorMessage = 'An error occurred while trying to reach the server. Please try again later.';
                }
            }
        },
        copyToClipboard(value) {
            const el = document.createElement('textarea');  // Create a <textarea> element
            el.value = value;  // Set its value to what we want to copy
            document.body.appendChild(el);  // Append it to the body
            el.select();  // Select the content
            document.execCommand('copy');  // Copy the selected content
            document.body.removeChild(el);  // Remove the <textarea> element
            alert('Copied to clipboard!');  // Optionally, let the user know the copy was successful
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
