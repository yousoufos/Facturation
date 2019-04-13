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
        state.loadedClients.splice(state.loadedClients.findIndex(function (client) {
            return client.id === payload;
        }), 1);
      },
    editClientLoaded (state, payload) {
          let clt = state.loadedClients.find(client => client.id === payload.id)
          clt.nom = payload.nom
          clt.raison = payload.raison
          clt.matricule = payload.matricule
          clt.tel = payload.tel
          clt.email = payload.email
          clt.adresse = payload.adresse
          clt.user_id = payload.user_id
      }
  },
    actions: {
        editClient ({ commit }, payload) {
            const uri  =process.env.MIX_URI_PORT+'/api/client/update/' + payload.id
            commit('setLoadingTable', true)
            axios.put(uri, payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((response) => {
                // commit('editClientLoaded', payload)
                // console.log(response);
                commit('setLoadingTable', false)

            }).catch((error) => {
                console.log(error);
                commit('setLoadingTable', false)

            });
        },
        deleteClient ({ commit }, payload) {
            commit('setLoadingTable', true)
            const uri   = process.env.MIX_URI_PORT +'/api/client/delete/' + payload.id
            axios.delete(uri, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                // commit('removeClient', payload.index)
                // console.log(response);
                commit('setLoadingTable', false)

            }).catch(error => {
                commit('setLoadingTable', false)
                console.log(error);

            })
        },
        saveClient ({ commit }, payload) {
            const uri   = process.env.MIX_URI_PORT +'/api/client/add'
            commit('setLoadingTable', true);


            axios.post(uri, payload, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    // const client = response.data.client;
                    // let clt = {
                    //     nom: client.nom,
                    //     raison: client.raison,
                    //     matricule: client.matricule,
                    //     tel: client.tel,
                    //     email: client.email,
                    //     adresse: client.adresse,
                    //     user_id: client.user_id,
                    // }
                    // commit('addNewClient', clt)
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
        const uri   = process.env.MIX_URI_PORT +'/api/client';
      //commit('setLoading', true);
        await axios.get(uri, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
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
                user_id: obj[key].user_id,
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
      getloadedClients (state) {
          return _.orderBy(state.loadedClients, ['id'], ['desc']);
      //return state.loadedClients;
    },
    getClientListName(state) {
      return state.clientListName;
    },
    getClient(state){
        return clientId => state.loadedClients.find(client => client.id===clientId);
    }
  },
};
