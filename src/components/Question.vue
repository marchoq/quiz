<template>
    <h1 v-if="questionTitle" class="mb-5">{{ questionTitle }}</h1>
    <b-spinner v-else class="mb-5" label="Spinning"></b-spinner>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Question extends Vue {
    @Prop() private questionTitle!: string;
}
</script>
