import axios from 'axios'
export default {
    state: {
        loading: false,
        erreurs: null,
        savedStatut: false,
        loadingTable:false,
        loadedTva: null

    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        seterreurs (state, payload) {
            state.erreurs = payload
        },
        clearErrors (state) {
            state.erreurs = null
        },
        clearSavedStatut (state) {
            state.savedStatut = false
        },
        setSavedStatut (state, payload) {
            state.savedStatut = payload
        },
        setLoadingTable (state,payload) {
            state.loadingTable = payload
        },
        setLoadedTva (state, payload) {
            state.loadedTva = payload
        }


    },
    actions: {
        async loadTva ({ commit }) {
            const uri = 'http://localhost:3000/api/tva/'
            await axios.get(uri).then((response) => {
                const tva = [];
                const obj = response.data.tva;
                Object.keys(obj).forEach((key) => {
                    const val = obj[key];
                    tva.push({
                        value: val.value,
                    });
                });
                commit('setLoadedTva', tva);
                console.log('Tva chargées');

                //commit('setLoading', false);
            }).catch((error) => {
                //commit('setLoading', false);
                console.log(error);
            });
        },
        clearErrors ({ commit }) {
            commit('clearErrors')
        },
        clearSavedStatut ({ commit }) {
            commit('clearSavedStatut')
        },
        loadAll ({ dispatch }) {
            let lignes = dispatch('loadLignesFacture')
            let facture = dispatch('loadFactures')
            let client = dispatch('loadClients')
            let produits = dispatch('loadProduits')
            let reglements = dispatch('loadReglements')
             Promise.all([lignes, facture, client, produits, reglements]);
            console.log('loaded');
        },
        chargerFacture ({ dispatch,commit }) {
            commit('setLoading', true);
             dispatch('loadLignesFacture').then(() => {
                 dispatch('loadFactures').then(() => {
                     dispatch('loadClients').then(() => {
                         dispatch('loadProduits').then(() => {
                             dispatch('loadReglements').then(() => {
                                 dispatch('loadTva').then(() => {
                                     commit('setLoading', false);
                                 })

                             })
                         })

                     })
                 })
            })
        }
    },

    getters: {
        getErrors (state) {

            return state.erreurs
        },
        loading (state) {
            return state.loading
        },
        erreurs (state) {
            return state.erreurs
        },
        savedStatut (state) {
            return state.savedStatut
        },
        getLoadingTable (state) {
            return state.loadingTable
        },
        getLoadedTva (state) {
            return state.loadedTva
        }

    }
}
