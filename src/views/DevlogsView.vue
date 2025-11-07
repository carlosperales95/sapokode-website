<template>
    <div class="devlogs-container">
        <div class="devlogs-sidebar">
            <SpecialNavLink :pages="['home', 'projects', 'photography']"/>
            <h1> DEVLOGS </h1>
            <ul>
                <li
                    v-for="(article, index) in articles"
                    :key="index"
                    @click="selectArticle(null, article.name)"
                >
                    <span></span>
                    {{article.name}}
                </li>
            </ul>
        </div>
        <MarkdownRenderer
            v-if="mdFile"
            class="devlogs-main"
            :markdown="mdFile"
            @trigger-clear="clearArticle"
        ></MarkdownRenderer>
        <ArticlesList
            v-else
            :articles="articles"
            @trigger-select="selectArticle"
        ></ArticlesList>
    </div>
</template>

<script setup>
import { useDevlogsStore } from '@/stores/devlogs';
import { storeToRefs } from 'pinia';
import MarkdownRenderer from '@/components/layouts/MarkdownRenderer.vue';
import SpecialNavLink from '@/components//SpecialNavLink.vue';


import ArticlesList from '@/components//ArticlesList.vue';

const devlogsStore = useDevlogsStore();

const {
    articles,
    mdFile,
} = storeToRefs(devlogsStore);

devlogsStore.populateArticles();

const selectArticle = function(evt, name) {
    devlogsStore.getArticle(name);
};

const clearArticle = function() {
    devlogsStore.clearFile();
}
</script>