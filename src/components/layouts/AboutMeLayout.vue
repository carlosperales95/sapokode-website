<template>
    <div class="about-me-container">
        <BiColumn>
            <template v-slot:left>
                <div class="text-wrapper">
                    <p v-for="(line, index) in textContent" :key="index">
                        {{ line }}
                    </p>
                </div>
            </template>
            <template v-slot:right>
                <div class="technologie">
                    <SkillsList></SkillsList>
                </div>
            </template>
        </BiColumn>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import SkillsList from '@/components//SkillsList.vue';
import BiColumn from './BiColumn.vue';

const props = defineProps(['location']);

const textContent = computed(() => props.textContent?.split(". ") || "");
</script>