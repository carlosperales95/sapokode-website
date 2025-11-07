<template>
    <div class="header-wrapper">
        <RouterLink class="back-btn" to="/photography"> &lt; BACK</RouterLink>
        <h1 class="album-name-title">
            {{album.name}}
        </h1>
    </div>
    <div class="viewer-container">
        <AdvancedImage v-if="selectedPhoto" :cldImg="selectedPhoto.elem"/>
    </div>
    <div class="results-container">
        <ul class="results photolist">
            <li class="result photoelem" v-for="photo in selectedAlbum.photos" :key="photo.id">
                <a href="#">
                    <AdvancedImage :cldImg="photo.elem" @click="selectPhoto(photo.id)"/>
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useAlbumsStore } from '@/stores/albums';
import { AdvancedImage } from '@cloudinary/vue';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    id: String
});

const albumsStore = useAlbumsStore();
const selectedPhoto = ref(null);

const {
    albums,
    selectedAlbum,
    isLoading,
    strips
} = storeToRefs(albumsStore);

const album = albumsStore.getAlbum(props.id);

const selectPhoto = function(id) {
    console.log(selectedAlbum.value.photos.filter(photo => photo.id == id)[0]);
    selectedPhoto.value = selectedAlbum.value.photos.filter(photo => photo.id == id)[0];
}

onMounted(() => {
    albumsStore.getSelectedAlbum();
})
</script>