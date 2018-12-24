import axios from 'axios'
export default {
  state: {
    loadedClients: null,
    clientListName: null,

  },
  mutations: {
    setLoadedClients(state, payload) {
      state.loadedClients = payload;
    },
    setClientListName(state, payload) {
      state.clientListName = payload;
    },
  },
  actions: {
    loadClients({
      commit,
      dispatch,
    }) {
      const uri = 'http://localhost:3000/api/client';
      commit('setLoading', true);
      axios.get(uri).then((response) => {
        const client = [];
        const obj = response.data;
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            client.push({
                id: obj[key].id,
                nom: obj[key].nom,
                raison: obj[key].raison,
                matricule: obj[key].matricule,
                adresse: obj[key].adresse,
                tel: obj[key].tel,
              });
        })
        commit('setLoadedClients', client);
        dispatch('loadClientListName');
        commit('setLoading', false);
      }).catch((error) => {
        commit('setLoading', false);
        console.log(error);
      });
    },
    loadClientListName({
      commit,
      getters,
    }) {
      const clt = [];
      getters.getloadedClients.forEach((element) => {
        clt.push({
          id: element.id,
          nom: element.nom,
        });
      });
      commit('setClientListName', clt);
    },
  },
  getters: {
    getloadedClients(state) {
      return state.loadedClients;
    },
    getClientListName(state) {
      return state.clientListName;
    },
    getClient(state){
        return clientId => state.loadedClients.find(client => client.id===clientId);
    }
  },
};
