<template>
  <div id="app">
    <div class="top_meau">
      <ul>
        <li @click="leftpages"><p class="icon-more"></p></li>
        <li><router-link to="/musics"><p class="icon-musics"></p></router-link></li>
        <li><router-link to="/music"><p class="icon-logo"></p></router-link></li>
        <li><router-link to="/friend"><p class="icon-friend"></p></router-link></li>
        <li><p class="icon-fdj"></p></li>
      </ul>
    </div>
    <div class="meau_text">
      <ul id="meau_txt">
        <li @click="active"><p class="action"><router-link to="/music">音乐</router-link></p></li>
        <li @click="active"><p><router-link to="/video">视频</router-link></p></li>
        <li @click="active"><p><router-link to="/fm">电台</router-link></p></li>
      </ul>
    </div>
    <div class="bottonplayer">
      <audio :src="playmusic.playmusicsrc" id="music"></audio>
      <div class="button_left">
        <router-link to="/playmusicbg"><img :src="playmusic.playmusicimg" width="35" height="35" id="musicImgSrc" /></router-link>
        <div class="bottom_txt">
          <p id="musicTextone">{{playmusic.playmusicname}}</p>
          <p id="musicTextTwo">{{playmusic.playmusiclyrics}}</p>
        </div>
      </div>
      <div class="right_icon">
        <p class="icon-play" @click="musicbegin" id="iconPlayIcon"></p>
        <p class="icon-gd" @click="gedan"></p>
      </div>
    </div>
    <transition name="mask"><div class="mask" v-show="mask" @click="maskfalse"></div></transition>
    <transition name="fade"><moregedan :playmusic="playmusic" v-show="songlistsinger" /></transition>
    <transition name="leftpage"><leftpage v-show="leftpage"/></transition>
    <router-view></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
import bottomplayer from './components/bottonplayer.vue'
import moregedan from './components/moremusicgd.vue'
import leftpage from './components/leftpage.vue'
export default {
  data() {
    return {
      playmusic: {
        player: [],
      },
      mask: false,
      songlistsinger: false,
      leftpage: false
    }
  },
  created() {
    this.$http.get('data.json').then(res => {
      this.playmusic = res.data.musicimg.playmusic
    })
  },
  methods: {
    leftpages() {
        this.leftpage = true;
        this.mask = true;
        document.body.style.overflow = 'hidden';
    },
    active: function(e) {
      let active = document.getElementsByClassName('action');
      for(let i = 0;i < active.length;i++) {
        active[i].className = "";
      }
      e.currentTarget.lastChild.classList.add('action');
    },
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
    gedan() {
      this.songlistsinger = true;
      this.mask = true;
    },
    maskfalse() {
      this.mask = false;
      this.leftpage = false;
      this.songlistsinger = false;
      document.body.style="";
    }
  },
  components: {
    bottomplayer,
    moregedan,
    leftpage
  }
}
</script>

<style lang="less">
.top_meau {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  ul {
    display: flex;
    font-size: 0;
    li {
      font-size: 22px;
      flex: 1;
      position: relative;
      height: 40px;
      background: #e31c1d;
      p {
        line-height: 40px;
        text-align: center;
        color:#d4d4d4;
      }
      &:first-child {
        flex-grow: 1.5;
        position: relative;
        p {
          float: left;
          margin-left: 10px;
          color: #fff;
        }
      }
      &:last-child {
        flex-grow: 1.5;
        position: relative;
        p {
          float: right;
          margin-right: 10px;
          font-weight: bold;
          color: #fff;
        }
        }
      &:nth-child(2) {
        p {
          font-weight: bold;
        }
      }
    }
  }
}
.meau_text {
  background: #fff;
  height: 30px;
  position: fixed;
  width: 100%;
  top:40px;
  z-index: 40;
  ul {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 30px;
      font-size:13px;
      color:#827a7a;
      p {
        a {
          color:#827a7a;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .action {
        width: 60%;
        margin: 0 auto;
        border-bottom: 2px solid #e31c1d;
        a {
          color:#e31c1d;
        }
      }
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: .5;
  z-index: 110;
}
.bottonplayer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 101;
  height: 50px;
  background: #fff;
  width: 100%;
  border-top: 1px solid #eee;
  opacity: 0.98;
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
.mask-enter-active, .mask-leave-active {
  transition: opacity .5s
}
.mask-enter, .mask-leave-to {
  opacity: 0
}
.fade-enter-active {
   animation: bounce-in .3s;
}
.fade-leave-active {
 animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    bottom: -340px;
  }
  100% {
    bottom: 0;
  }
}
.leftpage-enter-active {
   animation: leftpage .3s;
}
.leftpage-leave-active {
 animation: leftpage .3s reverse;
}
@keyframes leftpage {
  0% {
    left: -80%;
  }
  100% {
    left: 0;
  }
}
</style>
