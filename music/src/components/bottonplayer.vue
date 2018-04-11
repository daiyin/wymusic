<template>
<div class="bottonplayer">
  <audio :src="playmusic.playmusicsrc" id="music"></audio>
  <div class="button_left">
    <img :src="playmusic.playmusicimg" width="35" height="35" @click="playbg" id="musicImgSrc"/>
    <div class="bottom_txt">
      <p id="musicTextone">{{playmusic.playmusicname}}</p>
      <p id="musicTextTwo">{{playmusic.playmusiclyrics}}</p>
    </div>
  </div>
  <div class="right_icon">
    <p class="icon-play" @click="musicbegin"></p>
    <p class="icon-gd" @click="gedan"></p>
  </div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
  props: {
    playmusic: {
      type: Object
    },
    songlistsinger: {
      type: Boolean
    }
  },
  created() {
  },
  methods: {

    musicbegin(e) {
      let musicplay = document.getElementById("music");
      // 播放
      if(e.currentTarget.classList == "icon-play") {
        e.currentTarget.classList.remove("icon-play")
        e.currentTarget.classList.add("icon-zhanting");
        musicplay.play() // 播放

      }
      else if(e.currentTarget.classList == "icon-zhanting") {
        e.currentTarget.classList.add("icon-play")
        e.currentTarget.classList.remove("icon-zhanting");
        musicplay.pause(); // 暂停
      }
    },
    playbg() {
        alert(1);
    },
    gedan() {
      this.songlistsinger = true;
    }
  },
  components: {
  }
}
</script>
<style lang="less">
.bottonplayer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  background: #fff;
  width: 100%;
  border-top: 1px solid #eee;
  opacity: 0.98;
  z-index: 100;
  .button_left {
    position: absolute;
    top: 50%;
    left: 8%;
    height: 35px;
    transform: translate(-50%,-50%);
    img {
      vertical-align: top;
    }
    .bottom_txt {
      display: inline-block;
      p {
        margin-left: 5px;
        &:first-child {
          font-size: 12px;
          position: absolute;
          top: 0;
          width: 100px;
        }
        &:last-child {
          font-size: 10px;
          color:#a5a5a5;
          vertical-align: bottom;
          position: absolute;
          bottom: 0;
          width: 100px;
        }
      }
    }
  }
  .right_icon {
    float: right;
    p {
      display: inline-block;
      line-height: 50px;
      font-size: 20px;
      color: #656565;
      &:first-child {
        margin-right: 10px;
        font-weight: bold;
      }
      &:last-child {
        margin-right: 5px;
      }
    }
  }
}
</style>
