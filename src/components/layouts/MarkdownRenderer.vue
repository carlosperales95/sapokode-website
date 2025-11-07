<template>
    <!-- {{ markdown }} -->
    <!-- <textarea v-model="markdown"></textarea> -->
    <div>
        <div class="back" @click="emit('trigger-clear')">
            &lt;
        </div>
        <div class="markdown-reader">
            <div v-html="markdownToHtml"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import {marked} from 'marked';

const emit = defineEmits(['trigger-clear']);
const props = defineProps(['markdown']);

const markdownToHtml = computed(() => {
    return marked(props.markdown);
});
</script>