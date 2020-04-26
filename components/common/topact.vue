<template>
  <div class="common-topact w-100 p-r">
    <img
      class="topact-img p-a"
      src="//img.crawler.qq.com/lolwebschool/0/JAutoCMS_LOLWeb_341fae1ae34e7d7bdecea765850df78b/0"
    />
    <!-- 遮罩层 -->
    <div class="dark-mask w-100 p-a"></div>
    <!-- 广告主体操作层(用于放置按钮) -->
    <div class="comm-topact-inner m-auto p-r">
      <!-- 查看详情 -->
      <div class="top-act-link middle p-a"></div>
      <!-- 版本详情 -->
      <div class="top-version p-a f-s-14 fl">
        <span>当前游戏版本：</span>
        <em class="m-r-10">Ver 10.8</em>
        <div class="top-version-link t-center f-s-12">版本详情</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.common-topact {
  min-width: 1230px;
  height: 360px;
  overflow: hidden;
  position: relative;
  .topact-img {
    left: 50%;
    top: 0;
    width: 1920px;
    height: 100%;
    transition: opacity 0.6s;
    opacity: 1;
    margin-left: -960px;
  }
  .dark-mask {
    left: 0;
    top: 0;
    height: 131px;
    background: url(//game.gtimg.cn/images/lol/v3/dark-jianbian-repeatx-0.png)
      repeat center top;
    z-index: 1;
  }
  .comm-topact-inner {
    width: auto;
    max-width: 1358px;
    min-width: 1230px;
    height: 100%;
    .top-act-link {
      background-image: url(//game.gtimg.cn/images/lol/v3/topfoot-spr.png);
      background-position: -216px -39px;
      background-repeat: no-repeat;
    }
    .middle {
      cursor: pointer;
      left: 50%;
      bottom: 32px;
      width: 160px;
      height: 40px;
      margin-left: -77px;
    }
    .top-version {
      right: 0;
      bottom: 28px;
      color: #888787;
      em {
        color: #f5d185;
        font-style: normal;
      }
      .top-version-link {
        cursor: pointer;
        height: 26px;
        padding: 0 15px;
        background: rgba(0, 0, 0, 0.65);
        border: 2px solid #f5d185;
        color: #f5d185;
        line-height: 22px;
        border-image: linear-gradient(to bottom, #6b5024 0, #b88d35 100%);
        border-image-slice: 1;
      }
    }
  }
}
</style>