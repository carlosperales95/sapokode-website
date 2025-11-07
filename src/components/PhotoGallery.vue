<template>
    
    <div class="gallery-container">
        <ul>
            <li :key="photo" v-for="photo in photos">
                <router-link
                    :to="courseEditUrl"
                    :course="course"
                >
                    <img :src="photo">
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


const photos = ref([
    'https://i.imghippo.com/files/wKQjU1718648863.jpg',
    'https://i.imghippo.com/files/eGBHq1718647560.jpg',
    'https://i.imghippo.com/files/GCwEO1718649113.jpg',
    'https://i.imghippo.com/files/41AlS1718649106.jpg',
    'https://i.imghippo.com/files/HC6Ag1718649039.jpg',
    'https://i.imghippo.com/files/ph59Z1718649023.jpg',
    'https://i.imghippo.com/files/GyUsM1718648877.jpg',
    'https://i.imghippo.com/files/5VeOB1718648803.jpg',
    'https://i.imghippo.com/files/UKvpO1718648672.jpg',
    'https://i.imghippo.com/files/yEaRD1718648650.jpg',
    'https://i.imghippo.com/files/wIWZs1718648615.jpg',
    'https://i.imghippo.com/files/qc8cl1718648593.jpg',
    'https://i.imghippo.com/files/CMpU81718648316.jpg',
    'https://i.imghippo.com/files/6obLw1718648196.jpg',
    'https://i.imghippo.com/files/HN0UJ1718648136.jpg',
    'https://i.imghippo.com/files/gE36g1718647794.jpg'
]);
</script>