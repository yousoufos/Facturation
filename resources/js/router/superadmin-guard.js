import { store } from '../store/'
export default (to, from, next) => {



    if (_.find(store.getters.getLoggedUser.roles, function(o){ return o.name == 'superadministrator' })) {


        next()
    }
    else {


        next({ name: 'login' })
    }
}
