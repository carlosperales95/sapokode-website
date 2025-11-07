<template>
  <div class="projects">
    <div class="header row">
      <div class="cell slim">
        <h4>0922 VER0.0</h4>
        <p>holaholaholahola</p>
        <h2 class="name-title">CARLOS PERALES</h2>
        <RouterLink class="back-btn" to="/"> &lt; BACK</RouterLink>
      </div>
      <div class="proj-container">
        <h4>PROJECTS</h4>
        <ul>
          <li v-for="project in projects" :key="project.id" @mouseover="changeImageUrl(project.id)">
            {{ project.link_name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="cell justified">
        <pre class="frog">
          {{ frogASCII }}
        </pre>
        <p>
          {{ text }}
        </p>
      </div>
      <div class="cell view-container">
        <img class="project-img" :src="showImageUrl">
      </div>
      <div class="cell rowed justified">
        <div>
          <h2>{{ selectedProject.title.toUpperCase() }}:</h2>
          <p>{{ selectedProject.description }}</p>
        </div>
        <div>
          <h2>STACK:</h2>
          <div class="tech-section">
            <TechTag v-for="tech in selectedProject.technologies" :key="tech" :name="tech"></TechTag>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="cell lens slim">
        <img class="lens-img" src="@/assets/hero/lens-girl.gif">
      </div>
      <div class="proj-container cell">
        <ul>
          <li><a :href="selectedProject.git_url">CODE REPO</a></li>
          <li>PROJ2</li>
          <li>PROJ3</li>
          <li>PROJ4</li>
          <li>PROJ5</li>
          <li>PROJ6</li>
        </ul>
      </div>
      <div class="cell">
        <SpecialNavLink :pages="['home', 'devlogs', 'photography']"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProjectsStore } from '@/stores/projects';
import TechTag from '@/components//TechTag.vue';
import SpecialNavLink from '@/components//SpecialNavLink.vue';

import { RouterLink } from 'vue-router';

const projectsStore = useProjectsStore();
const projects = ref(projectsStore.projects);
const frogASCII = projectsStore.frogASCII;


const text = projectsStore.frogText;

const selectedProject = ref(projects.value[0]);
const showImageUrl = ref(new URL(`../assets/projects/${selectedProject.value.img_url}`, import.meta.url).href);


const changeImageUrl = (id) => {
  selectedProject.value = projects.value.find(proj => proj.id === id);

  showImageUrl.value = new URL(`../assets/projects/${selectedProject.value.img_url}`, import.meta.url).href;
};
</script>
