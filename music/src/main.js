// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引用css
import  '../static/public.css'
import  '../static/style.css'
import '../static/swiper.css'

// 引用swiper
import swiper from '../node_modules/vue-awesome-swiper'



import Vue from 'vue'
import App from './App'
import vueRouter from '../node_modules/vue-router'
import Appvue from './components/HelloWorld.vue'
import vueResource from '../node_modules/vue-resource'
Vue.config.productionTip = false
Vue.use(swiper);
Vue.use(vueRouter);
Vue.use(vueResource);

// 组件路由引用
import music from './components/music.vue'
import video from './components/video.vue'
import fm from './components/fm.vue'
import musics from './components/musics.vue'
import friends from './components/friend.vue'
import playmusicbg from './components/playmusicbg.vue'
import musicspage from './components/musicspage.vue'

const routes = [
  { path: '/' , component: music},
  { path: '/music', component: music},
  { path: '/video', component: video},
  { path: '/fm', component: fm},
  { path: '/musics', component: musics},
  { path: '/friends', component: friends},
  { path: '/playmusicbg', component: playmusicbg},
  { path: '/musicspage', component: musicspage}
]

const router = new vueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
