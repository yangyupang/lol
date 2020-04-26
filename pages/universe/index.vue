<template>
  <div>
    <universeTop></universeTop>
    <div class="font">
      <div class="wide-high">
        <div class="p-r">轮播图</div>
      </div>
    </div>
  </div>
</template>

<script>
import universeTop from "../../components/common/universeTop";
export default {
  data() {
    return {};
  },
  components: {
    universeTop
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.font {
  font-family: microsoft yahei, Helvetica, tahoma, simsun, sans-serif;
  font-weight: 400;
}
.wide-high {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>