import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from "axios";
import config from "../../env.paths.json";

axios.defaults.baseURL = config.BASE_URL;

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
      disabledNext: false,
      disabledPrev: true,
      sliderOptions: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        breakpoints: {
          481: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          }
        }
      }
    }
  },
  methods: {
    requireImagesToArray(data) {
      return data.map(item => {
        const requiredImage = `${config.BASE_URL}/${item.photo}`;
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
    checkArrows(e) {
      this.disabledNext = this.$refs.slider.$swiper.activeIndex === this.$refs.slider.$swiper.slides.length - this.$refs.slider.$swiper.params.slidesPerView;
      this.disabledPrev = this.$refs.slider.$swiper.activeIndex === 0;
    }
  },
  async created() {
    const { data } = await axios.get("/reviews/459");
    this.reviews = this.requireImagesToArray(data);
  },
  mounted() {
    const context = this;

    this.$refs.slider.$swiper.on("slideChange", function (swiper) {
      context.disabledNext = swiper.activeIndex === swiper.slides.length - swiper.params.slidesPerView;
      context.disabledPrev = swiper.activeIndex === 0;
    })
  }
})