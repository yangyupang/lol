<template>
  <div>
    <div class="lcf_yxlm_nav">
      <div class="nav">
        <div class="inline lefticon" @click="goTo">
          <div class="fl">
            <div class="inline gamelogo">
              <img src="//game.gtimg.cn/images/lol/universe/images/2.jpg" alt />
            </div>
            <div class="inline xialist">
              <p>首页</p>
              <p>
                <img src="//game.gtimg.cn/images/lol/universe/images/3.png" alt />
              </p>
            </div>
          </div>
        </div>
        <div class="inline nav_banner">
          <div class="inline logo" style="vertical-align: top;">
            <img src="//game.gtimg.cn/images/lol/universe/images/1.jpg" alt />
          </div>
          <div class="inline link">
            <a
              :class="['inline',navSelect===index?'select':'']"
              v-for="(item,index) in navList"
              :key="index"
              @click="chooseNav(item,index)"
            >
              {{item.title}}
              <br />
              <small>{{item.Eng}}</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        { title: "专题", Eng: "FEATURED" },
        { title: "英雄", Eng: "CHAMPIONS" },
        { title: "地区", Eng: "REGIONS" },
        { title: "漫画", Eng: "CONICS" },
        { title: "集锦", Eng: "COLLECTIONS" },
        { title: "另一个宇宙", Eng: "ALT UNIVERSE" },
        { title: "地图", Eng: "MAP" },
        { title: "探索", Eng: "EXPLORE" },
        { title: "搜索", Eng: "SEARCH" }
      ],
      navSelect: 0
    };
  },
  components: {},
  methods: {
    goTo() {
      window.open("/");
    },
    chooseNav(item, index) {
      this.navSelect = index;
    }
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.lcf_yxlm_nav {
  background-color: #121212;
  height: 62px;
  width: 100%;
  //   position: absolute;
  z-index: 999999999;
  //   top: -62px;
  .nav {
    height: 64px;
    border-bottom: 2px solid #262626;
    background: #121212;
    text-align: center;
    position: relative;
    z-index: 9990;

    .inline {
      display: inline-block;
      vertical-align: middle;
    }
    .nav_banner {
      height: 100%;
      overflow: hidden;
    }
  }
  .link {
    a {
      color: #c9aa71;
      font-size: 14px;
      padding: 15px 0 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0);
      margin: 0 20px;
      cursor: pointer;
      &:hover {
        border-bottom: 1px solid #c79a3c;
        color: #fff;
      }
      small {
        font-size: 8px;
      }
    }
    .select {
      border-bottom: 1px solid #c79a3c;
      color: #fff;
    }
  }
  .lefticon {
    height: 64px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }
  .gamelogo {
    height: 43px;
    margin-top: 12px;
  }
  .xialist {
    position: relative;
    text-align: left;
    color: #a29c90;
    padding-top: 10px;
    overflow: visible;
    &:hover {
      color: #fff;
    }
  }
  .logo {
    height: 100%;
    position: relative;
  }
}
</style>