<template>
  <div class="max" id="test-carousel-2">
    <VueSlickCarousel v-bind="setting">
      <div class="contents" @click="log(1)">1</div>
      <div class="contents" @click="log(2)">2</div>
      <div class="contents" @click="log(3)">3</div>
      <div class="contents" @click="log(4)">4</div>
    </VueSlickCarousel>
  </div>
</template>

<script>
//

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: { VueSlickCarousel },
  data() {
    return {
      // https://github.com/gs-shop/vue-slick-carousel/blob/master/docs/API.md#all-props
      setting: {
        "dots": true,
        "dotsClass": "slick-dots custom-dot-class",
        "edgeFriction": 0.35,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "autoplay": true,
        "autoplaySpeed": 4000,
        "pauseOnDotsHover": true,
        "pauseOnFocus": true,
        "pauseOnHover": true
      }
    }
  },
  methods: {
    log(index) {
      console.log(`onClick ${index}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.contents {
  width: 300px;
  height: 200px;
  text-align: center;
  cursor: pointer;
}

.max {
  border: 1px solid blue;
  max-width: 550px;
  margin-left: 30px;
}
</style>

<style lang="scss">


#test-carousel-2 {
  // 왼쪽 화살표
  .slick-prev {
    left: 2px;
    z-index: 1;
  }

  // 오른쪽 화살표
  .slick-next {
    right: 2px;
    z-index: 1;
  }

  // https://stackoverflow.com/questions/62227124/slick-slider-change-text-color-with-dots
  .slick-dots li button:before {
    color: red !important;
  }

  // dot position
  .custom-dot-class {
    bottom: 3px;
    right: 0;
    text-align: right;
  }
}
</style>
