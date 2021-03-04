<template>
    <div v-if="answers.length" class="row justify-content-between">
        <answer 
            v-for="answer in answers" 
            :key="answer.id" 
            :answer="answer" 
            @answer-clicked="storeAnswer"
        />
    </div>
    <b-spinner v-else class="mb-5" label="Spinning"></b-spinner>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Answer from '@/components/Answer.vue';
import { AnswerOccurence } from '@/types';
import { mapMutations } from 'vuex';

@Component({
    methods: {
        ...mapMutations([
            'LAST_SELECTED_ANSWER_CLEARED',
        ]),
    },
    components: {
        "answer": Answer,
    },
})
export default class Answers extends Vue {
    @Prop() private quizID!: number;
    @Prop() private questionID!: number;

    answers: Array<AnswerOccurence> = [];

    // from vuex
    LAST_SELECTED_ANSWER_CLEARED!: Function;

    storeAnswer(id: number): void {
        this.$emit('answer-clicked', id);
    }

    async loadAnswers(): Promise<void> {
        const endpoint = "test-quiz.php";
        const params = {
            params: {
                action: "answers",
                quizId: this.quizID,
                questionId: this.questionID,
            }
        };

        try {
            const response = await this.axios.get(endpoint, params);

            const answers = response.data || {};

            this.answers = answers;
        } catch (error) {
            console.error(`axios.get("${endpoint}")`, `with params`, params, `loading answers rejected with`, error);

            this.$emit("error", "Experiencing problems loading quiz question answers");
        }
    }

    @Watch('questionID')
    onQuestionChange() {
        this.answers = [];
        this.LAST_SELECTED_ANSWER_CLEARED();
        this.loadAnswers();
    }
}
</script>
