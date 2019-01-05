import axios from 'axios';

export default {
	state: {
		loadedRegelments:[]
	},
    mutations: {
        setLoadedReglements (state, payload) {
            state.loadedRegelments = payload
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
		}
	},
	getters: {
        getReglementFactureById: (state) => (id) => {
            return state.loadedRegelments.filter(item => item.facture_id === id)

        },
	}
}
