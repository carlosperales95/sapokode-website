<template>
    <div class="about boutsec" ref="aboutsec">
        <div class="employee-card">
            <h1>HELLO my name is</h1>
            <div class="employee-info">
            <div class="basic-info">
                <h2>{{ fullName }}</h2>
                <p class="job-title">{{ jobTitle }}</p>
                <p class="description-line">Height: 180cm</p>
                <p class="description-line">Age: 28years</p>
                <p class="description-line">Nationality: Spanish</p>
                <p class="description-line">Other: Likes plants</p>
            </div>
            <div class="employee-img">
                <img src='../../assets/sapokode-img.png'>
            </div>
            </div>
            <p class="about-description">{{ aboutMe }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, useTemplateRef } from 'vue';


const props = defineProps(['fullName', 'jobTitle', 'aboutMe']);
const scrollAmount = ref(0);
const elemTop = ref(0);
const elem = useTemplateRef('aboutsec');


onMounted(() => {
    elemTop.value = elem.value.top;
    document.addEventListener('wheel', (event) => {
        const DIVIDE_AMOUNT = 2;
        scrollAmount.value = event.deltaY / DIVIDE_AMOUNT;
        
        if(!elem.value.style.top) elem.value.style.top = elemTop.value;
            
        const newTop = parseInt(elem.value.style.top.replace("px", "")) - scrollAmount.value;

        if(newTop <= 500 && newTop >= -500) {
            elem.value.style.top = newTop + "px";
            elemTop.value = elem.value.style.top
        }
    });
});
</script>

<style scoped>
.section {
    /* margin-bottom: 20px; */
    border-radius: 8px;
    margin: 0 8% 0 auto;
    position: relative;
    bottom: -500vh;
}

.employee-card {
    background-color: #fff3f3;
    color: #1a1a1a;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    text-align: center;
    transform: rotate3d(1, 5, 1, 20deg);
    border-radius: 22px;
    box-shadow:  31px 31px 69px black;
}

.employee-card h1 {
    background-color: #800020;
    color: #fff3f3;
    font-size: 45px;
    border-radius: inherit;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 1%;
    margin-bottom: 0;
}

.employee-card:hover {
    transform: scale(1.05);
}

.basic-info {
    text-align: center;
    padding: 2%;
    border: 1px dashed #800020;
    border-radius: 10px;
}

.employee-info {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding: 2%;
}

.employee-img {
    padding: 5%;
}

.employee-img img {
    height: 100%;
    width: 100%;
    border: 1px solid #fff3f3;
    text-align: center;
}

.basic-info h2 {
    margin: 0;
    padding: 0;
    width: 100%;
    color: #E67E22;
    border-bottom: 1px dashed #800020;
}

.job-title {
    margin-top: 5px;
    font-weight: bold;
    border-bottom: 1px dashed #cac8c8;
}

.description-line {
    font-weight: bold;
    border-bottom: 1px dashed #cac8c8;
    text-align: left;
    font-size: 15px;
}

.about-description {
    margin-top: 0;
    background-color: #800020;
    color: #fff3f3;
    font-size: 10px;
    border-radius: inherit;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 1%;
}

</style>