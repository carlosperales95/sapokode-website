<template>
    <ul>
        <li
        v-for="(page, index) in pages"
        :key="index"
        >
            <RouterLink
            class="filled-bg"
            :to="page == 'home' ? '/' : `/${page}`"
            >
                {{ page.toUpperCase() }}
            </RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

const props = defineProps(['pages']);
</script>