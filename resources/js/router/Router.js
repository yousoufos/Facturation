import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const facturation = Vue.component('facturation', require('../components/facture/CreateFacture.vue').default);
const liste_facture = Vue.component('liste_facture', require('../components/facture/ListeFactures.vue').default);
const show_facture = Vue.component('show_facture', require('../components/facture/ShowFacture.vue').default);
const test = Vue.component('test', require('../components/facture/test.vue').default);
const home = Vue.component('home', require('../components/index.vue').default);
const liste_produit = Vue.component('liste_produit', require('../components/Produits/listeProduits.vue').default);

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
            props: true,
            component: show_facture
        },
        {
            path: '/facturation/test/:id',
            name: 'test',
            props: true,
            component: test
        },
        {
            path: '/facturation/produit/liste',
            name: 'liste_produit',
            component: liste_produit
        },
        {
            path: '*',
            component: home
        }
 ]
})
