import axios from 'axios'
export default {
    state: {
        loadedLignesFacture: null
    },
    mutations: {
        setLoadedLignesFacture(state,payload){
        state.loadedLignesFacture = payload
}
    },
    actions: {
        loadLignesFacture({commit}){
            const uri = 'http://localhost:3000/api/facture/lignesfacture/';
            commit('setLoading', true);
            axios.get(uri).then((response) => {
              const lignes = [];
              const obj = response.data;
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
              commit('setLoadedLignesFacture', lignes);
              commit('setLoading', false);
            }).catch((error) => {
              commit('setLoading', false);
              console.log(error);
            });
        }
    },
    getters: {
        getLignesFactureById: (state) => (id) => {
            return state.loadedLignesFacture.filter(item => item.facture_id === id)

          }
}
}
