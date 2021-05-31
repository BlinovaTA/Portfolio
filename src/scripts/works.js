import Vue from "vue";

const thumbs = {
  props: [
    "works",
    "currentWork"
  ],
  template: "#preview-thumbs"
};

const btns = {
  props: [
    "disabledButtons"
  ],
  template: "#preview-btns"
};

const display = {
  props: [
    "currentWork",
    "works",
    "currentIndex",
    "disabledButtons"
  ],
  template: "#preview-display",
  components: {
    thumbs,
    btns
  },
  computed: {
    reversedWorks() {
      const works = [...this.works];

      return works.slice(0, 3).reverse();
    }
  }
};

const tags = {
  props: ["tags"],
  template: "#preview-tags"
};

const info = {
  props: ["currentWork"],
  template: "#preview-info",
  components: {
    tags
  }
};

new Vue({
  el: "#preview-component",
  template: "#preview-container",
  components: {
    display,
    info
  },
  data() {
    return {
      works: [],
      currentIndex: 0,
      disabledButtons: {
        next: false,
        prev: true
      }      
    }
  },
  computed: {
    currentWork() {
      return this.works[0];
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForIndex(value);
    }
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
    requireImagesToArray(data) {
      return data.map(item => {
        const requiredImage = require(`../images/content/${item.photo}`).default;
        item.photo = requiredImage;

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

      this.disabledButtons = {
        next: this.currentIndex === count,
        prev: this.currentIndex === 0
      };
    }
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.requireImagesToArray(data);
  }
});