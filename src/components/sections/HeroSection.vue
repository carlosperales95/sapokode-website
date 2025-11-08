<template>
    <div class="flex p-1 overflow-hidden bg-[linear-gradient(0deg,rgba(26,26,26,0.5)_0%,rgba(0,0,0,1)_2%)]">
        <div class="nav-container">
            <div class="mx-[20%] mt-8 mb-0 text-left overflow-hidden font-karma">
                <BiColumn class="hero-size h-50 mt-2" :modifier="true">
                    <template v-slot:left>
                        <RoutingList :pages="['projects', 'devlogs', 'photography']"></RoutingList>
                    </template>
                    <template v-slot:right>
                        <!-- <div class="fall-back"> -->
                        <div id="scene-container">
                            <!-- Three.js canvas will be inserted here -->
                        </div>
                            <!-- <div class="art-credits">
                                <img src="../../assets/hero/isoroom.gif"/>
                                <h2>VOXELART BY:</h2>
                                <a class="shoutout" href="https://www.behance.net/sircarma">SIRCARMA</a>
                            </div> -->
                        <!-- </div> -->
                    </template>
                </BiColumn>
                <div class="action-container">
                    <a class="action-link filled-background" @click="emit('trigger-show')">
                        Learn more about me
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { World } from "../../loader/World.js";
import BiColumn from '@/components/layouts/BiColumn.vue';
import RoutingList from '..//RoutingList.vue';


const emit = defineEmits(['trigger-show']);

onMounted(() => {
    const container = document.querySelector("#scene-container");
    // Create an instance of the World app
    const world = new World(container);
    // Start the loop (produce a stream of frames)
    world.start();
});
</script>