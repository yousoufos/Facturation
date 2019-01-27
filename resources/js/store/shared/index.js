import axios from 'axios'
export default {
    state: {
        loading: false,
        erreurs: null,
        savedStatut: false,
        loadingTable:false,
        loadedTva: null,
        loadedModeReglement:null

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
        },
        setLoadedModeReglement (state, payload) {
            state.loadedModeReglement = payload
        },
        addNewTva (state, payload) {
            state.loadedTva.push(payload)
        },
        removeTva (state, payload) {
            const index = state.loadedTva.indexOf(payload)
            state.loadedTva.splice(index, 1)
        },
        editTvaLoaded (state, payload) {
            let tva = state.loadedTva.find(tva => tva.id === payload.id)
            tva.value = payload.value
        },
        addNewModeReglement (state, payload) {
            state.loadedModeReglement.push(payload)
        },
        removeModeReglement (state, payload) {
            const index = state.loadedModeReglement.indexOf(payload)
            state.loadedModeReglement.splice(index, 1)
        },
        editModeRegelementLoaded (state, payload) {
            let mode = state.loadedModeReglement.find(modereglement => modereglement.id === payload.id)
            mode.modeReglement = payload.modeReglement
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
        async loadModeReglement ({ commit }) {
            const uri = 'http://localhost:3000/api/modereglement/'
            await axios.get(uri).then((response) => {
                const mode = [];
                const obj = response.data.modeReglement;
                Object.keys(obj).forEach((key) => {
                    const val = obj[key];
                    mode.push({
                        modeReglement: val.modeReglement,
                    });
                });
                commit('setLoadedModeReglement', mode);
                console.log('ModeReglement chargés');

                //commit('setLoading', false);
            }).catch((error) => {
                //commit('setLoading', false);
                console.log(error);
            });
        },
        addTva ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/tva/add'
            commit('setLoading', true);
            axios.post(uri, payload)
                .then(response => {
                    const tva = response.data.tva;
                    let m = {
                        value:mode.value
                    }
                    commit('addNewTva', m)
                    commit('setLoading', false);
                }).catch(error => {
                    commit('setLoading', false);
                    console.log(error);
                })
        },
        addModeReglement ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/modereglement/add'
            commit('setLoading', true);
            axios.post(uri, payload)
                .then(response => {
                    const mode = response.data.modeReglement;
                    let m = {
                        modeRegelemnt: mode.modeRegelement
                    }
                    commit('addNewModeReglement', m)
                    commit('setLoading', false);
                }).catch(error => {
                    commit('setLoading', false);
                    console.log(error);
                })
        },
        deleteTva ({ commit }, payload) {
            commit('setLoading', true)
            const uri = 'http://localhost:3000/api/tva/delete/' + payload.id
            axios.delete(uri).then(response => {
                commit('removeTva', payload.index)
                console.log(response);
                commit('setLoading', false)

            }).catch(error => {
                commit('setLoading', false)
                console.log(error);

            })
        },
        deleteModeReglement ({ commit }, payload) {
            commit('setLoading', true)
            const uri = 'http://localhost:3000/api/modereglement/delete/' + payload.id
            axios.delete(uri).then(response => {
                commit('removeModeReglement', payload.index)
                console.log(response);
                commit('setLoading', false)

            }).catch(error => {
                commit('setLoading', false)
                console.log(error);

            })
        },
        editTva ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/tva/update/' + payload.id
            commit('setLoading', true)
            axios.put(uri, payload).then((response) => {
                commit('editTvaLoaded', payload)
                console.log(response);

                commit('setLoading', false)
            }).catch((error) => {
                console.log(error);
                commit('setLoading', false)

            });
        },
        editModeReglement ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/modereglement/update/' + payload.id
            commit('setLoading', true)
            axios.put(uri, payload).then((response) => {
                commit('editModeRegelementLoaded', payload)
                console.log(response);

                commit('setLoading', false)
            }).catch((error) => {
                console.log(error);
                commit('setLoading', false)

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
                                     dispatch('loadModeReglement').then(() => {
                                         commit('setLoading', false);
                                     })

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
        },
        getLoadedModeReglement (state) {
            return state.loadedModeReglement
        }

    }
}
