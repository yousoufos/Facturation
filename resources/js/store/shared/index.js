export default{
    state:{
        loading: false,
        errors: false,
        youssef: null,

    },
    mutations:{
        setLoading(state,payload){
            state.loading = payload
        },
        setyoussef(state,payload){
            state.youssef = payload
        },
        setErrors(state,payload){
            state.errors = payload


        },
        clearErrors (state){
            state.errors = null
        }
    },
    actions:{
        clearErrors ({commit}){
           commit('clearErrors')
        },
    },

    getters:{
        getErrors(state){

            return state.errors
        },
        loading(state){
            return state.loading
        },
        youssef(state){
            return state.youssef
        },

    }
}
