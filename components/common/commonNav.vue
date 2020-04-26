<template>
  <div class="comm-head w-100 z-10 p-a">
    <div class="head-normal p-r m-auto fl">
      <!-- 左边的LOGO -->
      <div class="logo m-t-10">
        <img src="//game.gtimg.cn/images/lol/v3/logo-public.png" style="width:167px;height:60px" />
      </div>
      <!-- 中间的导航栏 -->
      <div class="center-nav fl" @mouseenter="onShow(0)" @mouseleave="offShow">
        <!-- 循环体 -->
        <div
          class="nav-item t-center"
          :title="item.cnTitle|haveTitle"
          v-for="(item,index) in navList"
          :key="index"
        >
          <div class="cn f-s-18">{{item.cnTitle}}</div>
          <div class="en">{{item.enTitle}}</div>
        </div>
      </div>
    </div>
    <!-- hover出来的子菜单 -->
    <div
      class="head-nav-sub p-a w-100"
      @mouseenter="onShow(1)"
      @mouseleave="offShow"
      :class="submenu?'show':''"
    >
      <div class="head-nav-sub-inner w-100 m-auto">
        <ul class="fl">
          <li v-for="(item,index) in navList" :key="index">
            <!-- 内部循环子菜单 -->
            <div
              class="head-nav-sub-item w-100 f-s-14 t-center"
              v-for="(item0,index0) in item.sonList"
              :key="index0"
              @click="goTo(item0)"
            >{{item0.sonTitle}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航栏数组
      navList: [
        {
          cnTitle: "游戏资料",
          enTitle: "GAME INFO",
          sonList: [
            {
              sonTitle: "游戏下载"
            },
            {
              sonTitle: "新手指引"
            },
            {
              isRoute: true,
              sonTitle: "资料库"
            },
            {
              sonTitle: "云顶之弈"
            },
            {
              sonTitle: "攻略中心"
            },
            {
              sonTitle: "开发者基地"
            },
            {
              sonTitle: "海克斯战利品库"
            },
            {
              isRoute: true,
              sonTitle: "英雄联盟宇宙"
            }
          ]
        },
        {
          cnTitle: "商城/合作",
          enTitle: "STORE",
          sonList: [
            {
              sonTitle: "点劵充值"
            },
            {
              sonTitle: "道聚城"
            },
            {
              sonTitle: "周边商城"
            },
            {
              sonTitle: "LOL桌游"
            },
            {
              sonTitle: "LOL信用卡"
            },
            {
              sonTitle: "网吧特权"
            },
            {
              sonTitle: "电竞小说"
            }
          ]
        },
        {
          cnTitle: "社区互动",
          enTitle: "COMMUNITY",
          sonList: [
            {
              sonTitle: "官方社区"
            },
            {
              sonTitle: "视频中心"
            },
            {
              sonTitle: "官方论坛"
            },
            {
              sonTitle: "官方微信"
            },
            {
              sonTitle: "官方微博"
            },
            {
              sonTitle: "玩家创作馆"
            },
            {
              sonTitle: "作者入驻计划"
            },
            {
              sonTitle: "玩家服务"
            }
          ]
        },
        {
          cnTitle: "赛事官网",
          enTitle: "ESPORTS",
          sonList: [
            {
              sonTitle: "LPL职业联赛"
            },
            {
              sonTitle: "LDL发展联赛"
            },
            {
              sonTitle: "全球总决赛"
            },
            {
              sonTitle: "全明星赛"
            },
            {
              sonTitle: "德玛西亚杯"
            },
            {
              sonTitle: "季中冠军赛"
            },
            {
              sonTitle: "洲际系列赛"
            },
            {
              sonTitle: "全国高校联赛"
            }
          ]
        },
        {
          cnTitle: "自助系统",
          enTitle: "SYSTEM",
          sonList: [
            {
              sonTitle: "联系客服"
            },
            {
              sonTitle: "转区系统"
            },
            {
              sonTitle: "封号查询"
            },
            {
              sonTitle: "账号注销"
            },
            {
              sonTitle: "信誉分系统"
            },
            {
              sonTitle: "服务器状态查询"
            },
            {
              sonTitle: "秩序殿堂"
            },
            {
              sonTitle: "峡谷之巅"
            }
          ]
        }
      ],
      // 子菜单的显示参数
      submenu: false
    };
  },
  components: {},
  methods: {
    onShow(num) {
      if (num === 0) {
        setTimeout(() => {
          this.submenu = true;
        }, 500);
      } else {
        this.submenu = true;
      }
    },
    offShow() {
      this.submenu = false;
    },
    goTo(item0) {
      if (item0.sonTitle === "资料库") {
        this.$router.push("/");
      } else if (item0.sonTitle === "英雄联盟宇宙") {
        window.open("/universe");
      } else {
        this.$notify.info({
          title: "开发中",
          message: "该功能尚在开发！"
        });
      }
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {
    haveTitle(val) {
      let value = "";
      if (val === "游戏资料" || val === "赛事官网") {
        value = val;
      }
      return value;
    }
  }
};
</script>

<style scoped lang='scss'>
.comm-head {
  top: 0;
  left: 0;
  height: 78px;
  .head-normal {
    width: 100%;
    max-width: 1358px;
    min-width: 1230px;
    height: 78px;
    z-index: 9;
    .center-nav {
      width: 55%;
      margin-left: -5px;
      padding-top: 16px;
      .nav-item {
        width: 20%;
        &:first-child,
        &:nth-child(4) {
          cursor: pointer;
        }
        .cn {
          color: #fff;
          letter-spacing: 1px;
        }
        .en {
          color: #aeaeae;
          letter-spacing: 1px;
          margin-top: 5px;
          font-size: 11px
        }
      }
    }
  }
  // 子菜单
  .head-nav-sub {
    display: none;
    left: 0;
    top: 0;
    overflow: hidden;
    background: url(//game.gtimg.cn/images/lol/v3/dark60-bg-repeat.png) repeat;
    padding: 88px 0 32px 0;
    .head-nav-sub-inner {
      max-width: 1358px;
      min-width: 1230px;
      height: auto;
      ul {
        width: 55%;
        margin-left: 161px;
        padding-left: 0;
        li {
          list-style: none;
          width: 20%;
          height: auto;
          .head-nav-sub-item {
            height: 29px;
            overflow: hidden;
            line-height: 29px;
            color: #e1e1e1;
            &:hover {
              cursor: pointer;
              color: #e9c06c;
            }
          }
        }
      }
    }
  }
  // 显示子菜单
  .show {
    display: block;
    animation: topin 0.5s;
  }
  @keyframes topin {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>