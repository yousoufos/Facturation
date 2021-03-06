import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import facture from './facture'
import client from './client'
import shared from './shared'
import produit from './produit'
import ligneFacture from './ligneFacture'
import reglementFacture from './reglement'
import information from './information'
import auth from './auth'

export const store = new Vuex.Store({
    modules: {
        facture: facture,
        client: client,
        shared: shared,
        produit: produit,
        facture: facture,
        ligneFacture: ligneFacture,
        reglementFacture: reglementFacture,
        information: information,
        auth: auth,
    }
})
