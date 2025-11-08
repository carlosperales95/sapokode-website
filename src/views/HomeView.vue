<template>
  <div>
      <NavBar />
      <HeroSection @trigger-show="triggerAboutMe"></HeroSection>
    <!-- <div v-if="!hideContent">
      <TitleSeparator
        :hasCenteredElem="true"
        :header="'sapokode'"
      >
        <template v-slot:center>
          <EmployeeCard
          :fullName="fullName"
          :jobTitle="jobTitle"
          :aboutMe="aboutMe"
          />
        </template>
      </TitleSeparator>
      <div class="centered-content">
        <ResumeLayout
          :techStack="techStack"
          :aboutTextContent="aboutTextContent"
        />
      </div>
      <TitleSeparator
        :hasCenteredElem="true"
        :header="'based-in'"
      >
        <template v-slot:center>
          <TimeboardText :location="'amsterdam'"></TimeboardText>
        </template>
      </TitleSeparator>
      <LocationMap />
      <TitleSeparator
        :hasCenteredElem="false"
        :header="'contact'"
      />
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import ResumeLayout from '@/components/layouts/ResumeLayout.vue';
import NavBar from '@/components/layouts/NavBar.vue';
import EmployeeCard from '@/components//EmployeeCard.vue';

import TitleSeparator from '@/components/layouts/SplitTitleSeparator.vue';
import LocationMap from '@/components//LocationMap.vue';
import TimeboardText from '@/components//TimeboardText.vue';

import { useHomeStore } from '@/stores/home';
import { storeToRefs } from 'pinia';


const hideContent = ref(true);
const homeStore = useHomeStore();

const {
  fullName,
  jobTitle,
  aboutMe,
  email,
  linkedin,
  aboutTextContent,
  techStack
} = storeToRefs(homeStore);
    

const triggerAboutMe = function() {
  hideContent.value = false;
  setTimeout(function() {
    window.scrollTo({
      top: document.querySelector(".separator-container").getBoundingClientRect().top + window.scrollY - 250,
      behavior: "smooth"});
    
    // document.querySelector(".about-container")
    //   .scrollIntoView({
    //       behavior: 'smooth'
    //     });
  }, 2000);
}
</script>
