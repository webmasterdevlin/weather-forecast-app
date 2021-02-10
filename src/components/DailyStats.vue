<template>
  <div class="daily-stats">
    <h4 class="day-name">{{ day }}</h4>
    <div class="daily-stats-icon">
      <img
        v-if="icon"
        class="svg-icon"
        :src="require(`@/assets/icons/${icon}.svg`)"
        alt=""
      />
    </div>
    <div class="daily-temp">
      <span class="temp-max">{{ max }}ºC</span>
      <span class="temp-min">{{ min }}ºC</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "@vue/composition-api";

export default defineComponent({
  name: "DailyStats",
  props: ["data", "index"],
  setup(props) {
    const min = ref("");
    const max = ref("");
    const day = ref("Today");
    const icon = ref("01d");
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    onBeforeMount(() => {
      min.value = Math.round(props.data.temp.min).toString();
      max.value = Math.round(props.data.temp.max).toString();
      icon.value = props.data.weather ? props.data.weather[0].icon : icon.value;

      if (props.index !== 0) {
        const date = new Date(Date.now() + props.index * 24 * 60 * 60 * 1000);
        day.value = dayNames[date.getDay()];
      }
    });

    return {
      min,
      max,
      day,
      icon
    };
  }
});
</script>
