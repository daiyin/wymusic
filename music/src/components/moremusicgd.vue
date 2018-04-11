<template>
<div class="moremusic">
  <div class="music_top_title">
    <b class="scale"></b>
    <div class="top_left">
      <p class="icon-xunhuan"></p>
      <p>列表循环<span id="listlength">()</span></p>
    </div>
    <div class="top_right">
      <p class="icon-scj"></p>
      <p>收藏全部</p>
      <p class="icon-sc"></p>
    </div>
    <ul class="songlist">
      <li style="display:none"><audio :src="musicsrc" ref="audio_music" autoplay="autoplay" id="audio_music"></audio></li>

      <li
          v-for="(item, index) in playmusic.player"
          @click="songerlist(index, item.musicsrc)"
          class="colorlist"
          :class="isActiveLi===index ? 'active_color icon-lb' : ''" >
          <p>
            <span class="lb"></span>
            <span class="songname">{{item.playname}}</span> - <span class="singer">{{item.singer}}</span>
          </p>
          <span class="right_sc">	&times;</span>
      </li>

    </ul>
  </div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
  props: {
    playmusic: {
      type: Object
    },
  },
  data: function() {
    return {
        isActiveLi: null,
        musicsrc: null,
        autoplay: null,
    };
  },
  created() {
  },
  beforeUpdate() {
    this.ListlengthDom.innerHTML = '('+this.playmusic.player.length+')';
    this.musicsrc || (this.musicsrc = '');
  },
  mounted() {
    this.ListlengthDom = document.getElementById('listlength');
  },
  methods: {
    songerlist(index, musicsrc) {
        this.$refs.audio_music.play();
        this.isActiveLi = index;
        this.musicsrc = musicsrc;
    },
  }
}
</script>
<style lang="less">
.moremusic {
  background: #fff;
  height: 340px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  overflow-y: scroll;
  .music_top_title {
    height: 45px;
    font-size: 12px;
    line-height: 45px;
    color: #333;
    position: relative;
    .scale {
      border-bottom: 1px solid #eee;
      position: absolute;
      bottom: -10px;
      top: 0;
      left: 0;
      right: 0;
      transform: scaleY(.5);
    }
    .top_left {
      display: inline-block;
      padding-left: 10px;
      p {
        display: inline-block;
        margin-right: 5px;
      }
    }
    .top_right {
      display: inline-block;
      float: right;
      padding-right: 10px;
      p {
        display: inline-block;
        margin-left: 5px;
        &:last-child {
          margin-left: 20px;
          border-left: 1px solid #eee;
          padding-left: 10px;
          position: relative;
          z-index: 10;
        }
      }
    }
    .songlist {
      margin-left: 10px;
      overflow-y:scroll;
      .lb {
        margin-right: 5px;
        font-size: 14px;
      }
      .active_color {
        color: #e31c1d;
      }
      li {
        height: 40px;
        line-height: 40px;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          bottom: 0px;
          left: 0px;
          right: 0px;
          border-top: 1px solid #eee;
          transform: scaleY(.5);
        }
        p {
          display: inline-block;
        }
        .right_sc {
          float: right;
          margin-right: 10px;
          color:#bbb8b8;
        }
      }
      .songname {
        font-size: 13px;
      }
      .singer {
        font-size: 10px;
      }
    }
  }
}
</style>
