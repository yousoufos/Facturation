import { store } from '../store/'
export default (to, from, next) => {



    if (store.getters.getLoggedUser.roles.some(item => item.name === 'superadministrator')) {


        next()
    }
    else {


        next({ name: 'login' })
    }
}
