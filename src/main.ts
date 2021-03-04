import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './services/axios'
import VueAxios from 'vue-axios'    

import { BootstrapVue, DropdownPlugin, ProgressPlugin, SpinnerPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(DropdownPlugin);
// TODO: import locally
Vue.use(ProgressPlugin);
Vue.use(SpinnerPlugin);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
