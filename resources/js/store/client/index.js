import axios from 'axios'
export default {
    state: {
        loadedClients:null,
        clientListName: null

    },
    mutations: {
        setLoadedClients(state, payload) {
            state.loadedClients = payload
        },
        setClientListName(state,payload)
        {
            state.clientListName = payload
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


        },
        loadClientListName({comit,getters}){
            clt = []
            getters.getloadedClients.forEach(element => {
                clt.push(element.name)
            });
            commit('setClientListName',clt)
        }
    },
    getters: {
        getloadedClients(state) {
            return state.loadedClients
        },
        getClientListName(state,actions){
            actions.loadClientNameList
            return state.clientListName
        }


    }
}
