import axios from 'axios'
export default {
    state: {
        loadedClients:null,
        reponse: ''

    },
    mutations: {
        setLoadedClients(state, payload) {
            state.loadedClients = payload
        }
    },
    actions: {
        loadClients({
            commit
        }, payload) {
            let uri = payload + '/api/client'
            commit('setLoading',true)
            axios.get(uri).then(response => {
                const client=[]
                const obj = response.data
                for (let key in obj) {
                    //console.log(key);
                    client.push({
                        id: key,
                        nom: obj[key].nom,
                        raison: obj[key].raison,
                        matricule:obj[key].matricule,
                        adresse: obj[key].adresse,
                        tel: obj[key].tel,
                         })
                }
                commit('setLoadedClients', client)
                commit('setLoading',false)

            }).catch((error) => {
                commit('setLoading',false)
                console.log(error)
            })


        }
    },
    getters: {
        getloadedClients(state) {
            return state.loadedClients
        },


    }
}
