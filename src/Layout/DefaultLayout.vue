<!-- src/layouts/MainLayout.vue -->
<template>
    <div>
        <DefaultLayoutSidebarVue />
        <main class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
            <DefaultLayoutNavbar />
            <slot></slot>
            <Footer />
        </main>

    </div>
</template>
<script>
import DefaultLayoutSidebarVue from '../LayoutComponents/DefaultLayoutSidebar.vue';
import DefaultLayoutNavbar from '../LayoutComponents/DefaultLayoutNavbar.vue';
import Footer from '../components/Footer.vue';
export default {
    name: "DefaultLayout",
    components: {
        Footer, DefaultLayoutNavbar, DefaultLayoutSidebarVue,
    }

}

</script>