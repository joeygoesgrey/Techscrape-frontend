// src/routes.js
import { createRouter, createWebHistory } from 'vue-router';
import SearchView from './Views/Dashboard.vue';
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
  { path: '/', component: SearchView },
  { path: '/feeds', component: FeedsVue },
  { path: '/feeds/AI', component: AiVue },
  { path: '/feeds/security', component: SecurityVue },
  { path: '/feeds/startups', component: StartupsVue },
  { path: '/feeds/crypto', component: CryptoVue },
  { path: '/profile', component: ProfileVue },
  { path: '/sign-in', component: SignInVue },
  { path: '/sign-up', component: SignUpVue },
  { path: '/feed/:slug', component: FeedDetailsVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
