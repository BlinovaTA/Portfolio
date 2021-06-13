import Vue from "vue";
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

const thumbs = {
  props: ["works", "currentWork", "direction"],
  template: "#preview-thumbs",
  methods: {
    enterCb(el, done) {
      const list = el.closest("ul");

      el.classList.add(this.direction === "next" ? "nextOutsided" : "prevOutsided");
      list.classList.add("transition");
      list.style.transform = this.direction === "next" ? `translateY(${list.clientHeight / 3}px)`: `translateY(-${list.clientHeight / 3}px)`;

      list.addEventListener("transitionend", (e) => done());
    },
    afterCb(el) {
      const list = el.closest("ul");
      list.classList.remove("transition");
      list.style.transform = "translateY(0px)";
      el.classList.remove(this.direction === "next" ? "nextOutsided" : "prevOutsided");
    },
    leaveCb(el, done) {
      el.classList.add("fade");
      el.addEventListener("transitionend", (e) => done());
    },
  },
};

const btns = {
  props: ["disabledButtons"],
  template: "#preview-btns",
};

const display = {
  props: {
    direction: String,
    currentWork: {
      type: Object,
      default: () => ({
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
      }),
    },
    works: Array,
    currentIndex: Number,
    disabledButtons: Object,
  },
  template: "#preview-display",
  components: {
    thumbs,
    btns,
  },
  computed: {
    reversedWorks() {
      const works = [...this.works];

      return works.slice(0, 3).reverse();
    },
  },
};

const tags = {
  props: ["tags"],
  template: "#preview-tags",
};

const info = {
  props: {
    currentWork: {
      type: Object,
      default: () => ({
        title: "",
        link: "",
        description: "",
        techs: "",
        photo: {},
      }),
    },
  },
  template: "#preview-info",
  components: {
    tags,
  },
};

new Vue({
  el: "#preview-component",
  template: "#preview-container",
  components: {
    display,
    info,
  },
  data() {
    return {
      works: [],
      currentIndex: 0,
      disabledButtons: {
        next: false,
        prev: true,
      },
      direction: "next",
    };
  },
  computed: {
    currentWork() {
      return this.works[0];
    },
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForIndex(value);
    },
  },
  methods: {
    makeInfiniteLoopForIndex(index) {
      const worksCount = this.works.length - 1;

      if (index < 0) {
        this.currentIndex = worksCount;
      }

      if (index > worksCount) {
        this.currentIndex = 0;
      }
    },
    dataConversion(data) {
      return data.map((item) => {
        const requiredImage = `${config.BASE_URL}/${item.photo}`;
        item.photo = requiredImage;
        item.techs = item.techs.split(",");

        return item;
      });
    },
    slide(direction) {
      const count = this.works.length - 1;
      const lastItem = this.works[count];

      switch (direction) {
        case "next":
          this.works.push(this.works[0]);
          this.works.shift();
          this.currentIndex++;

          break;

        case "prev":
          this.works.unshift(lastItem);
          this.works.pop();
          this.currentIndex--;

          break;
      }

      this.direction = direction;

      this.disabledButtons = {
        next: this.currentIndex === count,
        prev: this.currentIndex === 0,
      };
    },
  },
  async created() {
    const { data } = await axios.get("/works/459");
    this.works = this.dataConversion(data);
  },
});
