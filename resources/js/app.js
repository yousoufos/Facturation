/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
window.Vue = require('vue')
import {
    store
} from './store/index'
import VueRouter from 'vue-router'
import router from './router/Router'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)
import Vuetify from 'vuetify'
Vue.use(Vuetify)
import App from './components/App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import 'es6-promise/auto'
import auth from './auth'

Vue.router = router
Vue.use(VueRouter)
Vue.use(VueAxios, axios)

window.Store = store;

router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.getters.isLogged) {
        // redirect to login page
        console.log('non')
        next({ name: 'login' })
        return
    }

    // if logged in redirect to dashboard
    if (to.path === '/login' && store.getters.isLogged) {
        console.log('yes');
        next({ name: 'parametres' })


        return
    }

    next()
})


import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: false,
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key)))

Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('app', require('./components/App.vue').default);
Vue.component('date', require('./components/date/date.vue').default);
Vue.component('navigation', require('./components/Navigation.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store: store,
    render: h => h(require('./components/App').default),
    created () {
        //  this.$store.dispatch('loadFactures')
        //  this.$store.dispatch('loadLignesFacture')
        //  this.$store.dispatch('loadClients')
        // this.$store.dispatch('loadProduits')
        // this.$store.dispatch('loadReglements')
        //this.$store.dispatch('loadAll')

        this.$store.dispatch('chargerFacture')
    },
})
