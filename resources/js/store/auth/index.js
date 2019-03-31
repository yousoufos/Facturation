import axios from 'axios'
export default {
    state: {
        isLoggedIn: !!localStorage.getItem('token'),
        user:null
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
        loggedUser ({ commit }) {
            const uri = process.env.MIX_URI_PORT + '/api/auth/user'
            axios.get(uri, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                let user = {
                    id: response.data.data.id,
                    name: response.data.data.name,
                    email: response.data.data.email
                }
                console.log(user);

                commit('setUser',user)


            }).catch(error => {
                console.log(error);

            })
        }

    },
    getters: {
        isLogged (state) {
            return state.isLoggedIn
        },
        getLoggedUser (state) {
            return state.user
        }
    }
}
