import { store } from '../store/'
export default (to, from, next) => {


    if (store.getters.isLogged) {
        console.log('youpiii');

        next()
    }
    else {
        console.log('ynoo');

        next({ name: 'login' })
    }
}
