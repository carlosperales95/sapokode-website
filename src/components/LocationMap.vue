<template>
    <div class="map-container">
        <div id="map"></div>
        <div class="location-container">
            <div class="location-prompt">
                So far I've been based in these cities.<br> Where to next?
            </div>
            <span class="prompt-separator">|</span>
            <ul class="location-wrapper">
                <li
                v-for="loc in locations"
                :key="loc.label"
                class="location-item"
                :class="{'loc-selected': loc.label == selectedLocation}"
                @click="onLocationChange(loc.label)"
                >
                {{ loc.label.toUpperCase() }}
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import RippleCircles from '@/components//RippleCircles.vue';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const map = ref(null);
const selectedLocation = ref("amsterdam");
const locations = ref({
    amsterdam: {
        label: "amsterdam",
        coords: [52.372, 4.899]
    },
    bilbao: {
        label: "bilbao",
        coords: [43.262, -2.935]
    },
    uppsala: {
        label: "uppsala",
        coords: [59.858, 17.632]
    },
    bologna: {
        label: "bologna",
        coords: [44.498, 11.327]
    }
});

onMounted(() => {
    map.value = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    ).addTo(map.value);

    setMap();

  // disable interactions
  map.value.dragging.disable();
  map.value.touchZoom.disable();
  map.value.doubleClickZoom.disable();
  map.value.scrollWheelZoom.disable();
  map.value.boxZoom.disable();
  map.value.keyboard.disable();
  if (map.value.tap) map.value.tap.disable();
});

const setMap = function() {
    map.value.setView(locations.value[selectedLocation.value].coords, 14);
}

const onLocationChange = function(locName) {
    selectedLocation.value = locName;
    setMap();
};
</script>