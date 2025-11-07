<template>
    <RouterLink
        :to="albumUrl"
        :album="album"
    >
        <div class="photo__image">
            <AdvancedImage :cldImg="album.thumbnail.elem" />
        </div>
        <div class="photo__name">
            {{ album.name }}
        </div>
    </RouterLink>
</template>

<script setup>
import { computed } from 'vue';
import { AdvancedImage } from '@cloudinary/vue';
import { RouterLink } from 'vue-router';
    
const props = defineProps(["album"]);

const albumUrl = computed(() => {
    return `/photography/${props.album.name}`;
});
</script>