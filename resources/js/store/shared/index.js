import axios from 'axios'
export default {
    state: {
        loading: false,
        erreurs: null,
        savedStatut: false,
        loadingTable:false,
        loadedTva: null,
        loadedModeReglement:null,
        loadingTva: false,
        loadingReglement:false

    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setLoadingTva (state, payload) {
            state.loadingTva = payload
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
        setLoadingReglement (state,payload) {
            state.loadingReglement = payload
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
                        id:val.id,
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
                        id:val.id,
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
            commit('setLoadingTva', true);
            const uri = 'http://localhost:3000/api/tva/add'

            axios.post(uri, payload)
                .then(response => {
                    const tva = response.data.tva;
                    let m = {
                        id:tva.id,
                        value:tva.value
                    }
                    commit('addNewTva', m)
                    commit('setLoadingTva', false);
                }).catch(error => {
                    commit('setLoadingTva', false);
                    console.log(error);
                })
        },
        addModeReglement ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/modereglement/add'
            commit('setLoadingReglement', true);
            axios.post(uri, payload)
                .then(response => {
                    const mode = response.data.modeReglement;
                    let m = {
                        id:mode.id,
                        modeReglement: mode.modeReglement
                    }
                    commit('addNewModeReglement', m)
                    commit('setLoadingReglement', false);
                }).catch(error => {
                    commit('setLoadingReglement', false);
                    console.log(error);
                })
        },
        deleteTva ({ commit }, payload) {
            commit('setLoadingTva', true);
            const uri = 'http://localhost:3000/api/tva/delete/' + payload
            axios.delete(uri).then(response => {
                commit('removeTva', payload.index)
                console.log(response);
                commit('setLoadingTva', false);


            }).catch(error => {
                commit('setLoadingTva', false);
                console.log(error);

            })
        },
        deleteModeReglement ({ commit }, payload) {
            commit('setLoadingReglement', true)
            const uri = 'http://localhost:3000/api/modereglement/delete/' + payload
            axios.delete(uri).then(response => {
                commit('removeModeReglement', payload.index)
                console.log(response);
                commit('setLoadingReglement', false)

            }).catch(error => {
                commit('setLoadingReglement', false)
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
                                         dispatch('loadInformation').then(() => {
                                             commit('setLoading', false);
                                         })

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
        getLoadingTva (state) {
            return state.loadingTva
        },
        getLoadingReglement (state) {
            return state.loadingReglement
        },
        getLoadedTva (state) {
            return state.getLoadedTva
            // return state.loadedTva.sort((tvaA, tvaB) => {
            //     return tvaB.value - tvaA.value
            // })
        },
        getLoadedModeReglement (state) {
            return state.loadedModeReglement
        }

    }
}
