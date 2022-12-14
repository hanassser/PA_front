import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//vuelidate
import Vuelidate from 'vuelidate'
// Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from '../node_modules/element-ui/lib/locale/lang/en'

import '@/assets/app.css'
import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import format from 'date-fns/format'
import '@/permission'
import relativeTime from 'dayjs/plugin/relativeTime';

// international
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

// Relative time plugin
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs

Vue.filter('date', (date) => {
  return format(new Date(date), 'yyyy-MM-dd')
})



//Plugins
Vue.use(Vuelidate)
Vue.use(Buefy)
Vue.use(ElementUI, {locale});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
