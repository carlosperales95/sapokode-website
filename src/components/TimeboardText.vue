<template>
    <ul id="locations" @mouseover="initTimeBoard()">
        <li :data-original="location.toUpperCase()">
            <span v-for="item in spreadWord" :key="item">
                {{ item.toUpperCase() }}
            </span>
        </li>
    </ul>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['location']);

const location = ref(props.location);
const showTimeBoard = ref(false);
const spreadWord = computed(() => {
    return location.value.trim('');
});

function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function convertToSpans(text) {
    return [...text].map(char => `<span>${char}</span>`).join("");
}

function animateLocations() {
    const locs = document.querySelectorAll("#locations li");

    locs.forEach(loc => {
        loc.innerHTML = convertToSpans('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            .slice(0, loc.getAttribute("data-original").length));
    });

    let indices = [...Array(locs.length).keys()];
    indices.sort(() => Math.random() - 0.5);

    indices.forEach((locationIndex, index) => {
        const loc = locs[locationIndex];
        setTimeout(() => {
            const originalText = loc.getAttribute("data-original");
            loc.innerHTML = convertToSpans(originalText);

            const spans = loc.querySelectorAll('span');
            let timer = setInterval(() => {
                spans.forEach(span => {
                    span.textContent = randomString(1);
                });
            }, 100);

            setTimeout(() => {
                clearInterval(timer);
                let counter = spans.length - 1;
                const buildText = setInterval(() => {
                    if (counter >= 0) {
                        spans[counter].textContent = originalText[counter];
                        counter--;
                    } else {
                        clearInterval(buildText);
                    }
                }, 100);
            }, 1500);
        }, 500 * index);
    });
}

const initTimeBoard = function() {
    showTimeBoard.value = true;
    animateLocations();
}
</script>