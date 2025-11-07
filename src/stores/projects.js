import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectsStore = defineStore('projects', () => {
    
    const projects = ref([
    {
        id: '1',
        link_name: "SEKURATA_PROJ_PWM",
        title: 'Sekurata',
        description: `
Simple and secure password manager application. Passwords are saved as encrypted values using Fernet, and site access is protected with login authentication`,
        technologies: ["python", "sqlite", "django"],
        img_url: 'sekurata-cover.png',
        git_url: "https://github.com/carlosperales95/sekurata-django"
    },
    {
        id: '2',
        link_name: 'PIN1A_KNOW_PROJ',
        title: 'Pinia Knowledge',
        description: `
Pinia Knowledge is an example of a personal knowledge manager, where the user saves the courses they want to follow, quite similat to a ToDo list.
The features include:

    Listing courses
    Adding course
    Modifying a course
    Deleting a course

The data is managed using Firebase as DB, where all courses are saved.`,
        technologies: ["java", "sql", "spring"],
        img_url: 'glitch-sword.png',
        git_url: "https://github.com/carlosperales95/frontend-knowledge"
    },
    {
        id: '3',
        link_name: "MONEY_APP_PROJ_LANDING_BANK",
        title: 'Bank app',
        description: `
Base JavaScript banking application concept. Includes a landing page for the project, and user log in functionality that gives access to the balance dashboard. There users can keep track of their expenses and log all activity as they would do in a real bank application scenario.`,
        technologies: ["js", "html", "css"],
        img_url: 'bank-concept.png',
        git_url: "https://github.com/carlosperales95/bank-app-example"
    },
    {
        id: '4',
        link_name: "PROJ_TRACK_MAP_WORKOUT",
        title: 'Workout tracker',
        description: `
Base JavaScript map application concept. Users can keep track of their everyday workouts in a visual and interactive way.`,
        technologies: ["js", "html", "css"],
        img_url: 'workout-concept.png',
        git_url: "https://github.com/carlosperales95/workout-map-app-example"
    },
    {
        id: '5',
        link_name: "GAME_NUMBER_WHICH_PROJ_GUESS",
        title: 'Guess the number',
        description: `
Cute small Vanilla JS browser game`,
        technologies: ["js", "html", "css"],
        img_url: 'guess-number.png',
        git_url: "https://github.com/carlosperales95/guess-my-number"
    },
    {
        id: '6',
        link_name: "PADEL_CHAVALADA_PROJ_TOUR",
        title: 'Padel Tour',
        description: `
        I started this project to practice some Vue.js, since most of the things I've been doing were made with React. 
        In addition, some friends want to organize a Padel tournament, so maybe this could help us reach to as many people as possible with a great presentaion.`,
        technologies: ["python", "flask", "django", "html", "css"],
        img_url: 'padeltour-git.png',
        git_url: "https://github.com/carlosperales95/vue-padel-tour"
    },
    {
        id: '7',
        link_name: "PLUG_PROJ_READ_LOG",
        title: 'Plugin LogReader',
        description: "Small project made at work to improve readability and filtering of plugin integration logs",
        technologies: ["python", "flask", "django", "html", "css"],
        img_url: 'logreader-pic.png',
        git_url: "https://github.com/carlosperales95/plugin-beauty-logreader"
    },
    {
        id: '8',
        link_name: "MAGENTO_PROJ_ADYEN_HEADL_GRAPH_QL",
        title: 'Magento Headless Example',
        description: `This project made at work provides a demo for integrating Magento payment plugin with Vue.js in a headless architecture, using Gitpod as the development environment. 
        This demo allows developing and testing Magento storefront using Vue.js components, while keeping the backend functionality and data management in Magento.`,
        technologies: ["js", "html", "css", "react", "webpack"],
        img_url: 'robot-coding.gif',
        git_url: "https://github.com/adyen-examples/magento-headless-demo"

    },
    {
        id: '9',
        link_name: "PROJ_SHEET_BEGIN_CHEAT",
        title: "frogKode",
        description: "Small project aimed to become a beginner cheatsheet for basic html elements for a future course",
        technologies: ["js", "html", "css", "react", "webpack"],
        img_url: 'millionaire-office.png',
        git_url: "https://github.com/carlosperales95/frogKode"
    }
    ]);

    const frogASCII = `
            ::'.:
            ''$;
            """:;
                $;.     .
        ...... ..$:'    $$;.
        ;$$$$$$$$$$:     :$$$$.
        $$$$$$$$$$$$$..  ;$$$$;.
        '$$$$$$$$$$$$$$;.$$$'$$;
        '"$$$$$$$$$$$$$$$$$ '$$;     ,. .
        , ,:    ':$$$$$$$$$$$$$$$  '$$.   :;'""
        "'.:     :$:":$$$$$$$$$$$   '$; ,;:;;""
        '"'$;..;.;$'  ""$$$$$$$$:    '$.$$$$:""
        '"'  ""'""" ;.$$$$$$$$""      '"""'
        ,;$$$$$$$:""
        '$$$$$$$;.;.
            """'""""":$..
                    ,$$
                    ;$$:
                    ,;'$$'
                    ":"$:
                ::::.`;
    
    const frogText = `I'm still not sure why I chose the toad as a my logo. I find toads weird and fascinating, and came up while I was coming up with an easy logo idea to use as my website logo.
    The rules were simple, attempt so make some kind of convincing logo or dev signature using only my initials and some extra lines (but keeping it simple). Due to my software engineering background, the logo needed to be made with real keyboard characters.
    After some playing around with letters, I put them together a bit better in paint, and what looked like the first toad face appeared. This was not intentional, but after making it I kinda thought it looked like a frog.
    I will attempt to improve it in the future and try to make it look less wonky. This above logo came from another idea, making a frog out of special characters and punctuations.
    Although my real name has nothing to do with toads, they have become my official mascot. The toad is also big in japanese culture, which is cool`;

    const timelineEvents = [
        {
            id: 1,
            type: 'studies',
            year: 2015,
            location: 'La Salle Bilbao',
            name: 'High School',
            description: 'Description of Event 1',
            show: false,
            clicked: false
        },
        {
            id: 2,
            type: 'work',
            year: 2016,
            location: 'DeustoTech',
            name: 'Internship DeustoTech',
            description: 'Extracurricular internship in collaboration with Deustotech Lab, a research oriented development lab at the University of Deusto. I was responsible, together with another intern, for the development of several research academic projects.',
            show: false,
            clicked: false
        },
        {
            id: 3,
            type: 'work',
            year: 'January 2017',
            location: 'WeNite',
            name: 'Internship WeNite',
            description: 'Curricular internship in collaboration with WeNite. Resposible for the front-end development, coding the solution with Node.js + HTML + CSS and translating it into iOS and Android app format using Apache Cordova. The goal was to develop the full pilot for their app, a nightlife app for iOS an Android.',
            show: false,
            clicked: false
        },
        {
            id: 4,
            type: 'studies',
            year: 'August 2017',
            location: 'University of Deusto',
            name: 'CS degree',
            description: 'Completed the Computer Engineering Bachelors degree in the University of Deusto.',
            show: false,
            clicked: false
        },
        {
            id: 5,
            type: 'work',
            year: 2019,
            location: 'Luggo',
            name: 'Full Stack Developer',
            description: 'Part time job in the early stages of the company now known as Luggo, where I originally started as a front-end developer. Later on, I also assumed some of the backend development responsibilities, working as a full-stack developer for the rest of my stay.',
            show: false,
            clicked: false
        },
        {
            id: 6,
            type: 'work',
            year: 2020,
            location: 'University of Bologna',
            name: 'Traineeship in Unibo',
            description: 'Spent a full academic year in Bologna, Italy. During this time I followed a traineeship of 6 months, in which I carried out my master thesis on Machine Learning and Natural Language Processing.',
            show: false,
            clicked: false
        },
        {
            id: 7,
            type: 'studies',
            year: 'June 2021',
            location: 'VU + UvA',
            name: 'Msc Degree',
            description: 'Completed the Computer Science Masters degree, following the track of Software Engineering + Green IT. ',
            show: false,
            clicked: false
        },
        {
            id: 8,
            type: 'work',
            year: 'July 2021',
            location: 'Adyen',
            name: 'Technical Support Engineer',
            description: 'Current role',
            show: false,
            clicked: false
        },
    ]
    
    return {
        projects,
        frogASCII,
        frogText,
        timelineEvents
    }
})
