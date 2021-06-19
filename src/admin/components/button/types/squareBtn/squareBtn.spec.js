import squareBtn from "./squareBtn.vue";
import { mount } from "@vue/test-utils";

it("square button snapshot", async () => {
  const mountWrapper = mount(squareBtn);
  expect(mountWrapper.element).toMatchSnapshot();
});