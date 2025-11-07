<template>
    <div class="tech-tag-wrap">
        <p>{{name.toUpperCase()}}</p>
    </div>
</template>

<script setup>
const props = defineProps(['name']);
</script>
