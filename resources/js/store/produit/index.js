import axios from 'axios'
export default {
    state: {
        loadedProduits: null,
        produitListName: null

    },
    mutations: {
        setLoadedProduits(state, payload) {
            state.loadedProduits = payload
        },
        setProduitListName(state, payload) {
            state.produitListName = payload
        }
    },
    actions: {
        loadProduits({
            commit,
            dispatch
        }) {
            let uri = 'http://192.168.1.2:3000/api/produit'
            commit('setLoading', true)
            axios.get(uri).then(response => {
                const Produit = []
                const obj = response.data
                for (let key in obj) {
                    Produit.push({
                        id: obj[key].id,
                        designation: obj[key].designation,
                        tva: obj[key].tva,
                        prix: obj[key].prix,
                    })
                }
                commit('setLoadedProduits', Produit)
                dispatch('loadProduitListName')
                commit('setLoading', false)

            }).catch((error) => {
                commit('setLoading', false)
                console.log(error)
            })


        },
        loadProduitListName({
            commit,
            getters
        }) {
            let clt = []
            getters.getloadedProduits.forEach(element => {
                clt.push({
                    id: element.id,
                    designation: element.designation
                })
            });
            commit('setProduitListName', clt)
        }
    },
    getters: {
        getloadedProduits(state) {
            return state.loadedProduits
        },
        getProduitListName(state) {


            return state.produitListName
        }
    }
}
