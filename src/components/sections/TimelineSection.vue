<template>
    <section class="events section">
        <div class="prompt-wrapper">
            <h2>Timeline loaded.</h2>
            <span class="blinking-cursor">|</span>
        </div>

        <EventRow
            :type="'start-container'"
            :class="{ 'revealed': line.started }"
            :clicked="line.started"
            @start-button="startTimeline"
            :empty="true"
        >
            <template v-slot:year>
                <h3> 1995 </h3>
                <svg
                    :class="'baby'"
                    >
                        <use xlink:href="#baby"></use>
                    </svg>
            </template>
        </EventRow>
        <EventRow
            v-for="event in events"
            :key="event.id"
            :class="{ 'revealed': event.show }"
            :event="event"
            :type="'event-container'"
            :clicked="event.clicked"
            @click-button="revealEvent"
        >
            <template v-slot:year>
                <h3> {{ event.year }} </h3>
            </template>
            <template v-slot:event>
                <h3>{{ event.name }}</h3>
                <h5>{{ event.location }}</h5>
                <h5>{{ event.type }}</h5>
                <h5>{{ event.year }}</h5>
                <p>{{ event.description }}</p>
            </template>
        </EventRow>
        <EventRow
            :type="'end-container'"
            v-if="line.complete"
            :empty="true"
        >
            <template v-slot:year>
                <h3> 2024 </h3>
                <svg
                :class="'calendar'"
                >
                    <use xlink:href="#calendar"></use>
                </svg>
            </template>
        </EventRow>
        <p> Text to finish the section that says something that makes sense</p>
    </section>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useProjectsStore } from '@/stores/projects'
import EventRow from '..//EventRow.vue';


const projectsStore = useProjectsStore();

const line = reactive({
    started: false,
    complete: false
});

const events = ref(projectsStore.timelineEvents);

const startTimeline = () => {
    // For starter node, set line to started and reveal first event
    line.started = true;
    revealEvent(1);
};

const revealEvent = (id) => {
    // id is current id + 1 emitted by eventRow
    // Thus, we set the previous to clicked
    // skip for first node wich emits id=1
    if(id > 1) events.value.find(el => el.id === id - 1).clicked = true;

    // If event is last node, set time line to complete
    if(id - 1 === events.value.length) line.complete = true;
    
    // Find event from array using id. If no event fount, exit.
    // Otherwise set show to true
    const event = events.value.find(el => el.id === id);
    if(!event) return;
    event.show = true;
    
    // Get all array of event elements and smoothScroll to id
    const elements = document.querySelectorAll('.marker');
    if(!elements) return;
    elements[id]
        .scrollIntoView({
            behavior: 'smooth',
        });
};
</script>
