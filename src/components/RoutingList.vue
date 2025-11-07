<template>
    <ul>
        <li
        v-for="(page, index) in pages"
        :key="index"
        >
            <router-link
            class="filled-background"
            :to="page == 'home' ? '/' : `/${page}`"
            >
                {{ page.toUpperCase() }}
            </router-link>
        </li>
    </ul>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

const props = defineProps(['pages']);
</script>