<template>
  <div class="noauth">
    <div class="img"></div>
    <div class="content">
      <h1>404</h1>
      <div class="text">抱歉,你访问页面的页面不存在或正在开发中</div>
      <el-button type="primary" size="small" @click="$router.push('/')">返回首页</el-button>
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
.noauth {
  height: 100vh;
  text-align: center;
  .img {
    width: 430px;
    height: 360px;
    background: url("https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    animation: imgmove 0.8s linear;
    margin: 0 auto;
  }
  .content {
    animation: textmove 0.8s linear;
    h1 {
      margin-bottom: 10px;
      font-size: 40px;
    }
    .text {
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 20px;
    }
  }
}
@keyframes textmove {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
@keyframes imgmove {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>