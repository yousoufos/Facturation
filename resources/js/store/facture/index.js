import axios from 'axios'
var moment = require('moment')
export default {
    state: {
        loadedFactures: [],
    },
    mutations: {
        setLoadedFactures (state, payload) {
            state.loadedFactures = payload
        },
        createFacture (state, payload) {
            state.loadedFactures.push(payload)
        },
        setStatutFacture (state, payload) {
            state.loadedFactures.find(facture => facture.id === payload.id).statut = payload.statut
        }

    },
    actions: {
        changeStatut ({commit},payload) {
            const uri = 'http://localhost:' + process.env.MIX_URI_PORT +'/api/facture/update/' + payload.id
            axios.put(uri, payload).then((response) => {
                // commit('setStatutFacture', payload)



            }).catch((error) => {
                console.log(error);

            });

        },
        async loadFactures ({ commit, getters }) {
            const uri = 'http://localhost:' + process.env.MIX_URI_PORT +'/api/facture';
            //commit('setLoading', true);
             await axios.get(uri).then((response) => {
                const facture = [];
                const obj = response.data.facture;
                Object.keys(obj).forEach((key) => {
                    const value = obj[key];
                    facture.push({
                        id: value.id,
                        reference: value.reference,
                        statut: value.statut,
                        date_emission: value.date_emission,
                        date_echeance: value.date_echeance,
                        client_id: value.client_id,
                        mode_reglement: value.mode_reglement,
                        total_remise: value.total_remise,
                        total_tva: value.total_tva,
                        total_ttc: value.total_ttc,
                        total_ht: value.total_ht,
                        lignes: getters.getLignesFactureById(value.id.toString()),
                    });
                })
                commit('setLoadedFactures', facture);
                //commit('setLoading', false);
                console.log('Factures chargées');

            }).catch((error) => {
                //commit('setLoading', false);
                console.log(error);
            }).then(function () {
                //commit('setLoading', false)
            });
        },
        saveFacture ({ commit }, payload) {
            const uri = 'http://localhost:' + process.env.MIX_URI_PORT +'/api/facture/create'
            commit('setLoading', true)
            axios.post(uri, payload)
                .then(response => {
                    const lignes = [];
                    const obj = response.data.lignes;
                    Object.keys(obj).forEach((key) => {
                        const value = obj[key];
                        lignes.push({
                            id: value.id,
                            produit_id: value.produit_id,
                            facture_id: value.facture_id,
                            qte: value.qte,
                            remise: value.remise,
                        });
                    })
                    const f = response.data.facture;
                    let facture = {
                        id:f.id,
                        client_id: payload.client_id,
                        date_emission: payload.date_emission,
                        date_echeance: payload.date_echeance,
                        statut: payload.statut,
                        total_ht: payload.total_ht,
                        total_ttc: payload.total_ttc,
                        total_remise: payload.total_remise,
                        total_tva: payload.total_tva,
                        reference: f.reference,
                        lignes: lignes
                    }

                    commit('createFacture', facture)
                    commit('createLignesFacture', lignes)
                    commit('setLoading', false)
                    commit('setSavedStatut', true)
                    console.log('Ajout de facture avec succee');
                })
                .catch(error => {

                    commit('setLoading', false)
                    commit('seterreurs', error.response.data.errors)

                    console.log(error);
                }).then(function () {
                    commit('setLoading', false)
                });
        }
    },
    getters: {
        getLoadedFactures (state) {
            return state.loadedFactures.sort((factureA, factureB) => {
                return factureB.id - factureA.id
            })
        },
        getFacture(state) {
            return (factureId) => {
                return state.loadedFactures.find((facture) => {
                    return facture.id == factureId
                })
            }

        }
    },
};
