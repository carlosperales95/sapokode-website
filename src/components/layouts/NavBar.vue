<template>
    <IconsRepo/>
    <div
        id="navbar"
        class="w-full flex flex-row karma overflow-hidden transition-all duration-500 ease-in"
        :class="barStyles"
    >
        <div
            id="logo"
            class="w-full"
            :class="logoStyles"
        >
            <div class="starburs">
                <span> Hello! </span>
            </div>
            <h2 class="font-karma text-2xl"> SapoKode </h2>
            <p>
                - Software Engineer
            </p>
        </div>
        <SocialsBar class="w-[1/2]" :class="barStyle === 'full' ? 'fill-teal-100' : ''"/>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SocialsBar from '..//SocialsBar.vue';
import IconsRepo from '../icons/IconsRepo.vue';

const emit = defineEmits(['trigger-bar']);
const barStyle = ref("full");

const barStyles = computed(() => {
    if(barStyle.value === 'full')
        return 'fixed top-20 max-h-40 px-20 bg-black text-white';
    if(barStyle.value === 'bar')
        return 'max-h-24';
});

const logoStyles = computed(() => {
    if(barStyle.value === 'bar')
        return 'max-h-40';
    if(barStyle.value === 'full')
        return 'max-h-24';
})

window.addEventListener("scroll", () =>
    (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
        ? barStyle.value = "bar"
        : barStyle.value = "full"
);
</script>
