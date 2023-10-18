import { createStore } from 'vuex';
import { token, getCommentsByPostId} from './utils';

export default createStore({
    state: {
        toggleSidebar: false,
        startups: null,
        security: null,
        AI: null,
        crypto: null,
        post: null,
        searchPost: null,
        token: token,
        loading: false,
        UserInfo: null,
        commentsData: null,
        repliesData: {},
        activeCommentId: null,
        showRepliesFor: {},
        commentsChangeTracker: 0,
    },
    mutations: {
        UPDATE_COMMENTS_TRACKER(state) {
            state.commentsChangeTracker += 1;
        },
        TOGGLE_SHOW_REPLIES(state, replyId) {
            state.showRepliesFor[replyId] = !state.showRepliesFor[replyId];
        },
        SET_COMMENTSDATA(state, args) {
            state.commentsData = args
        },
        SET_USERINFO(state, args) {
            state.UserInfo = args
        },
        SET_LOADING(state) {
            state.loading = !state.loading
        },
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
        SET_STORE(state, args) {
            state.searchPost = args
        },
    },

    actions: {
        handlerefreshCommentsDataChange({ commit, state }) {
            const fetchComments = async (postId) => {
                if (postId) {
                    const response = await getCommentsByPostId(postId);
                    commit('SET_COMMENTSDATA', response);
                } else {
                    console.error("Post ID is not available");
                }
            };
            fetchComments(state.post.id)
        },
    },

});
