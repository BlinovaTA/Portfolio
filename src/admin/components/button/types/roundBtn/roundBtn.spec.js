import roundBtn from "./roundBtn.vue";
import { mount } from "@vue/test-utils";

it("round button snapshot", async () => {
  const mountWrapper = mount(roundBtn);
  expect(mountWrapper.element).toMatchSnapshot();
});