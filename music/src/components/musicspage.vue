<template>
<div class="musicpage">
    <div class="topTitle">
        <div class="topTitleicon">
            <div class="leftIcon">
                <span class="icon-htjt"><a href="javascript:history.go(-1);"></a></span>
                <span>歌单</span>
            </div>
            <div class="rightIcon">
                <span class="icon-fdj"></span>
                <span class="icon-shudian"></span>
            </div>
        </div>
    </div>
    <div class="imgBg">
        <div class="leftImg">
            <img src="../assets/xiaoao.jpeg" alt="" width="100" height="100">
        </div>
        <div class="rightText">
            <div class="">
                我喜欢的音乐
            </div>
            <br>

            <div class="imgTxt">
                <img src="../assets/newmusic_1.jpeg" width="30" height="30" />
                <p>戴丶戴</p>
            </div>
        </div>
    </div>
    <div class="IconText">
        <div class="icon-scj">
            <p>收藏</p>
        </div>
        <div class="icon-pl">
            <p>评论</p>
        </div>
        <div class="icon-fx">
            <p>分享</p>
        </div>
        <div class="icon-xz">
            <p>下载</p>
        </div>
    </div>

    <div class="MusicPageTitle">
        <p class="icon-play"></p>
        <p>播放全部<span ref="MusicLegnth"></span></p>
    </div>
    <ul class="MusicList">
        <li
            v-for="(item,index) in MusicList"
            @click="MusicListLi(index,item.musicsrc,item.musicimages,item.playname,item.singer)"
            :class="musicactive===index ? 'MusicColor' : ''" >
            <span>{{index}}</span>
            <p>{{item.playname}}</p>
            <p>{{item.singer}}</p>
            <p class="icon-shudian"></p>
        </li>
    </ul>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
    data() {
        return {
            MusicList: {},
            musicactive: null
        }
    },
    created() {
        this.$http.get('data.json').then(res => {
          this.MusicList = res.data.musicimg.playmusic.player;
          this.$refs.MusicLegnth.innerHTML = '(共'+this.MusicList.length+'首)';
        })

    },
    computed: {
        // TimeMusic() {
        //     let MusicSrcs = setTimeout(function() {
        //         console.log(document.getElementById('music').duration);
        //     },100);
        // }
    },
    beforeUpdate() {
        // this.TimeMusic;
    },
    methods: {
        MusicListLi(index,musicsrc,Musicimgsrc,playNameText,singerText) {
            this.musicactive = index;
            let MusicSrc = document.getElementById('music');
            let MusicImg = document.getElementById('musicImgSrc');
            let MusicTitle = document.getElementById('musicTextone');
            let MusicSonger = document.getElementById('musicTextTwo');
            MusicSrc.setAttribute('src',musicsrc);
            MusicImg.setAttribute('src',Musicimgsrc);
            MusicTitle.innerHTML = playNameText;
            MusicSonger.innerHTML = singerText;
            MusicSrc.setAttribute('autoplay','autoplay');
            document.getElementById('iconPlayIcon').className = 'icon-zhanting';
            let TimeOut = setTimeout(function() {
                let TimeOver = MusicSrc.duration;
                let timeOverMusic = setInterval(function() {
                    TimeOver--
                    TimeOver.toFixed();
                    if(TimeOver <= 0) {
                        console.log(this.musicactive = index+1);
                        clearInterval(timeOverMusic);
                    }
                }.bind(this),1000);
            }.bind(this),100);
        }
    }
}
</script>
<style lang="less">
.musicpage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;
    .topTitle {
        height: 40px;
        background: linear-gradient(to right,#fff, #d6f6f5);
        width: 100%;
        color: #666;
        font-size: 15px;
        line-height: 40px;
        position: fixed;
        top: 0;
        z-index: 1;
        span {
            margin: 0 10px;
            display: inline-block;
            position: relative;
            a {
                display: block;
                width: 100%;
                height: 100%;
                z-index: 100;
                position: absolute;
                top: 0;
            }
        }
        .leftIcon {
            float: left;
        }
        .rightIcon {
            float: right;
        }
    }
    .imgBg {
        background: url('../assets/xiaoao.jpeg') #000;
        background-size: 650%;
        background-position: center;
        height: 170px;
        overflow: hidden;
        position: relative;
        margin-top: 40px;
        div {
            display: inline-block;
        }
        .leftImg {
            margin: 20px 10px 0 10px;
        }
        .rightText {
            vertical-align: top;
            font-size: 14px;
            margin-top: 30px;
            img {
                border-radius: 50%;
                float: left;
            }
            .imgTxt {
                margin-top: 10px;
                p {
                    float: left;
                    margin: 6px 0 0 10px;
                }
            }
        }
    }
    .IconText {
        position: absolute;
        width: 100%;
        top: 165px;
        display: flex;
        div {
            flex: 1;
            text-align: center;
            p {
                font-size: 12px;
                font-weight: normal;
                margin: 5px 0 10px 0;
            }
        }
    }
    .MusicPageTitle {
        height: 40px;
        position: relative;
        &:after {
            content: '';
            border-bottom: 1px solid #d8d6d6;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            transform: scaleY(.5);
        }
        p {
            display: inline-block;
            font-size: 13px;
            color: #464646;
            line-height: 40px;
            margin-left: 10px;
            &:first-child {
                color: #000;
                font-size: 16px;
                line-height: 42px;
            }
        }
    }
    .MusicList {
        padding-left: 40px;
        li {
            position: relative;
            height: 50px;
            &:after {
                content: '';
                border-bottom: 1px solid #d8d6d6;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                transform: scaleY(.5);
            }
            span {
                position: absolute;
                top: 10px;
                left: -25px;
                color: #9e9e9e;
            }
            p {
                font-size: 13px;
                &:nth-child(2) {
                    margin-top: 10px;
                }
                &:nth-child(3) {
                    font-size: 12px;
                }
                &:last-child {
                    position: absolute;
                    top: 16px;
                    right: 18px;
                    color: #9e9e9e;
                }
            }
        }
    }
    .MusicColor {
        color: #e31c1d;
    }
}
</style>
