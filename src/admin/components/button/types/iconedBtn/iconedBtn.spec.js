import iconedBtn from "./iconedBtn.vue";
import { mount } from "@vue/test-utils";

it("iconed button snapshot", async () => {
  const mountWrapper = mount(iconedBtn);
  expect(mountWrapper.element).toMatchSnapshot();
});