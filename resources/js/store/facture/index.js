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
}
  },
  getters: {
getLoadedFactures(state){
    return state.getLoadedFactures
}
  },
};
