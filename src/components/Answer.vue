<template>
    <b-button 
        class="col-sm-4 mb-3 px-5 py-3 mx-1" 
        :variant="buttonStyle" 
        @click="selectAnswer(answer.id)"
    >
        {{ answer.title }}
    </b-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapMutations, mapState } from 'vuex';

@Component({
    computed: {
        ...mapState([
            'lastSelectedAnswer',
        ]),
    },
    methods: {
        ...mapMutations([
            'LAST_SELECTED_ANSWER_SET'
        ]),
    },
})
export default class Answer extends Vue {
    @Prop() private answer: any;
    // from vuex
    lastSelectedAnswer!: number;
    LAST_SELECTED_ANSWER_SET!: Function;

    get selected(): boolean  {
        return this.lastSelectedAnswer === this.answer.id;
    }

    get buttonStyle(): string {
        return this.selected ? "dark" : "secondary";
    }

    selectAnswer(answerID: number) {
        this.LAST_SELECTED_ANSWER_SET(answerID);
    }
}
</script>
