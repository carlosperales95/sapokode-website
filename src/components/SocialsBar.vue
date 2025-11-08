<template>
    <div class="flex w-full">
        <ul>
            <li v-for="social in socials" :key="social.id">
                <a class="social-link" :href="social.url">
                    <svg
                    :class="'icon'"
                    >
                        <use :xlink:href="`#${social.name}`"></use>
                    </svg>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const socials = ref([
    {
        id: 1,
        name: "instagram",
        url: 'https://www.instagram.com/cape.raw/',
    },
    {
        id: 2,
        name: "linkedin",
        url: 'https://www.linkedin.com/in/carlos-perales95',
    },
    {
        id: 3,
        name: "github",
        url: 'https://github.com/carlosperales95',
    },
    {
        id: 4,
        name: "twitch",
        url: 'https://www.twitch.tv/sapokode',
    }
]);
</script>

<style scoped>


</style>