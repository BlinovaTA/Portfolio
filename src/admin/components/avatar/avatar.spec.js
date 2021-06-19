import avatar from "./index";
import { mount } from "@vue/test-utils";

it("avatar snapshot", async () => {
  const mountWrapper = mount(avatar);
  expect(mountWrapper.element).toMatchSnapshot();
});