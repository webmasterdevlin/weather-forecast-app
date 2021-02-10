import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import "./styles/app.scss";
import "./styles/rain.scss";

const API = process.env.VUE_APP_OPEN_WEATHER_API;

if (!API) {
  throw new Error(
    "API not found, edit .env file and set `VUE_APP_OPEN_WEATHER_API=__YOUR_API_KEY__`"
  );
}

axios.defaults.params = {};
axios.defaults.params.appid = process.env.VUE_APP_OPEN_WEATHER_API;
axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/";

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  render: h => h(App)
}).$mount("#app");
