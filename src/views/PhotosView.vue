<template>
    <div class="photos-container">
        <div class="photos-sidebar">
            <SpecialNavLink :pages="['home', 'devlogs', 'projects']"/>
            <h1> ALBUMS </h1>
            <ul>
                <li v-for="album in albums" :key="album.name">
                    <span></span>
                    <RouterLink
                        :to="`/photography/${album.name}`"
                        :album="album"
                    >
                        <p>{{album.name}}</p>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <AlbumSection :strips="strips" :albums="albums"></AlbumSection>
    </div>
</template>

<script setup>
// import PhotoGallery from '@/components//PhotoGallery.vue';
import AlbumSection from '@/components//AlbumSection.vue';
import { useAlbumsStore } from '@/stores/albums';
import { storeToRefs } from 'pinia';

import { RouterLink } from 'vue-router';
import SpecialNavLink from '@/components//SpecialNavLink.vue';


const albumsStore = useAlbumsStore();

const {
    albums,
    isLoading,
    strips
} = storeToRefs(albumsStore);

albumsStore.getUrlAlbums();
strips.value = albumsStore.divideIntoStrips();

console.log(albums.value);
console.log(strips.value);
</script>