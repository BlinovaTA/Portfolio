import works from "./works.vue";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

it("add new", async () => {
  const store = new Vuex.Store({
    modules: {
      works: {
        namespaced: true,
        state: {
          data: [],
        },
      },
    },
    actions: {
      "works/fetch": jest.fn(),
      "tooltips/show": jest.fn(),
    }
  });

  const wrapper = mount(works, { store, localVue });

  wrapper.setMethods({ addNew: jest.fn() });

  await wrapper.find("#add-new").trigger("click");

  expect(wrapper.find("work-form").exists()).toBe(true);
});
