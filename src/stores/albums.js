import { Cloudinary } from '@cloudinary/url-gen';
import { defineStore } from 'pinia';
import { albumsIndex } from './albumsIndex';
import { ref } from 'vue';

export const useAlbumsStore = defineStore('albums', () => {

    const albums = ref([]);
    const strips = ref([]);
    const selectedAlbum = ref([]);
    const isLoading = ref(false);
    const cloudName = ref('ddxatjdzs');

    const getUrlAlbums = () => {
        const cld = new Cloudinary({
            cloud: {
                cloudName: cloudName.value
            }
        });

        // // Instantiate a CloudinaryImage object for the image with the public ID, 'front_face'.
        albumsIndex.forEach(album => {
            album.thumbnail.elem = cld.image(album.thumbnail.id);
        });
        
        albums.value = albumsIndex;
    };

    const divideIntoStrips = () => {
        const strips = [
            {
                id: "one",
                elems: []
            },
            {
                id: "two",
                elems: []
            },
            {
                id: "three",
                elems: []
            },
            {
                id: "four",
                elems: []
            }
        ];

        console.log("strips", strips);

        let count = 0;
        let currentStrip = 0;
        const divided = Math.floor(albums.value.length / 4);
        console.log("album_len", albums.value.length / 4);
        console.log("div_len", divided);
        
        albums.value.forEach((currentVal, index) => {
            if(count >= divided && currentStrip < 4) {
                currentStrip++;
                count = 0;
            }
            strips[currentStrip].elems.push(currentVal);
            count++;
        });
        
        return strips;
    };

    const getAlbum = (id) => {
        selectedAlbum.value = albums.value.filter(album => album.name == id)[0];
        return albums.value.filter(album => album.name == id)[0];
    };

    const getSelectedAlbum = () => {
        const cld = new Cloudinary({
            cloud: {
                cloudName: cloudName.value
            }
        });
        
        console.log(selectedAlbum.value.photos);
        selectedAlbum.value.photos.forEach(photo => {
            photo.elem = cld.image(photo.id);
        });
    }

        return {
            albums,
            strips,
            selectedAlbum,
            isLoading,
            cloudName,
            getUrlAlbums,
            divideIntoStrips,
            getAlbum,
            getSelectedAlbum
        }
});
