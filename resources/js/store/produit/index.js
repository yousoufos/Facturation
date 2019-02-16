import axios from 'axios';

export default {
    state: {
        loadedProduits: [],
        produitListName: [],

    },
    mutations: {
        setLoadedProduits (state, payload) {
            state.loadedProduits = payload;
        },
        setProduitListName (state, payload) {
            state.produitListName = payload;
        },
        addNewProduit (state, payload) {
            state.loadedProduits.push(payload)
        },
        removeProduit (state, payload) {
            const index = state.loadedProduits.indexOf(payload)
            state.loadedProduits.splice(index, 1)
        },
        editProduitLoaded (state, payload) {
            let prod = state.loadedProduits.find(produit => produit.id === payload.id)
            prod.prix = payload.prix
            prod.tva = payload.tva
            prod.designation = payload.designation
            prod.code = payload.code
        }

    },
    actions: {
        editProduit ({ commit }, payload) {

            const uri   = process.env.MIX_URI_PORT +'/api/produit/update/' + payload.id
            commit('setLoadingTable', true)
            axios.put(uri, payload).then((response) => {
                commit('editProduitLoaded', payload)
                console.log(response);

                commit('setLoadingTable', false)
            }).catch((error) => {
                console.log(error);
                commit('setLoadingTable', false)

            });
        },
        deleteProduit ({ commit }, payload) {
            commit('setLoadingTable', true)
            const uri   = process.env.MIX_URI_PORT +'/api/produit/delete/'+payload.id
            axios.delete(uri).then(response => {
                commit('removeProduit',payload.index)
                console.log(response);
                commit('setLoadingTable', false)

            }).catch(error => {
                commit('setLoadingTable', false)
                console.log(error);

            })
        },
        async loadProduits ({
            commit,
            dispatch,
        }) {
            const uri   = process.env.MIX_URI_PORT +'/api/produit';
            //commit('setLoading', true);
            await axios.get(uri).then((response) => {
                const Produit = [];
                const obj = response.data;
                Object.keys(obj).forEach((key) => {
                    const value = obj[key];
                    Produit.push({
                        id: value.id,
                        designation: value.designation,
                        tva: value.tva,
                        prix: value.prix,
                        code:value.code
                    });
                });
                commit('setLoadedProduits', Produit);
                dispatch('loadProduitListName');
                console.log('Produits chargés');

                //commit('setLoading', false);
            }).catch((error) => {
                //commit('setLoading', false);
                console.log(error);
            });
        },
        loadProduitListName ({
            commit,
            getters,
        }) {
            const clt = [];
            getters.getloadedProduits.forEach((element) => {
                clt.push({
                    id: element.id,
                    designation: element.designation,
                });
            });
            commit('setProduitListName', clt);
        },
        saveProduit ({ commit }, payload) {
            const uri   = process.env.MIX_URI_PORT +'/api/produit/add'
            commit('setLoading', true);
            axios.post(uri, payload)
                .then(response => {
                    const produit = response.data.produit;
                    let prod = {
                        code: produit.code,
                        designation: produit.designation,
                        prix: produit.prix,
                        tva: produit.tva
                    }
                    commit('addNewProduit', prod)
                    commit('setLoading', false);
                }).catch(error => {
                    commit('setLoading', false);
                    //commit('seterreurs', error.response.data.errors)
                    console.log(error);
                })


        },
    },

    getters: {
        getloadedProduits (state) {
            return state.loadedProduits;
        },
        getProduitListName (state) {
            return state.produitListName;
        },
        getProduitById (state) {
            return produitId => state.loadedProduits.find(produit => produit.id===produitId);
        },
    },
};
