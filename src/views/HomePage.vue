<template>
    <div class="container h-100">
        <div class="row h-100">
            <div class="col-sm-8 col-md-5 col-xl-4 mx-auto d-flex flex-column align-items-center justify-content-center">

                <h1 class="mb-5">Technical task</h1>

                <p v-if="error" class="text-danger alert-message">{{ error }}</p>

                <b-form-input class="w-100 mb-3" @update="setName($event)" placeholder="Enter your name"></b-form-input>

                <b-dropdown 
                    class="w-100" 
                    menu-class="w-100"
                    :text="dropdownTitle"
                >
                    <b-dropdown-item 
                        @click="selectQuiz(quiz)" 
                        v-for="quiz in quizzes" 
                        :key="quiz.id" 
                        :value="quiz.id"
                    >{{ quiz.title }}</b-dropdown-item>
                </b-dropdown>

                <b-button class="px-5 py-2 mt-5" @click="goToQuestionsView">Start</b-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { find } from 'lodash';
import { QUESTION_VIEW } from '@/router/index';
import { mapState, mapMutations } from 'vuex';
import { QuizOccurence } from '@/types/index';

@Component({
    computed: {
        ...mapState([
            'name',
        ]),
    },
    methods: {
        ...mapMutations([
            'NAME_SET',
        ]),
    }
})
export default class HomePage extends Vue {
    quizzes: Array<QuizOccurence> = [];
    quiz: QuizOccurence = {
        id: 0,
        title: "",
    };
    error = "";

    // from vuex
    name!: string;
    NAME_SET!: Function;

    setName(name: string): void {
        this.NAME_SET(name);
    }

    // goes to the next step
    goToQuestionsView(): void {
        if (!this.name.trim()) {
            this.error = "Please enter your name.";
            return;
        }
        // if not selected quizz or wrong value
        if (!this.quiz.id || !find(this.quizzes, ((quiz) => quiz.id === this.quiz.id))) {
            this.error = "Please choose a test.";
            return;
        }
        
        this.$router.push({ name: QUESTION_VIEW, params: { quizID: this.quiz.id.toString() }});
    }

    selectQuiz(quiz: QuizOccurence): void {
        this.quiz = Object.assign({}, this.quiz, quiz)
    }

    get dropdownTitle(): string {
        if (!this.quiz.id) {
            return "Choose test";
        }
        return this.quiz.title;
    }

    // TODO: maybe we need some visual loader for quizzes?
    async loadQuizzes(): Promise<void> {
        const endpoint = "test-quiz.php";
        const params = {
            params: {
                action: "quizzes",
            },
            crossDomain: true
        };
        
        try {
            const response = await this.axios.get(endpoint, params);

            const quizzes = response.data || {};

            this.quizzes = quizzes;
        } catch (error) {
            console.error(`axios.get("${endpoint}")`, `with params`, params, `loading quizzes rejected with`, error);
        }
    }

    mounted() {
        this.loadQuizzes();
    }
}
</script>