import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
Vue.use(Router)


const facturation = Vue.component('facturation', require('../components/facture/CreateFacture.vue').default);
const liste_facture = Vue.component('liste_facture', require('../components/facture/ListeFactures.vue').default);
const show_facture = Vue.component('show_facture', require('../components/facture/ShowFacture.vue').default);
const test = Vue.component('test', require('../components/facture/test.vue').default);
const home = Vue.component('home', require('../components/index.vue').default);
const liste_produit = Vue.component('liste_produit', require('../components/Produits/listeProduits.vue').default);
const liste_client = Vue.component('liste_client', require('../components/Clients/listeClients.vue').default);
const parametres = Vue.component('parametres', require('../components/parametres/parametres.vue').default);
const register = Vue.component('register', require('../components/auth/register.vue').default);
const login = Vue.component('login', require('../components/auth/login.vue').default);
const logout = Vue.component('logout', require('../components/auth/logout.vue').default);


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/facturation/create',
        name: 'create_facture',
            component: facturation,

    },
        {
        path: '/facturation/liste',
        name: 'liste_facture',
        component: liste_facture,

        },
        {
            path: '/facturation/show/:factureId',
            name: 'showfacture',
            props: true,
            component: show_facture,

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
            component: liste_produit,


        },
        {
            path: '/facturation/client/liste',
            name: 'liste_client',
            component: liste_client,

        },
        {
            path: '/facturation/test',
            name: 'test',
            component: test
        },
        {
            path: '/facturation/parametres',
            name: 'parametres',
            component: parametres,
            beforeEnter:AuthGuard

        },
        {
            path: '*',
            name:'home',
            component: home,


        },
        {
            path: '/facturation/register',
            name: 'register',
            component: register,

        },
        {
            path: '/facturation/login',
            name: 'login',
            component: login,

        },
        {
            path: '/facturation/logout',
            name: 'logout',
            component: logout,

        },
    ],


})

