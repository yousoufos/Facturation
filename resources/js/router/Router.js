import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const facturation = Vue.component('facturation', require('../components/facture/CreateFacture.vue'));
const liste_facture = Vue.component('liste_facture', require('../components/facture/ListeFactures.vue'));
const show_facture = Vue.component('show_facture', require('../components/facture/ShowFacture.vue'));

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/facturation/create',
        name: 'create_facture',
        component: facturation
    },
        {
        path: '/facturation/liste',
        name: 'liste_facture',
        component: liste_facture
        },
        {
            path: '/facturation/show/:factureId',
            name: 'showfacture',
            component: show_facture
        }
 ]
})
