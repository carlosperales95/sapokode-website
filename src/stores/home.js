import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useHomeStore = defineStore('home', () => {
    
    const fullName = ref('SapoKode');
    const jobTitle = ref('Software Engineer');
    const aboutMe = ref('The best results come from the sheer motivation to improve and taking care of your workers, not from the ideas of the stakeholders throwing money at you.');

    const email = ref('your.email@example.com');
    const linkedin = ref('https://www.linkedin.com/in/your-linkedin-profile');

    const techStack = ref({
        frontend: {
            title: 'frontend',
            code: 'frontend',
            techs: ['html', 'css', 'js', 'sass', 'vue', 'react', 'django', 'flask']

        },
        backend: {
            title: 'backend',
            code: 'backend',
            techs: ['java', 'python', 'node', 'mysql', 'php', 'sqlite', 'spring', 'symfony' , 'postgres']
        },
        others: {
            title: 'others',
            code: 'luck',
            techs: ['git', 'bash', 'docker']
        }
    });

    const aboutTextContent = ref(
        `Fully committed to the philosophy of life-long learning, I’m a developer with a deep passion for complex problems.
    I enjoy finding simple and elegant solutions, both in backend and web development projects. The unique combination of creativity, logic, technology, and discovery hunger, drives my excitement and passion for code.
    When I’m not at my computer I like to spend my time traveling in the wild, mixing some songs or going out to take some great photos.`
    );
    
    return {
        fullName,
        jobTitle,
        aboutMe,
        email,
        linkedin,
        techStack,
        aboutTextContent
    }
});
