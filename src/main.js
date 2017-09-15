import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import cognitoAuth from './cognito'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueResource)
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
  cognitoAuth,
  // replace the content of <div id="app"></div> with App
  render: h => h(App)
})
