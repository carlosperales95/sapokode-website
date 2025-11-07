<template>
    <AboutMeLayout :textContent="aboutTextContent"></AboutMeLayout>
    <div class="resume-container">
        <button @click="changeSection('skills')">
            Stats
        </button>
        <button @click="changeSection('experience')">
            Experience
        </button>
    </div>
    <RippleCircles></RippleCircles>
    <div class="sections" :class="{'alternative': rolledSection}">
        <div class="slider-section anothaone">
            <PipBoy></PipBoy>
            <div class="skills-container">
                <ul>
                    <div class="stat-bar-wrapper">
                        <div
                        class="stat-btn-wrapper"
                        :class="{'selected-tab': mode == stck.title}"
                        :key="index"
                        v-for="(stck, index) in techStack"
                        >
                            <svg class="stack-icon" @click="changeStack(stck.title)">
                                <use :xlink:href="`#${stck.code}`"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="stat-tech-title">
                        {{ techStack[mode]["title"].toUpperCase() }}
                    </div>
                    <div class="tech-icons-wrapper">
                        <svg
                        :key="index"
                        v-for="(tech, index) in techStack[mode].techs"
                        class="tech-icon"
                        >
                            <use :xlink:href="`#${tech}`"></use>
                        </svg>
                    </div>
                </ul>
            </div>
        </div>
        <div class="slider-section">
            <TimelineSection></TimelineSection>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import TimelineSection from '@/components/sections/TimelineSection.vue';
import RippleCircles from '@/components//RippleCircles.vue';
import PipBoy from '@/components//PipBoy.vue';
import AboutMeLayout from './AboutMeLayout.vue';

const props = defineProps(['techStack', 'aboutTextContext']);

const section = ref('skills');

const changeSection = (sec) => {
    if(section.value === sec) return;

    section.value = sec;
};

const mode = ref('frontend');

const rolledSection = computed(() => {
    return section.value === 'skills' ? false : true;
});

const changeStack = function(newMode) {
    mode.value = newMode;
};
</script>

<style scoped>

</style>