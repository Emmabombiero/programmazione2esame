import Vue from 'vue'
import App from './App.vue'
import VueMaterial from "vue-material";
import VueRouter from "vue-router";
import VueGoogleCharts from 'vue-google-charts'
import DataService from "./dataservice";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

import Login from "./pages/Login";
import Preferiti from "./pages/Preferiti";
import Libri from "./pages/Libri";
import Film from "./pages/Film";
import Home from "./pages/Home";
import dettaglioLibri from "./pages/dettaglioLibri";
import dettaglioFilm from "./pages/dettaglioFilm";

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(VueGoogleCharts);

Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
    { name: "Login", path: "/login", component: Login},
    { name: "Preferiti", path: "/preferiti", component: Preferiti },
    { name: "Libri", path: "/libri", component: Libri },
    { name: "Film", path: "/film", component: Film },
    { name: "Home", path: "/home", component: Home },
    { name: "dettaglioLibri", path: "/dettaglioLibri/:titolo", component: dettaglioLibri },
    { name: "dettaglioFilm", path: "/dettaglioFilm/:titolo", component: dettaglioFilm },
    { path: "/", redirect: "/home" }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !DataService.isAuthenticated()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')