<template>
    <div class="container h-100">
        <div class="row h-100">
            <div class="col-sm-12 mx-auto d-flex flex-column align-items-center justify-content-center">

                <p v-if="error" class="alert-message mb-0">{{ error }}</p>

                <template v-else>
                    <question v-if="question" :questionTitle="question.title"/>

                    <answers 
                        :quizID="quizID" 
                        :questionID="questionID" 
                        @error="showError"
                    />
                    
                    <b-progress 
                        class="w-50 mt-2" 
                        :value="currentQuestionIndex" 
                        :max="questions.length" 
                        variant="secondary"
                    />

                    <b-button class="mt-4 px-5 py-2" @click="nextQuestion">Next</b-button>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';
import { RESULTS_VIEW, HOME_PAGE } from '@/router/index';
import Answers from '@/components/Answers.vue';
import Question from '@/components/Question.vue';
import { QuestionOccurence } from '@/types/index';

@Component({
    computed: {
        ...mapState([
            'quizzes',
            'lastSelectedAnswer',
        ]),
    },
    methods: {
        ...mapMutations([
            'USER_ANSWERS_STORED',
        ]),
    },
    components: {
        "answers": Answers,
        "question": Question,
    },
})
export default class QuestionsView extends Vue {
    @Prop() quizID!: number;

    questions: Array<QuestionOccurence> = [];

    allSelectedAnswers: Array<number> = [];

    currentQuestionIndex = 0;

    error = "";

    // from vuex
    USER_ANSWERS_STORED!: Function;
    lastSelectedAnswer!: number;

    get question(): QuestionOccurence | null {
        return this.questions[this.currentQuestionIndex];
    }

    get questionID(): number {
        if (!this.question) {
            return 0;
        }
        return this.question.id;
    }

    storeAnswer(answerID: number) {
        this.lastSelectedAnswer = answerID;
    }

    nextQuestion(): void {
        if (!this.lastSelectedAnswer) {
            return;
        }

        if (this.questions.length === this.currentQuestionIndex + 1) {
            this.USER_ANSWERS_STORED(this.allSelectedAnswers);

            this.$router.push({ name: RESULTS_VIEW, params: { quizID: this.quizID.toString() }});
            return;
        }
        // kā notiktu pārslēgšanās starp jautājumiem, ja jautājums nav ieselektēts, tad poga var būt neaktīva, vai tā dod kļūdas ziņojumu
        this.currentQuestionIndex++;
        this.allSelectedAnswers.push(this.lastSelectedAnswer);
    }

    async loadQuestions(): Promise<void> {
        const endpoint = "test-quiz.php";
        const params = {
            params: {
                action: "questions",
                quizId: this.quizID,
            }
        };

        try {
            const response = await this.axios.get(endpoint, params);

            const questions = response.data || {};

            this.questions = questions;
        } catch (error) {
            console.error(`axios.get("${endpoint}")`, `with params`, params, `loading questions rejected with`, error);

            this.error = "Sorry, experiencing problems loading quiz questions";
        }
    }

    showError(error: string): void {
        this.error = error;
    }

    returnToHomePage(): void {
        this.$router.push({ name: HOME_PAGE })
    }

    mounted() {
        this.loadQuestions();
    }
}
</script>
