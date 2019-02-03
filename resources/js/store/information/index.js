import axios from 'axios';

export default {
    state: {
        information: null,
    },
    mutations: {
        setInformation (state, payload) {
            state.information = payload;
        },
        setLogoUrl (state, payload) {
            state.information.logo = payload
        },

    },
    actions: {
        async loadInformation ({
            commit,
        }) {
            const uri = 'http://localhost:3000/api/information';
            await axios.get(uri).then((response) => {
                const value = response.data.information
                const info = {
                    id: value[0].id,
                    nom: value[0].nom,
                    raison: value[0].raison,
                    matricule: value[0].matricule,
                    registre: value[0].registre,
                    adresse: value[0].adresse,
                    tel: value[0].tel,
                    email: value[0].email,
                    logo: value[0].logo,
                    rib: value[0].rib,
                }

                commit('setInformation', info);
                console.log('Information chargée');
            }).catch((error) => {
                console.log(error);
            });
        },
        editLogo ({ commit }, payload) {
            commit('setLogoUrl', payload)
        },
        updateInformation ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/information/update/' + payload.id;
            axios.put(uri, payload).then((response) => {
                commit('setInformation', payload)
                console.log(response.data.information);


            }).catch((error) => {
                console.log(error)

            })

        },
    },
        getters: {
            getInformation (state) {
                return state.information
            }
        }
    }

