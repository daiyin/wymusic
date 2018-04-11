<template>
<div class="playbg">
    <div class="top_title">
        <p class="icon-htjt"></p>
        <p>{{playmusic.playmusicname}}<br /><span>{{playmusic.playmusiclyrics}}</span></p>
        <p class="icon-fx"></p>
    </div>
    <div class="playbg_img">
        <i class="musicbegin_img" :class="{rotatez:isRotate}"></i>
        <div class="playbox">
            <img :src="playmusic.playmusicimg" width="100%" height="100%" style="border-radius:50%" ref="musicbgImg" id="musicbgImg"/>
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
        <span></span>
        <span>00:00</span>
    </div>
    <div class="playbgbottomIcon">
        <span class="icon-xunhuan"></span>
        <span class="icon-syq"></span>
        <span class="icon-play" ref="icon_playmusic" @click="iconPlay"></span>
        <span class="icon-xyq"></span>
        <span class="icon-gd" @click="playbggd"></span>
    </div>
    <transition name="fade">
        <div class="playmosiclist" v-show="playmosiclist">
            <div class="playmosiclistTitle">
                <div class="top_left">
                    <p class="icon-xunhuan"></p>
                    <p>列表循环()</p>
                </div>
                <div class="top_right">
                    <p class="icon-scj"></p>
                    <p>收藏全部</p>
                    <p class="icon-sc"></p>
                </div>
            </div>
            <ul class="songlist">
                <li style="display:none"><audio src="musicsrc" ref="audio_music" autoplay="autoplay" id="audio_music"></audio></li>
                <li
                    v-for="(item,index) in playmusic.player"
                    :class="{listtxtcolor: isActive}"
                    @click="nowmusiclist"
                    class="icon-lb"
                >

                    <p>
                      <!-- <span class="lb"></span> -->
                      <span class="songname">{{item.playname}}</span> - <span class="singer">{{item.singer}}</span>
                    </p>
                    <span class="right_sc">	&times;</span>

                </li>
            </ul>
        </div>
    </transition>
    <div class="playbgmask" v-show="playmask" @click="playmaskfalse"></div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
    props: {
        playmusic: {
          type: Object
        }
    },
    data() {
        return {
            isRotate: true,
            isColor: false,
            Time: 0,
            playmosiclist: false,
            playmask: false,
            isActive: false
        }
    },
    methods: {

        rotateDeg() {
            let setINTER = setInterval(function() {
                this.Time++
                let a = 'rotate('+this.Time+'deg'+')';
                this.$refs.musicbgImg.style.transform = a;
                if(this.Time == 360) {
                    this.Time = 0
                }else if(this.$refs.icon_playmusic.className == 'icon-play') {
                    clearInterval(setINTER);
                }
            }.bind(this),25);
        },
        iconPlay() {

            if(this.$refs.icon_playmusic.className == 'icon-play') {
                this.$refs.icon_playmusic.className = 'icon-zhanting';
                this.isRotate = false;
                let timeover = true;
                if(timeover) {
                    this.rotateDeg();
                    timeover = false;
                }
            }
            else if(this.$refs.icon_playmusic.className == 'icon-zhanting') {
                this.$refs.icon_playmusic.className = 'icon-play';
                this.isRotate = true;
            }
        },
        collection() {
            if(this.$refs.coloriocn.className == 'icon-shoucang colored') {
                this.isColor = false;
            }else {
                this.isColor = true;
            }
        },
        playbggd() {
            this.playmosiclist = true;
            this.playmask = true;
        },
        playmaskfalse() {
            this.playmosiclist = false;
            this.playmask = false;
        },
        nowmusiclist() {
            alert(1);
        }
    },
    components: {
    }
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
            span {
                font-size: 10px;
            }
            &:first-child {
                flex: 1.5;
            }
            &:nth-child(2) {
                flex: 8;
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
            border: 50px solid #000;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-55%);
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
                    }
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
    .playbgmask {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        background: #000;
        opacity: .5;
        z-index: 21;
    }
}
</style>
