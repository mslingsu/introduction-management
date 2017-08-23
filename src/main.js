// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false
Vue.use(VueMaterial)

Vue.material.registerTheme('default', {
  primary: {
    color: 'grey',
    hue: 200,
    textColor: 'black' // text will be black
  },
  accent: {
    color: 'blue',
    hue: 600,
    textColor: 'white' // text will be white
  },
  warn: {
    color: 'red',
    hue: 200,
    textColor: 'white'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
