import card from "./card.vue";
import { mount } from "@vue/test-utils";

let wrapper;

beforeEach(() => {
  wrapper = mount(card);
});

afterEach(() => {
  wrapper.destroy();
});

describe("Card tests", () => {
  it("card snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("card with title snapshot", async () => {
    await wrapper.setProps({
      title: "title"
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it("card simple view snapshot", async () => {
    await wrapper.setProps({
      simple: true
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
