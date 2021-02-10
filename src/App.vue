<template>
  <div class="weather-app-root">
    <template v-if="icon === '50d' || icon === '50n'">
      <!-- To see the rain effect, disable above, enable below -->
      <!-- <template> -->
      <div class="rain front-row"></div>
      <!-- https://codepen.io/arickle/pen/XKjMZY -->
      <div class="rain back-row"></div>
    </template>
    <span v-if="loading">The weather forecast is loading.. Please wait..</span>
    <div v-else-if="!allowLocation" class="location-not-allowed">
      <span>Location access denied, unable to fetch weather data.</span>
    </div>
    <div v-else class="weather-app">
      <header>
        <div class="header-icon-wrap">
          <img
            class="svg-icon"
            :src="require(`@/assets/icons/${icon}.svg`)"
            alt=""
          />
        </div>
        <div class="header-content-wrap">
          <h3 class="header-location">{{ city }}</h3>
          <h4 class="header-temp">{{ temp }}ºC</h4>
          <p>Humidity: {{ hmd }}%</p>
          <p>UVI: {{ uvi }}</p>
          <p>Wind: {{ wind }} metre/sec</p>
        </div>
      </header>
      <div class="weather-app-body">
        <template v-for="(data, index) in daily">
          <DailyStats
            v-if="index < 6"
            :key="index"
            :index="index"
            :data="data"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/composition-api";
import DailyStats from "./components/DailyStats.vue";
import { GeolocationPosition } from "./types";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    DailyStats,
  },
  setup() {
    const loading = ref(true);
    const allowLocation = ref(true);
    const city = ref("");
    const temp = ref("");
    const hmd = ref("");
    const uvi = ref("");
    const wind = ref("");
    const icon = ref("01d");
    const daily = ref([]);

    /**
     * Functions/Methods
     */

    // eslint-disable-next-line
    function setWeatherData(data: any) {
      city.value = data.timezone;
      temp.value = data.current.temp;
      hmd.value = data.current.humidity;
      uvi.value = data.current.uvi;
      wind.value = data.current.wind_speed;
      icon.value = data.current.weather[0].icon || icon.value;
      loading.value = false;
    }

    function showPosition(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      axios
        .get(`onecall`, {
          params: {
            lat: latitude,
            lon: longitude,
            exclude: "minutely,hourly,alerts",
            units: "metric",
          },
        })
        .then((response) => {
          setWeatherData(response.data);
          daily.value = response.data.daily;
        });
    }

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, () => {
          allowLocation.value = false;
          loading.value = false;
        });
      } else {
        allowLocation.value = false;
        loading.value = false;
      }
    }

    function makeItRain() {
      document.querySelectorAll(".empty").forEach((elem) => {
        elem.innerHTML = "";
      });

      let increment = 0;
      let drops = "";
      let backDrops = "";

      while (increment < 100) {
        const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        increment += randoFiver;
        drops +=
          '<div class="drop" style="left: ' +
          increment +
          "%; bottom: " +
          (randoFiver + randoFiver - 1 + 100) +
          "%; animation-delay: 0." +
          randoHundo +
          "s; animation-duration: 0.5" +
          randoHundo +
          's;"><div class="stem" style="animation-delay: 0.' +
          randoHundo +
          "s; animation-duration: 0.5" +
          randoHundo +
          's;"></div><div class="splat" style="animation-delay: 0.' +
          randoHundo +
          "s; animation-duration: 0.5" +
          randoHundo +
          's;"></div></div>';
        backDrops +=
          '<div class="drop" style="right: ' +
          increment +
          "%; bottom: " +
          (randoFiver + randoFiver - 1 + 100) +
          "%; animation-delay: 0." +
          randoHundo +
          "s; animation-duration: 0.5" +
          randoHundo +
          's;"><div class="stem" style="animation-delay: 0.' +
          randoHundo +
          "s; animation-duration: 0.5" +
          randoHundo +
          's;"></div><div class="splat" style="animation-delay: 0.' +
          randoHundo +
          "s; animation-duration: 0.5" +
          randoHundo +
          's;"></div></div>';
      }

      const fr: HTMLDivElement | null = document.querySelector(
        ".rain.front-row"
      );
      const br: HTMLDivElement | null = document.querySelector(
        ".rain.back-row"
      );

      if (fr) {
        fr.innerHTML = drops;
      }

      if (br) {
        br.innerHTML = backDrops;
      }
    }

    /**
     * Lifecycle Hooks
     */

    onMounted(() => {
      getLocation();
      makeItRain();
    });

    //

    return {
      city,
      temp,
      hmd,
      uvi,
      wind,
      daily,
      icon,
      loading,
      allowLocation,
      getLocation,
    };
  },
});
</script>
