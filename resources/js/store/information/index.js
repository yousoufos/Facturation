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
            const uri   = process.env.MIX_URI_PORT +'/api/information';
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
            commit('setLoadingTable', true)
            const uri   = process.env.MIX_URI_PORT +'/api/information/update/' + payload.id;
            axios.put(uri, payload).then((response) => {
                let info = {
                    id: response.data.information.id,
                    nom: response.data.information.nom,
                    raison: response.data.information.raison,
                    matricule: response.data.information.matricule,
                    registre: response.data.information.registre,
                    adresse: response.data.information.adresse,
                    tel: response.data.information.tel,
                    email: response.data.information.email,
                    logo: response.data.information.logo,
                    rib: response.data.information.rib,

                }
                commit('setInformation', info)
                console.log(response.data.information);
                commit('setLoadingTable', false)


            }).catch((error) => {
                console.log(error)
                commit('setLoadingTable', false)

            })

        },
    },
        getters: {
            getInformation (state) {
                return state.information
            }
        }
    }

