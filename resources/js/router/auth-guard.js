import { store } from '../store/'
export default (to, from, next) => {


    if (store.getters.isLogged) {


        next()
    }
    else {


        next({ name: 'login' })
    }
}
