<template>
    <div class="gallery">
        <div
        class="gallery__strip__wrapper"
        v-for="strip in strips"
        :key="strip.id"
        >
            <div class="gallery__strip" :class="`${strip.id}`">
                <div
                class="photo"
                v-for="album in strip.elems"
                :key="album.name"
                >
                    <AlbumItem :album="album"></AlbumItem>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import AlbumItem from './AlbumItem.vue';

const props = defineProps(['albums', 'strips']);
</script>