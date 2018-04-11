<template>
<div class="banner">
  <swiper :options="swiperOption" ref="mySwiper" class="music_img">
    <!-- slides -->
    <swiper-slide v-for="item in music_img.supports"><img :src="item.music_1" /></swiper-slide>
  </swiper>
  <div class="swiper-pagination"></div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
  data() {
    return {
      swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: true,
          direction : 'horizontal',
          // loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true
          },
          speed:200,
          clickable :true,
        },

      music_img : {},
      newmusic: {}
    }
  },
  created() {
    this.$http.get('data.json').then(res => {
      this.music_img = res.data.musicimg;
    })
  },
  methods: {

  },
  components: {

  }
}
</script>
<style lang="less">
.banner {
  position: relative;
  overflow: hidden;
  margin-top: 72px;
  .music_img {
    img {
      width: 100%;
    }
  }
}
</style>
