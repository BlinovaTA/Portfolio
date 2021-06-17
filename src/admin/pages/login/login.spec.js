import login from "./index";
import { shallowMount, mount } from "@vue/test-utils";
import { afterEach } from "jest-circus";

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(login);
});

afterEach(() => {
  wrapper.destroy();
});

describe("Login tests", () => {
  it("there is a send button", () => {
    const buttonSubmit = wrapper.find("button");
    expect(buttonSubmit).toBeDefined();
  });

  it("there is a login field", () => {
    const textInputLogin = wrapper.find('input[type="text"]');
    expect(textInputLogin).toBeDefined();
  });

  it("there is a password field", () => {
    const textInputPassword = wrapper.find('input[type="password"]');
    expect(textInputPassword).toBeDefined();
  });

  it("login snapshot", async () => {
    const mountWrapper = mount(login);

    expect(mountWrapper.element).toMatchSnapshot();
  });
});
