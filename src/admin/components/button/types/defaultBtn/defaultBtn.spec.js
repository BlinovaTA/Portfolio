import defaultBtn from "./defaultBtn.vue";
import { mount } from "@vue/test-utils";

it("default button snapshot", async () => {
  const mountWrapper = mount(defaultBtn);
  expect(mountWrapper.element).toMatchSnapshot();
});