import { createStore } from 'vuex';
import { API_BASE_URL } from './utils';

export default createStore({
    state: {
        toggleSidebar: false,
        startups: null,
        security: null,
        AI: null,
        crypto: null,
        post: null,
    },
    mutations: {
        TOGGLE_SIDEBAR(state) {
            state.toggleSidebar = !state.toggleSidebar;
        },
        SET_STARTUPS(state, args) {
            state.startups = args;
        },
        SET_SECURITY(state, args) {
            state.security = args;
        },
        SET_AI(state, args) {
            state.AI = args;
        },
        SET_CRYPTO(state, args) {
            state.crypto = args
        },
        SET_POST(state, args) {
            state.post = args
        },
    },
    actions: {

    },
    getters: {
        // your getter methods here
    }
});
