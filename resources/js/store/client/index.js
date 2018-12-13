import axios from 'axios'
export default {
    state: {
        loadedClients: [],
        reponse: ''

    },
    mutations: {
        setLoadedClients(state, payload) {
            state.loadedClients = payload
            //state.reponse = payload

        }
    },
    actions: {
        loadClients({
            commit
        }, payload) {
            let uri = payload + '/api/client'
            axios.get(uri).then(response => {
                commit('setLoadedClients', response.data.data)
                console.log(response.data.data)

            }).catch((error) => {
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
