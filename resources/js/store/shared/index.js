export default{
    state:{
        loading: false,
        erreurs: null,
        savedStatut: false,

    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload
        },
        seterreurs(state,payload){
            state.erreurs = payload
        },
        clearErrors (state){
            state.erreurs = null
        },
        clearSavedStatut (state){
            state.savedStatut = false
        },
        setSavedStatut(state,payload){
            state.savedStatut = payload
        }


    },
    actions:{
        clearErrors ({commit}){
           commit('clearErrors')
        },
        clearSavedStatut ({commit}){
           commit('clearSavedStatut')
        },
    },

    getters:{
        getErrors(state){

            return state.erreurs
        },
        loading(state){
            return state.loading
        },
        erreurs(state){
            return state.erreurs
        },
        savedStatut(state){
            return state.savedStatut
        },

    }
}
