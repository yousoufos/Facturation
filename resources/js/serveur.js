
window.Vue = require('vue');
window.Slug = require('slug');
Slug.defaults.mode = 'rfc3986';
window.Vue = Vue;
import Buefy from 'buefy';
Vue.use(Buefy);

Vue.component('slugWidget', require('./components/slugWidget.vue'));
// const app = new Vue({
//     el: '#app',
// })
