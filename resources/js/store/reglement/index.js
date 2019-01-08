import axios from 'axios';

export default {
	state: {
		loadReglements:[]
	},
    mutations: {
        setLoadedReglements (state, payload) {
            state.loadReglements = payload
        },
        addNewReglement (state, payload) {
            state.loadReglements.push(payload)
        },
        removeLigneReglement (state, payload) {
            const index = state.loadReglements.indexOf(payload)
            state.loadReglements.splice(index, 1)
        }

	},
	actions: {
		async loadReglements ({commit}) {
			const uri = 'http://localhost:3000/api/facture/reglementfacture';
			//commit('setLoading', true);
            await axios.get(uri).then((response) => {
                const reglement = [];
                const obj = response.data;
                Object.keys(obj).forEach((key) => {
                    const value = obj[key];
                    reglement.push({
                        id: value.id,
                        date_reglement: value.date_reglement,
                        facture_id: value.facture_id,
                        mode_reglement: value.mode_reglement,
                        montant: value.montant
                    });
                });
                commit('setLoadedReglements', reglement);
                console.log('Reglements chargés');
                //commit('setLoading', false);
            }).catch((error) => {
                //commit('setLoading', false);
                console.log(error);
            });
        },
        saveReglement ({ commit }, payload) {
            const uri = 'http://localhost:3000/api/facture/reglementfacture/add'
            commit('setLoadingReglement', true)
            axios.post(uri, payload)
                .then(response => {
                    const reglement = response.data.reglement;
                    let reg = {
                        id: reglement.id,
                        montant: reglement.montant,
                        mode_reglement: reglement.mode_reglement,
                        date_reglement: reglement.date_reglement,
                        facture_id: reglement.facture_id

                    }
                    commit('addNewReglement', reg)
                    commit('setLoadingReglement',false)
                }).catch(error => {
                    commit('setLoadingReglement', false)
                    //commit('seterreurs', error.response.data.errors)
                    console.log(error);
                })

        },
        deleteReglement ({ commit }, payload) {
            commit('setLoadingReglement', true)
            const uri = 'http://localhost:3000/api/facture/reglementfacture/delete/'+payload.id
            axios.delete(uri).then(response => {
                commit('removeLigneReglement',payload.index)
                console.log(response);
                commit('setLoadingReglement', false)

            }).catch(error => {
                commit('setLoadingReglement', false)
                console.log(error);

            })
        },
	},
	getters: {
        getReglementFactureById: (state) => (id) => {
            return state.loadReglements.filter(item => item.facture_id === id)

        },
	}
}
