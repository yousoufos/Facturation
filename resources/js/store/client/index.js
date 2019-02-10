import axios from 'axios'
export default {
  state: {
    loadedClients: [],
    clientListName: [],

  },
  mutations: {
    setLoadedClients(state, payload) {
      state.loadedClients = payload;
    },
    setClientListName(state, payload) {
      state.clientListName = payload;
    },
    addNewClient (state, payload) {
          state.loadedClients.push(payload)
      },
    removeClient (state, payload) {
          const index = state.loadedClients.indexOf(payload)
          state.loadedClients.splice(index, 1)
      },
    editClientLoaded (state, payload) {
          let clt = state.loadedClients.find(client => client.id === payload.id)
          clt.nom = payload.nom
          clt.raison = payload.raison
          clt.matricule = payload.matricule
          clt.tel = payload.tel
          clt.email = payload.email
          clt.adresse = payload.adresse
      }
  },
    actions: {
        editClient ({ commit }, payload) {
            const uri = 'http://localhost:'+process.env.MIX_URI_PORT+'/api/client/update/' + payload.id
            commit('setLoadingTable', true)
            axios.put(uri, payload).then((response) => {
                commit('editClientLoaded', payload)
                console.log(response);
                commit('setLoadingTable', false)

            }).catch((error) => {
                console.log(error);
                commit('setLoadingTable', false)

            });
        },
        deleteClient ({ commit }, payload) {
            commit('setLoadingTable', true)
            const uri = 'http://localhost:' + process.env.MIX_URI_PORT +'/api/client/delete/' + payload.id
            axios.delete(uri).then(response => {
                commit('removeClient', payload.index)
                console.log(response);
                commit('setLoadingTable', false)

            }).catch(error => {
                commit('setLoadingTable', false)
                console.log(error);

            })
        },
        saveClient ({ commit }, payload) {
            const uri = 'http://localhost:' + process.env.MIX_URI_PORT +'/api/client/add'
            commit('setLoadingTable', true);
            axios.post(uri, payload)
                .then(response => {
                    client = response.data.client;
                    let clt = {
                        nom: produit.nom,
                        raison: produit.raison,
                        matricule: produit.matricule,
                        tel: produit.tel,
                        email: produit.email,
                        adresse: produit.adresse,
                    }
                    commit('addNewProduit', clt)
                    commit('setLoadingTable', false);
                }).catch(error => {
                    commit('setLoadingTable', false);
                    //commit('seterreurs', error.response.data.errors)
                    console.log(error);
                })


        },
    async loadClients({
      commit,
      dispatch,
    }) {
        const uri = 'http://localhost:' + process.env.MIX_URI_PORT +'/api/client';
      //commit('setLoading', true);
      await axios.get(uri).then((response) => {
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
                email: obj[key].email,
            });

        })
        commit('setLoadedClients', client);
        dispatch('loadClientListName');
          //commit('setLoading', false);
          console.log('Clients chargés');

      }).catch((error) => {
        //commit('setLoading', false);
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
