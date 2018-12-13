import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import facture from './facture'
import client from './client'

export const store = new Vuex.Store({
    modules: {
        facture: facture,
        client: client,
    }
})
