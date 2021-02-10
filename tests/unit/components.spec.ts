import DailyStats from "@/components/DailyStats.vue";
import CompositionApi from "@vue/composition-api";
import { shallowMount } from "@vue/test-utils";
import Vue from "vue";

Vue.use(CompositionApi);

describe("DailyStats.vue", () => {
  it("renders props.data when passed", () => {
    const data = {
      temp: {
        min: 15,
        max: 29
      }
    };

    const wrapper = shallowMount(DailyStats, {
      propsData: { data, index: 0 }
    });

    expect(wrapper.text()).toMatch("Today");
    expect(wrapper.text()).toMatch("15ºC");
    expect(wrapper.text()).toMatch("29ºC");
  });
});
