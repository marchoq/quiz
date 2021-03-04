import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const NAME_SET = "NAME_SET";
const USER_ANSWERS_STORED = "USER_ANSWERS_STORED";
const LAST_SELECTED_ANSWER_SET = "LAST_SELECTED_ANSWER_SET";
const LAST_SELECTED_ANSWER_CLEARED = "LAST_SELECTED_ANSWER_CLEARED";

const LOCAL_STORAGE_KEY_QUIZ_USER_NAME = "quiz.user.name";
const LOCAL_STORAGE_KEY_QUIZ_USER_ANSWERS = "quiz.user.answers";

export default new Vuex.Store({
    state: {
        name: "",
        userAnswers: "",
        lastSelectedAnswer: 0,
    },
    getters: {
        name(state): string {
            return state.name ? state.name : localStorage.getItem(LOCAL_STORAGE_KEY_QUIZ_USER_NAME) || "";     
        },
        userAnswers(state): Array<number> {
            const anwsers = state.userAnswers ? state.userAnswers : localStorage.getItem(LOCAL_STORAGE_KEY_QUIZ_USER_ANSWERS) || "";      
            
            return anwsers.split(",").map((answerID) => parseInt(answerID));
        },
    },
    mutations: {
        [NAME_SET](state, name: string) { 
            state.name = name;
            localStorage.setItem(LOCAL_STORAGE_KEY_QUIZ_USER_NAME, name);
        },
        [LAST_SELECTED_ANSWER_SET](state, answer: number) { 
            state.lastSelectedAnswer = answer;
        },
        [LAST_SELECTED_ANSWER_CLEARED](state) { 
            state.lastSelectedAnswer = 0;
        },
        [USER_ANSWERS_STORED](state, userAnswers: Array<number>) { 
            const answers = userAnswers.join(",");

            state.userAnswers = answers;
            localStorage.setItem(LOCAL_STORAGE_KEY_QUIZ_USER_ANSWERS, answers);
        },
    },
    actions: {
    },
})
