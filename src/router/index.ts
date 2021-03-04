import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultsView from '../views/ResultsView.vue'

Vue.use(VueRouter)

// Enumerate often used route names to avoid misspelling them as strings
export const HOME_PAGE = 'HOME_PAGE';
export const QUESTION_VIEW = 'QUESTION_VIEW';
export const RESULTS_VIEW = 'RESULTS_VIEW';

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: HOME_PAGE,
        component: HomePage
    },
    {
        path: '/quiz/:quizID/questions',
        name: QUESTION_VIEW,
        component: QuestionView,
        props: true
    },
    {
        path: '/quiz/:quizID/results',
        name: RESULTS_VIEW,
        component: ResultsView,
        props: true
    },
    {
        path: '*',
        redirect: { name: HOME_PAGE },
        component: HomePage
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
