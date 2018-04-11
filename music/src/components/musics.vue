<template>
<div class="musics" :class="{zIndex:zIndex}">
    <div class="my_music">
        <div class="icon-musics icon_width"></div>
        <div class="right_listscss">
            本地音乐
        </div>
    </div>
    <div class="my_music">
        <div class="icon-dt icon_width"></div>
        <div class="right_listscss">
            最近播放
        </div>
    </div>
    <div class="my_music">
        <div class="icon-xz icon_width"></div>
        <div class="right_listscss">
            下载管理
        </div>
    </div>
    <div class="my_music">
        <div class="icon-dt icon_width"></div>
        <div class="right_listscss">
            我的电台
        </div>
    </div>
    <div class="my_music">
        <div class="icon-wdsc icon_width"></div>
        <div class="right_listscss">
            我的收藏
        </div>
    </div>
    <div class="songlistmusic">
        <div class="musicTitle">
            <p class="icon-jt" :class="{rotate:isActive}" ref="icon_jt"></p>
            <p ref="cjmusicsong" @click="title_music"></p>
            <p class="icon-sz" @click="setup"></p>
        </div>
        <ul class="myLovemusic" v-show="mymusicList">
            <li
                v-for="(item,index) in lovesongmusic.mylove"
            >
            <router-link :to="'/musicspage?id='+index">
                <div class="lovemusicimg">
                    <img :src="item.myloveimg" width="100%" height="90%" />
                </div>
                <div class="listtxt">
                    <p>{{item.lovename}}</p>
                    <p>{{item.myloveimgs}}&nbsp;首</p>
                </div>
            </router-link>
            </li>
        </ul>
    </div>
    <div class="songlistmusic">
        <div class="musicTitle">
            <p class="icon-jt" :class="{rotate:isActives}" ref="rotatelist"></p>
            <p ref="sctxt" @click="scmuisiclist"></p>
            <p class="icon-sz" @click="musicgdsz"></p>
        </div>
        <ul class="myLovemusic" v-show="mymuscsicList">
            <li
                v-for="(item,index) in lovesongmusic.mylove"
            >
                <router-link :to="'/musicspage?id='+index">
                    <div class="lovemusicimg">
                        <img :src="item.myloveimg" width="100%" height="100%" />
                    </div>
                    <div class="listtxt">
                        <p>{{item.lovename}}</p>
                        <p>{{item.myloveimgs}}&nbsp;首</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
    <transition name="fade">
        <div class="setupmusic" v-show="setuoadd">
            <p class="setip_title">创建的歌单</p>
            <div class="setupicon_txt">
                <p class="addclassmusic setupflex">&nbsp;+</p>
                <p class="setuptxt">创建新歌单</p>
            </div>
            <div class="setupicon_txt">
                <p class="icon-phb setupflex"></p>
                <p class="setuptxt">歌单管理</p>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="setupmusic" v-show="setuoagl">
            <p class="setip_title">创建的歌单</p>
            <div class="setupicon_txt">
                <p class="icon-phb setupflex"></p>
                <p class="setuptxt">歌单管理</p>
            </div>
        </div>
    </transition>
    <div class="masks" v-show="maskbg" @click="maskbgs"></div>
    <router-view></router-view>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
    data() {
        return {
            zIndex: false,
            setuoagl: false,
            isActive: true,
            isActives: false,
            lovesongmusic: {},
            mymusicList: true,
            mymuscsicList: false,
            maskbg: false,
            setuoadd: false
        }
    },
    created() {
        this.$http.get('data.json').then((res) => {
            this.lovesongmusic = res.data.musicimg.establish;
        });
    },
    beforeUpdate() {
        this.$refs.cjmusicsong.innerHTML = "创建的歌单"+'('+this.lovesongmusic.mylove.length+')'
        this.$refs.sctxt.innerHTML = "收藏的歌单"+'('+this.lovesongmusic.mylove.length+')'
    },
    methods: {
        title_music() {
            this.isActive = true;
            this.mymusicList = true;
            if(this.$refs.icon_jt.className == 'icon-jt rotate' ) {
                this.isActive = false;
                this.mymusicList = false;
            }
        },
        scmuisiclist() {
            this.isActives = true;
            this.mymuscsicList = true;
            if(this.$refs.rotatelist.className == "icon-jt rotate") {
                this.mymuscsicList = false;
                this.isActives = false;
            }
        },
        musicgdsz() {
            this.zIndex = true;
            this.maskbg = true;
            this.setuoagl = true;
        },
        setup() {
            this.zIndex = true;
            this.maskbg = true;
            this.setuoadd = true;
        },
        maskbgs() {
            this.zIndex = false;
            this.maskbg = false;
            this.setuoadd = false;
            this.setuoagl = false;
        }
    }
}
</script>
<style lang="less">
.musics {
    position: relative;
    z-index: 60;
    margin-top: 40px;
    padding-bottom: 60px;
    .my_music {
        display: flex;
        background: #fff;
        height: 40px;
        line-height: 40px;
        div {
            display: inline-block;
        }
        .icon_width {
            flex: 1.2;
            text-align: center;
            font-size: 20px;
            color: #e31c1d;
            line-height: 40px;
        }
        .right_listscss {
            flex: 8.8;
            color: #827a7a;
            font-size: 14px;
            position: relative;
            &:after {
                content: '';
                border-top: 1px solid #eee;
                position: absolute;
                bottom: 0;
                right: 0 ;
                left: 0;
                transform: scaleY(.5);
            }
        }
    }
    .songlistmusic {
        margin-top: -1px;
        .musicTitle {
            background: #eee;
            height: 30px;
            line-height: 30px;
            display: flex;
            p {
                font-size: 10px;
                text-align: center;
                line-height: 30px;
                &:first-child {
                    flex: 1;
                }
                &:nth-child(2) {
                    flex: 8;
                    text-align: left;
                    color: #827a7a;
                }
                &:last-child {
                    flex: 1;
                    color: #827a7a;
                }
            }
            .rotate {
                transform: rotate(90deg);
            }
        }
        .myLovemusic {
            padding-left: 10px;
            font-size: 0;
            li {
                height: 60px;
                font-size: 14px;
                color: #666;
                margin:3px 0;
                a {
                    display: flex;
                    color: #666;
                }
                .lovemusicimg {
                    flex: 2;
                }
                .listtxt {
                    flex: 8;
                    margin-left: 10px;
                    position: relative;
                    width: 81%;
                    height: 60px;
                    &:after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        border-bottom: 1px solid #eee;
                        transform: rotateY(.5);

                    }
                    p {
                        &:first-child {
                            margin-top: 10px;
                        }
                        &:last-child {
                            font-size: 10px;
                            margin-top: 5px;
                        }
                    }
                }
            }
        }
    }
    .setupmusic {
        height: 110px;
        background: #fff;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 100;
        padding: 20px 0 5px 10px;
        font-size: 12px;
        .setip_title {
            color: #666;
        }
        .setupicon_txt {
            display: flex;
            vertical-align: top;
            position: relative;
            height: 35px;
            .addclassmusic {
                text-align: left;
            }
            .setupflex {
                flex: 1;
            }
            .setuptxt {
                flex: 9;
                position: relative;
                line-height: 40px;
                &:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-bottom: 1px solid #eee;
                    transform: rotateY(.5);
                }
            }
            p {
                color: #e31c1d;
                &:first-child {
                    font-size: 20px;
                    line-height: 38px;
                }
            }
        }
    }
}
.zIndex {
    z-index: 120;
}
.masks {
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    width: 100%;
    height:  100%;
    z-index: 10;
    opacity: .5;
}
</style>
