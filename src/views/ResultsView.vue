<template>
    <div class="container h-100">
        <div class="row h-100">
            <div class="col-sm-12 mx-auto d-flex flex-column align-items-center h-50 justify-content-end">

                <p v-if="error" class="alert-message mb-0">{{ error }}</p>
                <template v-else>
                    <h1 class="mb-4">Thanks, {{ this.name }}!</h1>

                    <p class="text-center" v-if="results.total">You responded correctly to {{ results.correct }} out of {{ results.total }} questions.</p>
                    <b-spinner v-else class="mb-2" label="Spinning"></b-spinner>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { has } from 'lodash';
import { mapGetters } from 'vuex';
import { HOME_PAGE } from '@/router/index';
import { Results } from '@/types';

@Component({
    computed: {
        ...mapGetters([
            'name',
            'userAnswers',
        ]),
    }
})
export default class ResultsView extends Vue {
    @Prop() quizID!: number;

    results: Results = {
        total: 0,
        correct: 0,
    };
    error = "";
    
    // from vuex
    name!: string;
    userAnswers!: Array<number>;
    

    async loadResults(): Promise<void> {
        const endpoint = "test-quiz.php";
        const params = {
            params: {
                action: "submit",
                answers: this.userAnswers,
                quizId: this.quizID,
            },
        };

        try {
            const response = await this.axios.get(endpoint, params);

            const results = response.data || {};

            this.results = results;
            
            // total should always be greater than 0
            if (!has(results, "total") || !results.total) {
                this.error = "Ups, something went wrong!"
            }
        } catch (error) {
            console.error(`axios.get("${endpoint}")`, `with params`, params, `loading results rejected with`, error);
            this.error = "Ups, something went wrong!"
        }
    }

    returnToHomePage(): void {
        this.$router.push({ name: HOME_PAGE })
    }

    mounted() {
        if (!this.name || !this.userAnswers.length) {
            this.returnToHomePage();
            return;
        }
        this.loadResults();
    }
}
</script>
