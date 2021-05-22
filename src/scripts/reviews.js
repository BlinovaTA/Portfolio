import Vue from "vue";
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

new Vue({
  el: "#slider-component",
  template: "#slider-container",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 2
      }
    }
  },
  methods: {
    requireImagesToArray(data) {
      return data.map(item => {
        const requiredImage = require(`../images/content/${item.photo}`).default;
        item.photo = requiredImage;

        return item;
      });
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper;

      switch (direction) {
        case "next":
          slider.slideNext();

          break;

        case "prev":
          slider.slidePrev();

          break;
      }
    },
    getSlidesPerView() {
      if (window.matchMedia("(max-width: 480px)").matches) {
        return 1;
      } else {
        return 2;
      }
    }
  },
  created() {
    const data = require("../data/reviews.json");
    this.reviews = this.requireImagesToArray(data);
    this.sliderOptions.slidesPerView = this.getSlidesPerView();
  }
})