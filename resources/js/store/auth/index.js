import axios from 'axios'
export default {
    state: {
        isLoggedIn: false ,// !!localStorage.getItem('token'),
        user: null,
        wait:false
    },
    mutations: {
        loginUser (state) {
            state.isLoggedIn = true
        },
        logoutUser (state) {
            state.isLoggedIn = false
        },
        setUser (state,payload) {
            state.user = payload
        },
        setWait (state, payload) {
            state.wait =payload
        }
    },
    actions: {
        async login ({ commit, dispatch,state }, payload) {
            commit('setLoading', true);
            const uri = process.env.MIX_URI_PORT + '/api/auth/login'
            await axios.post(uri, payload.loginfo).then(response => {
                // login user, store the token and redirect to dashboard
                commit('loginUser')
                localStorage.setItem('token', response.data.token)
                dispatch('loggedUser').then(() => {
                    dispatch('chargerFacture').then(()=>{
                        payload.router.push({ name: 'home' })
                    })

                })


                commit('setLoading', false);



            }).catch(error => {
                console.log(error);

            })
        },
        async loggedUser ({ commit }) {

            const uri = process.env.MIX_URI_PORT + '/api/user'
            await axios.get(uri, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                let user = {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    roles: response.data.roles,
                    permissions: response.data.permissions
                }
                commit('setUser', user)



            }).catch(error => {
                console.log(error);
                commit('logoutUser')



            })
        },
        logout ({ commit }) {
            const uri = process.env.MIX_URI_PORT + '/api/logout'
            axios.get(uri, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                console.log(response.data);
                localStorage.removeItem('token')
                commit("logoutUser")


            }).catch(error => {
                console.log(error);

            })
        },

    },
    getters: {
        isLogged (state) {
            return state.isLoggedIn
        },
        getLoggedUser (state) {
            return state.user
        },
        hasRole (state)
        {
            _.find(state.user.roles,function(o){return o.name=='superadministrator'})
        }
    }
}
