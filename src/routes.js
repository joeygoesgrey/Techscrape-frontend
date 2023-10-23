// src/routes.js
import { createRouter, createWebHistory } from 'vue-router';
import getTokenAndRedirectIfMissing from "./utils.js";
 import SearchView from './Views/Search.vue';
import FeedsVue from './Views/Feeds.vue';
import ProfileVue from './Views/Profile.vue';
import SignInVue from './Views/SignIn.vue';
import SignUpVue from './Views/SignUp.vue';
import FeedDetailsVue from "./Views/FeedDetails.vue";
import AiVue from "./Views/AI.vue"
import SecurityVue from "./Views/Security.vue"
import StartupsVue from "./Views/Startups.vue"
import CryptoVue from "./Views/Crypto.vue"

const routes = [
  { path: '/', component: SearchView, meta: { requiresAuth: true } },
  { path: '/feeds', component: FeedsVue, meta: { requiresAuth: true } },
  { path: '/feeds/AI', component: AiVue, meta: { requiresAuth: true } },
  { path: '/feeds/security', component: SecurityVue, meta: { requiresAuth: true } },
  { path: '/feeds/startups', component: StartupsVue, meta: { requiresAuth: true } },
  { path: '/feeds/crypto', component: CryptoVue, meta: { requiresAuth: true } },
  { path: '/profile', component: ProfileVue, meta: { requiresAuth: true } },
  { path: '/sign-in', component: SignInVue },
  { path: '/sign-up', component: SignUpVue }, 
  { path: '/feed/:slug', component: FeedDetailsVue, meta: { requiresAuth: true } },
];


const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

// Add a global navigation guard to check authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && getTokenAndRedirectIfMissing()) {
    // If the route requires authentication and the user is not authenticated
    next('/sign-in'); // Redirect to the sign-in page
  } else {
    next(); // Continue with the navigation
  }
});


export default router;
