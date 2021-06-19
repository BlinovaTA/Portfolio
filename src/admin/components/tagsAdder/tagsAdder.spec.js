import tagsAdder from "./tagsAdder.vue";
import { mount } from "@vue/test-utils";

let wrapper;

beforeEach(() => {
  wrapper = mount(tagsAdder);
});

afterEach(() => {
  wrapper.destroy();
});

describe("tags adder tests", () => {
  it("tags adder snapshot", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("tags string to array", async () => {
    await wrapper.setProps({
      tags: "tag1,tag2,tag3",
    });

    const tags = wrapper.findAll("li");

    expect(tags.length).toBe(3);
  });
});
