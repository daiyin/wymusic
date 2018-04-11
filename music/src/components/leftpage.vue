<template>
<div class="leftpage">
    <div class="topbg">
        <p class="imgdius"><img src="../assets/newmusic_1.jpeg" width="60" height="60" /></p>
        <div class="bgbottomtxt">
            <span>戴丶戴</span>
            <span><i>lv.7</i></span>
            <span class="icon-jinbi">&nbsp;签到</span>
        </div>
    </div>
    <ul class="liststyleUl">
        <li class="icon-xf">
            <p>我的信息</p>
        </li>
        <li class="icon-vip">
            <p>VIP会员</p>
        </li>
        <li class="icon-gwc">
            <p>商城</p>
        </li>
        <li class="icon-xf">
            <p>在线听歌免流量</p>
        </li>
    </ul>
    <ul class="liststyleUl topborder">
        <li class="icon-friend">
            <p>我的好友</p>
        </li>
        <li class="icon-fj">
            <p>附近的人</p>
        </li>
    </ul>
    <ul class="liststyleUl topborder">
        <li class="icon-hf">
            <p>个性换肤</p>
        </li>
        <li class="icon-tgsq">
            <p>听歌识曲</p>
        </li>
        <li class="icon-ds">
            <p>定时停止播放</p>
        </li>
        <li class="icon-sys">
            <p>扫一扫</p>
        </li>
        <li class="icon-ds">
            <p>音乐闹钟</p>
        </li>
        <li class="icon-fj">
            <p>驾驶模式</p>
        </li>
        <li class="icon-fj">
            <p>音乐云盘</p>
        </li>
    </ul>
    <div class="bottomIcon">
        <p class="icon-MY-yjms"><span>夜间模式</span></p>
        <p class="icon-sz"><span>设置</span></p>
        <p class="icon-tc"><span>退出</span></p>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {

}
</script>
<style lang="less">
.leftpage {
    position: fixed;
    top: 0;
    left: 0;
    width: 85%;
    height: 100%;
    z-index: 210;
    overflow-y: scroll;
    .topbg {
        background: url('../assets/leftpage.jpeg') no-repeat;
        background-position: center;
        background-size: 100%;
        height: 160px;
        width: 100%;
        overflow: hidden;
        .imgdius {
            margin: 50px 0 5px 10px;
            img {
                border-radius: 50%;
            }
        }
        .bgbottomtxt {
            margin-left: 10px;
            color: #fff;
            font-size: 12px;
            span {
                &:nth-child(2) {
                    border: 1px solid #fff;
                    padding: 0 5px;
                    border-radius: 10px;
                    font-size: 10px;
                    margin-left: 5px
                }
                &:last-child {
                    float: right;
                    border: 1px solid #fff;
                    padding: 4px 8px;
                    border-radius: 15px;
                    margin-right: 10px;
                }
            }
        }
    }
    .liststyleUl {
        background: #fff;
        width: 100%;
        li {
            margin-left: 10px;
            height: 30px;
            line-height: 30px;
            position: relative;
            color: #464646;
            p {
                margin-left: 10px;
                font-size: 12px;
                position: absolute;
                top: 0;
                left: 15px;

            }
        }
    }
    .topborder {
        border-top: 5px solid #eee;
    }
    .bottomIcon {
        display: flex;
        background: #fff;
        height: 40px;
        font-size: 14px;
        color: #464646;
        p {
            flex: 1;
            line-height: 40px;
            margin-left: 10px;
            &:first-child {
                flex: 1.5;
            }
            span {
                margin-left: 10px;
            }
        }
    }
}
</style>
