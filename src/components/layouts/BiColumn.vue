<template>
    <div class="w-full h-full grid grid-cols-2 text-secondary-100">
        <slot name="left">
            <!-- Element to be shown on left side -->
        </slot>
        <div class="" :class="{'fall-back': modifier}">
            <slot name="right">
                <!-- Element to be shown on right side -->
            </slot>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['trigger-show']);
const props = defineProps(['modifier']);
</script>