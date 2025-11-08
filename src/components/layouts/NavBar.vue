<template>
    <IconsRepo/>
    <div
        id="navbar"
        class="flex flex-row-reverse karma overflow-hidden transition-all duration-500 ease-in"
        :class="barStyle === 'full' ? 'full' : 'bar'"
    >
        <SocialsBar :class="barStyle === 'full' ? '' : 'negative-colored'"/>
        <div
            id="logo"
            class="wrapper"
            :class="barStyle === 'full' ? 'nav-title' : 'nav-logo'"
        >
            <div class="starburst">
                <span> Hello! </span>
            </div>
            <h2> SapoKode </h2>
            <p>
                - Software Engineer
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SocialsBar from '..//SocialsBar.vue';
import IconsRepo from '../icons/IconsRepo.vue';

const emit = defineEmits(['trigger-bar']);
const barStyle = ref("full");

window.addEventListener("scroll", () =>
    (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
        ? barStyle.value = "bar"
        : barStyle.value = "full"
);
</script>
