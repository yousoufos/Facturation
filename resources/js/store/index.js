import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import facture from './facture'
import client from './client'
import shared from './shared'
import produit from './produit'

export const store = new Vuex.Store({
    modules: {
        facture: facture,
        client: client,
        shared: shared,
        produit: produit,
    }
})
