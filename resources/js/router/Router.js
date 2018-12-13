import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const facturation = Vue.component('facturation', require('../components/facture/Facture.vue'));

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/facturation/create',
        name: 'create_facture',
        component: facturation
    }, ]
})
