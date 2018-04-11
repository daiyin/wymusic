<template>
<div class="music">
  <Banner />
  <div class="music_icon">
    <ul>
      <li><p class="icon-fm"></p><span>私人FM</span></li>
      <li><p class="icon-dt"></p><span>每日推荐</span></li>
      <li><p class="icon-iconfont-gedan"></p><span>歌单</span></li>
      <li><p class="icon-paihangbang"></p><span>排行榜</span></li>
    </ul>
  </div>
  <div class="recommend_music">
    <div class="too_title">
      <p>推荐歌单</p><p class="arrow_icon"></p><i></i>
      <ul>
        <li v-for="item in tuijian.tuijianbg">
          <img :src="item.music_1" width="100%"/>
          <p>{{item.text}}</p>
          <span class="icon-ej erji"></span>
          <span>{{item.company}}万</span>
        </li>
      </ul>
    </div>

    <div class="too_title">
      <p>独家放送</p><p class="arrow_icon"></p><i></i>
      <ul>
        <li v-for="item in tuijian.newMusic">
          <img :src="item.music_1" width="100%"/>
          <p>{{item.text}}</p>
          <div class="icon-ej erji"></div>
          <span>{{item.company}}万</span>
        </li>
      </ul>
    </div>

  </div>
  <div class="lookvideo">
    <p>调整栏目顺序</p>
    <p>看视频，发现更多有趣内容</p>
  </div>
</div>
</template>

<script  type="text/ecmascript-6">
import Banner from './banner.vue'
export default {
  data() {
    return {
      tuijian: {}
    }
  },
  created() {
    this.$http.get('data.json').then(res => {
      this.tuijian = res.data.musicimg;
    })
  },
  methods: {

  },
  components: {
    Banner
  }
}
</script>
<style lang="less">
.music {
  margin-top: 3px;
  .music_img {
    img {
      width: 100%;
    }
  }
  .music_icon {
    margin-top: 15px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        height: 50px;
        p {
          line-height: 40px;
          font-size: 25px;
          color: #e31c1d;
          border-radius: 50%;
          width:40px;
          height: 40px;
          margin: 0 auto;
          border: 1px solid #e31c1d;
        }
        span {
          margin-top: 5px;
          display: block;
          font-size: 12px;
          color:#666;
        }
      }
    }
  }
  .recommend_music {
    .too_title {
      padding: 10px 0;
      position: relative;
      margin-top: 15px;
      i {
        display: block;
        border-left: 2px solid red;
        height: 18px;
        position: absolute;
        top: 12px;
        left: 0;
      }
      p {
        font-size: 15px;
        color: #666;
        display: inline-block;
        &:first-child {
          margin-left: 13px;
        }
      }
      .arrow_icon {
        background: url('../assets/arrow_icon.png') no-repeat;
        width: 12px;
        height: 12px;
        background-size: 100%;
        background-position: center;
        transform: rotate(-90deg);
        margin-left: 5px;
      }
      ul  {
        li {
          width: 32%;
          max-width: 32%;
          position: relative;
          display: inline-block;
          vertical-align:top;
          margin-left: 1%;
          margin-top: 10px;
          .erji {
            position: absolute;
            top: 1px;
            right: 28px;
            font-size: 16px;
            font-weight: bold;
          }
          p {
            font-size: 10px;
          }
          span {
            font-size: 10px;
            color: #fff;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
  .lookvideo {
    font-size: 20px;
    height: 150px;
    position: relative;
    text-align: center;
    // line-height: 100px;
    color:#666;
    font-size: 12px;
    overflow: hidden;
    p {
      &:first-child {
        width: 100px;
        margin: 25px auto 10px;
        border: 1px solid #e31c1d;
        border-radius: 25px;
        color: #e31c1d;
        padding: 3px 0;
      }
    }
    &:after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      border-top: 1px solid #eee;
      transform: scaleY(.5);
    }
  }
}

</style>
