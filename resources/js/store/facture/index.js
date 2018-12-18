import axios from 'axios'
export default {
  state: {
    loadedFactures:null,
    },
  mutations: {
setLoadedFactures(state,payload){
    state.loadedFactures = payload
}
  },
  actions: {
loadFactures({commit,getters}){
    const uri = 'http://localhost:3000/api/facture';
    commit('setLoading', true);
    axios.get(uri).then((response) => {
      const facture = [];
      const obj = response.data;
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
      commit('setLoading', false);
    }).catch((error) => {
      commit('setLoading', false);
      console.log(error);
    });
},
saveFacture({commit},payload){
  const uri = 'http://localhost:3000/api/facture/create'
    commit('setLoading', true)
    axios.post(uri,payload)
        .then(response => {
          let facture = {
            client_id : payload.client_id,
            date_emission : payload.date_emission,
            date_echeance : payload.date_echeance,
            reglement : payload.reglement,
            statut : payload.statut,
            total_ht : payload.total_ht,
            total_ttc :payload.total_ttc,
            total_remise : payload.total_remise,
            total_tva : payload.total_tva,
          }
          let lignes = {
            produit_id : payload.lignes.produit_id,
            qte : payload.lignes.qte,
            remise : payload.lignes.remise
          }
          commit('setLoadedFactures',facture)
          commit('setLoadedLignesFacture',lignes)
          commit('setLoading', false)
          console.log(response);
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error);
        });
}
  },
  getters: {
getLoadedFactures(state){
    return state.getLoadedFactures
}
  },
};
