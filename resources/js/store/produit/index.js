import axios from 'axios';

export default {
    state: {
        loadedProduits: null,
        produitListName: null,

    },
    mutations: {
        setLoadedProduits (state, payload) {
            state.loadedProduits = payload;
        },
        setProduitListName (state, payload) {
            state.produitListName = payload;
        },
    },
    actions: {
        loadProduits ({
            commit,
            dispatch,
        }) {
            const uri = 'http://localhost:3000/api/produit';
            commit('setLoading', true);
            axios.get(uri).then((response) => {
                const Produit = [];
                const obj = response.data;
                Object.keys(obj).forEach((key) => {
                    const value = obj[key];
                    Produit.push({
                        id: value.id,
                        designation: value.designation,
                        tva: value.tva,
                        prix: value.prix,
                    });
                });
                commit('setLoadedProduits', Produit);
                dispatch('loadProduitListName');
                commit('setLoading', false);
            }).catch((error) => {
                commit('setLoading', false);
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
