<template>
    <ul class="flex gap-5 justify-end p-3">
        <li
            v-for="social in socials"
            :key="social.id"
            class="h-fit w-fit"
        >
            <a class="" :href="social.url">
                <svg class="h-20 w-24">
                    <use :xlink:href="`#${social.name}`"></use>
                </svg>
            </a>
        </li>
    </ul>
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