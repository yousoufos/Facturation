import { store } from '../store/'
export default (to, from, next) => {



    if (store.getters.hasRole('superadministrator')) {


        next()
    }
    else {


        next({ name: 'login' })
    }
}
