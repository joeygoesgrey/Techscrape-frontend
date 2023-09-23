<template>
  <div>
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </component>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from './Layout/DefaultLayout.vue';
import "../src/assets/css/perfect-scrollbar.css"
import "../src/assets/css/tooltips.css"
import "../src/assets/css/soft-ui-dashboard-tailwind.css"
import "../src/assets/css/soft-ui-dashboard-tailwind.min.css"
import "../src/assets/js/plugins/perfect-scrollbar.min.js"
import "../src/assets/js/soft-ui-dashboard-tailwind.js"

export default {
  setup() {
    const route = useRoute();
    const layout = computed(() => {
      return route.meta.layout || DefaultLayout;
    });

    return { layout };
  },
};
</script>

