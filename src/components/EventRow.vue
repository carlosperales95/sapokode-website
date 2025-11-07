<template>
    <div :class="type" class="timeline-container">
        <div class="year">
            <slot name="year">
                <h3></h3>
            </slot>
        </div>
        <div
            class="marker-line"
            :class="{ 'clicked': clicked }"
        >
            <button
                @click.prevent="clickButton"
                class="marker"
            ></button>
            <span class="line"></span>
        </div>
        <div class="event" :class="{ 'empty': empty }">
            <slot name="event">
                <h3></h3>
            </slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['event', 'type', 'empty', 'clicked']);
const emit = defineEmits(['click-button', 'start-button']);

const clickButton = function() {
    if(props.type === 'event-container') {
        emit('click-button', props.event.id + 1);
    }

    if(props.type === 'start-container')
        emit('start-button');
    window.scrollBy({ top: 600, behavior: "smooth"});
    
};
</script>
