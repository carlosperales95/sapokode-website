<template>
    <div class="separator-container">
        <slot name="center" v-if="hasCenteredElem">
        </slot>
        <div class="separator-top">
            <div class="separator-row">
                <h1>
                    {{ header.toUpperCase() }}
                </h1>
            </div>
        </div>
        <div class="separator-bottom">
            <div class="separator-row">
                <h1>
                    {{ header.toUpperCase() }}
                </h1>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['hasCenteredElem', 'header']);
</script>
