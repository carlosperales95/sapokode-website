<template>
    <div class="ar-list-container">
        <div class="ar-list-header">
            <input type="text">
            <button>Search</button>
            <div class="filters-bar">
                <button>action</button>
            </div>
        </div>
        <div class="ar-list-wrapper">
            <ul>
                <li
                    v-for="(article, index) in articles"
                    :key="index"
                    @click="emit('trigger-select', $event, article.name)">
                    <div class="ar-element">
                        <h3>
                            {{ article.title }}
                        </h3>
                        <div class="ar-elem-tag-wrapper">
                            <span v-for="(tag, index) in article.tags" :key="index" class="ar-elem-tag">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['trigger-select']);
const props = defineProps(["articles"]);
</script>