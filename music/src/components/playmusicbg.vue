<template>
<div class="playbg">
    <div class="top_title">
        <p class="icon-htjt"><a href="javascript:history.go(-1);" class="houtuijs"></a></p>
        <p><span ref="geming">{{playmusicbg.playmusicname}}</span><br /><span ref="geshou">{{playmusicbg.playmusiclyrics}}</span></p>
        <p class="icon-fx"></p>
    </div>
    <div class="playbg_img">
        <i class="musicbegin_img" :class="{rotatez:isRotate}"></i>
        <div class="playbox">
            <img :src="playmusicbgImg" width="100%" height="100%" style="border-radius:50%" ref="musicbgImg" id="musicbgImg"/>
        </div>
    </div>
    <div class="play_bottom">
        <div class="play_bottom_icon">
            <p class="icon-shoucang" @click="collection" :class="{colored: isColor}" ref="coloriocn"></p>
            <p class="icon-xz"></p>
            <p class="icon-pl"></p>
            <p class="icon-shudian"></p>
        </div>
    </div>
    <div class="playbgTime">
        <span>00:00</span>
        <span ref="spanlength"><i class="playbeginTime" ref="playbeginTime"></i></span>
        <span>00:00</span>
    </div>
    <div class="playbgbottomIcon">
        <span class="icon-xunhuan" @click="xunhuan" ref="loopmusic"></span>
        <span class="icon-syq" @click="upperMusic"></span>
        <span class="icon-play" ref="icon_playmusic" @click="iconPlay"></span>
        <span class="icon-xyq" @click="nextMusic"></span>
        <span class="icon-gd" @click="playbggd"></span>
    </div>
    <transition name="fade">
        <div class="moremusic" v-show="SongerList">
          <div class="music_top_title">
            <b class="scale"></b>
            <div class="top_left">
              <p class="icon-xunhuan"></p>
              <p>列表循环<span id="listlength">()</span></p>
            </div>
            <div class="top_right">
              <p class="icon-scj"></p>
              <p>收藏全部</p>
              <p class="icon-sc" @click="removeList"></p>
            </div>
            <div style="display: none;">
                <audio :src="musicsrc" ref="audio_music" autoplay="autoplay" id="audio_music"></audio>
            </div>
            <ul class="songlist" ref="aaa" v-if="whetherRemove">
              <li
                  v-for="(item, index) in playmusicbg.player"
                  :class="isActivecolor === index ? 'active_color icon-lb': ''"
                  @click="activeLicolor(index,item.musicsrc,item.musicimages,item.singer,item.playname)"
                  class="playcolorlist"
                  ref="playcolorlist"
                  >
                  <p>
                    <span class="lb"></span>
                    <span class="songname">{{item.playname}}</span> - <span class="singer">{{item.singer}}</span>
                  </p>
                  <span class="right_sc">	&times;</span>
              </li>

            </ul>
          </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="allRemove" v-show="allRemove">
            <p>确定要清空播放列表？</p>
            <span @click="RemoveLisrMusic">清空</span>
            <span @click="cancelRemove">取消</span>
        </div>
    </transition>
    <div class="playbgmask" v-show="playmask" @click="playmaskfalse" :class="{playmaskZindex:playmaskZindexs}"></div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
    data() {
        return {
            playmusicbg: {},
            isRotate: true,
            isColor: false,
            Time: 0,
            playmosiclist: false,
            playmask: false,
            isActive: false,
            SongerList: false,
            isActivecolor: null,
            musicsrc: null,
            playmusicbgImg: 'src/assets/xiaoao.jpeg',
            isFirst: true,
            playmaskZindexs: false,
            allRemove: false,
            whetherRemove : true
        }
    },
    created() {
        this.$http.get('data.json').then(res => {
            this.playmusicbg = res.data.musicimg.playmusic;
        });

    },
    beforeUpdate() {
    },
    methods: {
        // IMG旋转
        rotateDeg() {
            clearInterval(setINTER);
            let setINTER = setInterval(function() {
                this.Time++
                let a = 'rotate('+this.Time+'deg'+')';
                this.$refs.musicbgImg.style.transform = a;
                if(this.Time == 360) {
                    this.Time = 0
                }else if(this.$refs.icon_playmusic.className == 'icon-play') {
                    clearInterval(setINTER);
                }
            }.bind(this),50);
        },
        // 播放按钮
        iconPlay() {
            // 播放
            if(this.$refs.icon_playmusic.className == 'icon-play') {
                this.$refs.icon_playmusic.className = 'icon-zhanting';
                this.isRotate = false;
                this.rotateDeg();
                this.$refs.audio_music.play();
                let Time = this.$refs.audio_music.duration;
                console.log(Time);
                if(this.isFirst) {
                    this.isFirst = false;
                    this.isActivecolor = 0;
                    this.musicsrc = this.playmusicbg.player[this.isActivecolor].musicsrc;
                }
            }
            // 暂停
            else if(this.$refs.icon_playmusic.className == 'icon-zhanting') {
                this.$refs.icon_playmusic.className = 'icon-play';
                this.isRotate = true;
                this.$refs.audio_music.pause();
            }
        },
        //收藏
        collection() {
            if(this.$refs.coloriocn.className == 'icon-shoucang colored') {
                this.isColor = false;
            }else {
                this.isColor = true;
            }
        },
        playbggd() {
            this.SongerList = true;
            this.playmask = true;
        },
        //遮罩
        playmaskfalse() {
            this.SongerList = false;
            this.playmask = false;
            this.playmaskZindexs = false;
        },
        // 歌单列表高亮
        activeLicolor(index,musicsrc,musicimages,singer,playname) {
            this.isActivecolor = index;
            this.musicsrc = musicsrc;
            this.playmusicbgImg = musicimages;
            if(this.isFirst) {
                this.isFirst = false;
                this.rotateDeg();
            }
            this.$refs.icon_playmusic.className = 'icon-zhanting';
            this.isRotate = false;
            this.$refs.geshou.innerHTML = singer;
            this.$refs.geming.innerHTML = playname;
            // setTimeout(function() {
            //     let goTime = 0;
            //     let Time = this.$refs.audio_music.duration;
            //     let minute = Time / 60;
            //     let minutes = parseInt(minute);
            //     if (minutes < 10) {
            //         minutes = "0" + minutes;
            //     }
            //     //秒
            //     let second = Time % 60;
            //     let seconds = Math.round(second);
            //     if (seconds < 10) {
            //         seconds = "0" + seconds;
            //     }
            //     //总共时长的秒数
            //     let allTime = parseInt(minutes*60 + seconds);
            //
            //
            //     let spanWidth = this.$refs.spanlength.clientWidth;
            //     let a = allTime/spanWidth;
            //     let Timegoing = setInterval(function() {
            //         goTime++;
            //         this.$refs.playbeginTime.style.left = goTime+'px';
            //     }.bind(this),1000);
            // }.bind(this),100);
            setTimeout(function() {
                let Time = this.$refs.audio_music.duration;
                let TimeOverMusic = setInterval(function() {
                    parseInt(Time--);
                    if(Time < 0 ) {
                        this.isActivecolor++;
                        this.musicsrc = this.playmusicbg.player[this.isActivecolor].musicsrc;
                        clearInterval(TimeOverMusic);
                        setTimeout(function() {
                            TimeOverMusic;
                        },100);
                    }
                }.bind(this),1000);
            }.bind(this),100);
        },
        //下一曲
        nextMusic() {
            if(this.isFirst) {
                this.isFirst = false;
                this.rotateDeg();
            }
            this.isActivecolor++;
            this.musicsrc = this.playmusicbg.player[this.isActivecolor].musicsrc;
            this.playmusicbgImg = this.playmusicbg.player[this.isActivecolor].musicimages;
            this.$refs.geshou.innerHTML = this.playmusicbg.player[this.isActivecolor].singer;
            this.$refs.geming.innerHTML = this.playmusicbg.player[this.isActivecolor].playname;
            this.isRotate = false;
            this.$refs.icon_playmusic.className = 'icon-zhanting';
            if(this.isActivecolor >= this.$refs.playcolorlist.length-1) {
                this.isActivecolor = -1;
            }
        },
        //上一曲
        upperMusic() {
            if(this.isFirst) {
                this.isFirst = false;
                this.rotateDeg();
            }
            this.isActivecolor--;
            this.musicsrc = this.playmusicbg.player[this.isActivecolor].musicsrc;
            this.playmusicbgImg = this.playmusicbg.player[this.isActivecolor].musicimages;
            this.$refs.geshou.innerHTML = this.playmusicbg.player[this.isActivecolor].singer;
            this.$refs.geming.innerHTML = this.playmusicbg.player[this.isActivecolor].playname;
            this.isRotate = false;
            this.$refs.icon_playmusic.className = 'icon-zhanting';
            if(this.isActivecolor == 0 ) {
                this.isActivecolor = 1;
            }
        },
        //循环按钮
        xunhuan() {
            this.$refs.audio_music.removeAttribute('autoplay')

            if(this.$refs.loopmusic.className== "icon-xunhuan") {
                this.$refs.loopmusic.className = "icon-dqxh";
                this.$refs.audio_music.setAttribute('loop','loop');
            }else if(this.$refs.loopmusic.className== "icon-dqxh") {
                this.$refs.loopmusic.className = "icon-sjbf"
            }else if(this.$refs.loopmusic.className== "icon-sjbf") {
                this.$refs.loopmusic.className = "icon-xunhuan"
            }
        },
        removeList() {
            this.playmask = true;
            this.playmaskZindexs = true;
            this.allRemove = true;
        },
        RemoveLisrMusic() {
            this.whetherRemove = false;
            this.playmaskZindexs = false;
            this.allRemove = false;
            this.playmask = false;
            this.SongerList = false;
        },
        cancelRemove() {
            this.playmaskZindexs = false;
            this.allRemove = false;
            this.playmask = false;
            this.SongerList = false;
        }
    },
}
</script>
<style lang="less">
.playbg {
    width: 100%;
    height: 100%;
    background: url('../assets/xiaoao.jpeg') #000;
    background-size: 650%;
    background-position: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    .top_title {
        height: 50px;
        display: flex;
        background: linear-gradient(to right,#fff, #d6f6f5);
        z-index: 20;
        position: relative;
        p {
            flex: 1;
            line-height: 50px;
            text-align: center;
            position: relative;
            a {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            span {
                font-size: 10px;
            }
            &:first-child {
                flex: 1.5;
            }
            &:last-child {
                flex: 1.5;
            }
            &:nth-child(2) {
                flex: 7;
                text-align: left;
                line-height: normal;
                font-size: 14px;
                margin-top: 5px;
            }
        }
    }
    .playbg_img {
        position: relative;
        height: 400px;
        .musicbegin_img {
            background: url('../assets/needle.png') no-repeat;
            width: 84px;
            height: 122px;
            background-position: center;
            background-size: 100%;
            display: block;
            position: absolute;
            left: 50%;
            top: -5px;
            transform: translateX(-20%);
            z-index: 10;
            transition: all .5s;
            transform-origin:top left;
        }
        .rotatez {
            transition: all .5s;
            transform-origin:top left;
            transform: rotateZ(-13deg);

        }
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #eee;
            transform: rotateY(.5);
        }
        .playbox {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 50px solid #424242;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-55%);
            img {
                border: 5px solid #000;
                margin: -5px 0 0 -5px;
            }
        }
    }
    .play_bottom_icon {
        width: 80%;
        margin: 0 auto;
        display: flex;
        p {
            flex:  1;
            text-align: center;
            font-size: 20px;
            color: #828282;
        }
        .colored {
            color: #e31c1d;
        }
    }
    .playbgTime {
        padding: 10px 2px;
        display: flex;
        font-size: 10px;
        span {
            flex: 1;
            text-align: center;
            position: relative;
            &:first-child {
                flex: 0.5;
            }
            &:nth-child(2) {
                margin-top: 8px;
                border-top: 1px solid #c3c1c1;
            }
            &:last-child {
                flex: 0.5
            }
            i {
                display: block;
                background: red;
                width: 8px;
                height: 8px;
                position: absolute;
                top: -5px;
                left: 0;
                border-radius: 50%;
            }
        }
    }
    .playbgbottomIcon {
        display: flex;
        margin-top: 10px;
        span {
            flex: 1;
            text-align: center;
            font-size: 20px;
            line-height: 30px;
            color: #666;
            &:nth-child(3) {
                font-size: 30px;
            }
        }
    }
    .playmosiclist {
        background: #fff;
        height: 340px;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 120;
        overflow-y: scroll;
        .playmosiclistTitle {
            height: 45px;
            font-size: 12px;
            line-height: 45px;
            color: #333;
            position: relative;
            &:after {
                content: '';
                border-bottom: 1px solid #eee;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                transform: scaleY(0.5);
            }
            div {
                display: inline-block;
                p {
                    display: inline-block;
                }
            }
            .top_left {
                padding-left: 10px;
                p {
                    &:last-child {
                        margin-left: 5px;
                    }
                }
            }
            .top_right {
                padding-right: 10px;
                float: right;
                p {
                    &:last-child {
                        margin-left: 20px;
                        border-left: 1px solid #eee;
                        padding-left: 10px;
                        position: relative;
                        z-index: 10;
                    }
                }
                .icon_sc {
                    font-size: 30px;
                }
            }
        }
        .songlist {
            margin-left: 10px;
            overflow-y: scroll;
            li {
                height: 40px;
                line-height: 40px;
                position: relative;
                .listtxtcolor {
                    color: #e31c1d;
                }
                p {
                    margin-left: 15px;
                }
                &:after {
                    content: "";
                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    right: 0px;
                    border-top: 1px solid #eee;
                    transform: scaleY(0.5);
                }
                .songname {
                    font-size: 13px;
                }
                .singer {
                    font-size: 10px;
                }
                .right_sc {
                    float: right;
                    margin-right: 10px;
                    color: #bbb8b8;
                }
            }
        }
    }
    .allRemove {
        width: 73%;
        height: 100px;
        background: #fff;
        border-radius: 2px;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 151;
        transform: translate(-50%,-50%);
        p {
            font-size: 12px;
            color: #6d6d6d;
            margin: 20px 0 20px 20px;
        }
        span {
            float: right;
            margin-right: 30px;
            color: #e31c1d;
            font-size: 10px;
        }
    }
    .playbgmask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background: #000;
        opacity: .5;
        z-index: 21;
    }
    .playmaskZindex {
        z-index: 150;
    }

}
</style>
