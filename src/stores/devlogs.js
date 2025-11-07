import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDevlogsStore = defineStore('devlogs', () => {
    
const articles = ref([]);
const mdFile = ref("");
const isLoading = ref(false);
    
    
const populateArticles = () => {
    articles.value = [
        {
            name: "artic",
            title: "How to build a node js app that tracks workouts?",
            tags: ['nodejs', 'js', 'css', 'html']
        },
        {
            name: "desert",
            title: "Building this portfolio website with vue",
            tags: ['vue', 'js', 'css', 'html', 'threejs', 'marked', 'pinia', 'cloudinary']
        },
        {
            name: "tundra",
            title: "Making a password manager from scratch with Python",
            tags: ['html', 'js', 'css', 'python', 'django', 'sqllite']
        },
        {
            name: "savannah",
            title: "Example animation component using css animations",
            tags: ['html', 'js', 'css']
        },
        {
            name: "latifund",
            title: "To-do list app using Pinia store and Vue",
            tags: ['pinia', 'vue', 'js', 'css', 'html', 'firebase']
        },
        {
            name: "bocage",
            title: "Is it easy to build a plant database? Let's try it!",
            tags: ['sql']
        },
    ];
};

const clearFile = () => {
    mdFile.value = ""
};

const getArticle = async (name) => {
    const markdownFileContent = (await import(`./articles/${name}.md?raw`)).default;
    mdFile.value = markdownFileContent;
};

return {
    articles,
    mdFile,
    isLoading,
    clearFile,
    getArticle,
    populateArticles
}

});

