import axios from 'axios'
export default {
    state: {
        isLoggedIn: !!localStorage.getItem('token'),
        user: null,
        test:'test'
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
        }
    },
    actions: {
        login ({ commit,dispatch }, payload) {
            const uri = process.env.MIX_URI_PORT + '/api/auth/login'
            axios.post(uri, payload.loginfo).then(response => {
                // login user, store the token and redirect to dashboard
                commit('loginUser')
                localStorage.setItem('token', response.data.token)
                payload.router.push({ name: 'parametres' })
                dispatch('loggedUser')


            }).catch(error => {
                console.log(error);

            })
        },
        async loggedUser ({ commit }) {
            const uri = process.env.MIX_URI_PORT + '/api/auth/user'
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


            })
        },
        logout ({ commit }) {
            const uri = process.env.MIX_URI_PORT + '/api/auth/logout'
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
        hasRole (state,val) {
            return state.user.roles.some(item => item.name === val)


        }
    }
}
