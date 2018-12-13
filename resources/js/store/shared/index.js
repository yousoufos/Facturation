export default{
    state:{
        loading: false,
        authError: null,
        
    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload
        },
        setError(state,payload){
            state.authError = payload
        },
        clearError (state){
            state.authError = null
        }
    },
    actions:{        
        clearError ({commit}){
           commit('clearError')
        },
    },

    getters:{
        authError(state){
            return state.authError
        },
        loading(state){
            return state.loading
        },
     
    }   
}