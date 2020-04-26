<template>
  <div class="info-inner">
    <!-- 搜索框 -->
    <div class="info-search">
      <el-input v-model="sVal" :placeholder="`请输入您要搜索的${nav}`"></el-input>
    </div>
    <!-- 单选框(分类) -->
    <el-radio-group v-model="radio" @change="changeClassfy">
      <el-radio
        :label="item.faRole"
        v-for="(item,index) in classfyGroup"
        :key="index"
      >{{item.faTitle}}</el-radio>
    </el-radio-group>
    <!-- 物品分类有子分类时显示 -->
    <div class="select-radios p-r w-50" v-if="nav === '物品' && showFlag">
      <!-- 三角形指示标 -->
      <span class="sbg commico-corner commspr p-a" :class="`sbgmove${sonIndex}`"></span>
      <!-- 子分类 -->
      <el-radio-group v-model="sonRadio" @change="sonClassfy">
        <el-radio
          :label="item0.sonRole"
          v-for="(item0,index0) in classfyGroup[sonIndex].sonGroup"
          :key="index0"
        >{{item0.sonTitle}}</el-radio>
      </el-radio-group>
    </div>
    <!-- 下方展示的内容 -->
    <div class="info-main" v-if="showList.length>0">
      <!-- 每一项 -->
      <div
        class="info-item p-r t-center"
        v-for="(item,index) in showList"
        :key="index"
        @mouseenter="showFloat(item,index)"
        @mouseleave="closeFloat"
        @mousemove="changeFloat($event)"
        @click="jumpDetail(item)"
      >
        <!-- 图片层 -->
        <img
          v-if="nav === '英雄名'"
          :src="`//game.gtimg.cn/images/lol/act/img/champion/${item.alias}.png`"
          :alt="`${item.name} ${item.title}`"
        />
        <img v-else :src="item.iconPath" />
        <!-- 名字层 -->
        <div class="title f-s-13">{{item.name}}</div>
        <!-- 背景层 -->
        <div class="bg fl f-center a-c p-a">
          <i class="el-icon-search"></i>
        </div>
        <!-- 物品信息悬浮层 -->
        <div
          class="float-box p-20 z-99 b-box"
          :style="{left:fLeft+'px',top:fTop+'px'}"
          v-if="nav === '物品' && floatNum === index"
        >
          <!-- 头部的图片、名字和合成价格 -->
          <div class="box-desc fl a-c l-h-30 f-s-14">
            <!-- 左边的装备图片 -->
            <img :src="item.iconPath" class="goods-img" />
            <!-- 右边的物品信息 -->
            <div class="more-infos m-l-10">
              <!-- 顶部的物品名 -->
              <div class="goods-name">{{item.name}}</div>
              <!-- 下边的合成价格 -->
              <div class="goods-price">售价或合成费用:{{item.price}}</div>
            </div>
          </div>
          <!-- 下方的具体内容 -->
          <div class="item-desc f-s-14" v-html="item.description"></div>
          <!-- 合成表(vue-tree-chart插件) -->
          <div class="trees" v-if="item.from.length>0">
            <!-- 标题 -->
            <div class="tree-title f-w">合成所需</div>
            <tree-chart class="tree-table a-c m-auto" :json="treeData"></tree-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="info-main" v-else>
      <div v-if="nav==='物品'">非常抱歉，查无此物品嗟！ 建议您输入正确的物品名称</div>
      <div v-else>非常抱歉，查无此英雄嗟！ 建议您输入正确的英雄称号、ID、或者英文名</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 展示数组
      showList: [],
      // 搜索参数
      sVal: "",
      // 单选框参数
      radio: "",
      // 当前父分类下标
      sonIndex: 0,
      // 子分类数据
      sonRadio: "",
      // 悬浮框当前项
      floatObj: {},
      // 悬浮框显示参数
      floatNum: -1,
      // 悬浮框top参数
      fTop: 0,
      // 悬浮框left参数
      fLeft: 0
    };
  },
  props: {
    infoList: {
      type: Array,
      default: () => []
    },
    classfyGroup: {
      type: Array,
      default: () => []
    },
    nav: {
      type: String,
      default: ""
    }
  },
  components: {},
  methods: {
    // 改变分类
    changeClassfy() {
      // if条件下是英雄分类else条件下是物品分类
      if (this.nav === "英雄名") {
        if (this.radio !== "") {
          this.showList = this.infoList.filter(item => {
            return item.roles.includes(this.radio);
          });
        } else {
          this.showList = this.infoList;
        }
      } else {
        this.sonRadio = "";
        // console.log(this.sonRadio);
        this.classfyGroup.map((item1, index1) => {
          if (item1.faRole === this.radio) {
            this.sonIndex = index1;
          }
        });
        if (this.radio !== "") {
          let arr = this.radio.split(",");
          this.showList = [];
          arr.map(item0 => {
            let utilArr = [];
            utilArr = this.infoList.filter(item => {
              return item.types.includes(item0);
            });
            this.showList = this.showList.concat(utilArr);
          });
        } else {
          this.showList = this.infoList;
        }
      }
    },
    // 改变子分类
    sonClassfy() {
      if (this.sonRadio !== "") {
        this.showList = this.infoList.filter(item => {
          return item.types.includes(this.sonRadio);
        });
      }
    },
    // 悬浮框的显示
    showFloat(item, idx) {
      this.floatObj = item;
      // console.log(this.floatObj);
      this.floatNum = idx;
    },
    // 关闭悬浮框
    closeFloat() {
      this.floatNum = -1;
      this.floatObj = {};
    },
    // 悬浮框的移动
    changeFloat(e) {
      // console.log(e.x);
      if (e.x < 1010) {
        this.fTop = e.y + 20;
        this.fLeft = e.x + 20;
      } else {
        this.fTop = e.y + 20;
        this.fLeft = e.x - 510;
      }
    },
    // 递归处理合成表数据方法
    handleData(data, objs) {
      objs.children = [];
      data.from.map(item => {
        let sonObj = {};
        this.infoList.map(item0 => {
          if (item === item0.itemId) {
            sonObj = {
              name: item0.name,
              image_url: item0.iconPath
            };
            if (item0.from.length > 0) {
              sonObj.children = [];
              this.own(item0, sonObj);
            }
          }
        });
        objs.children.push(sonObj);
      });
      // console.log(objs);
    },
    own(dt, oj) {
      this.handleData(dt, oj);
    },
    // 英雄页跳转到英雄详情页
    jumpDetail(items) {
      if (this.nav === "英雄名") {
        this.$router.push({
          path: "/herodetail",
          query: { heroId: items.heroId }
        });
      }
    }
  },
  mounted() {
    if (this.infoList.length > 0) {
      this.showList = this.infoList;
      // console.log(this.showList);
    }
  },
  watch: {
    sVal(val) {
      if (val.trim() !== "") {
        this.radio = "";
      }
      if (this.nav === "英雄名") {
        this.showList = this.infoList.filter(item => {
          return (
            item.alias.toLowerCase().indexOf(val.trim()) !== -1 ||
            item.name.indexOf(val.trim()) !== -1 ||
            item.title.indexOf(val.trim()) !== -1
          );
        });
        // console.log(this.showList);
      } else {
        this.showList = this.infoList.filter(item0 => {
          return (
            item0.types
              .join(" ")
              .toLowerCase()
              .indexOf(val.trim()) !== -1 ||
            item0.name.indexOf(val.trim()) !== -1
          );
        });
        // console.log(this.showList);
      }
    }
  },
  computed: {
    // 子分类框的显示与隐藏
    showFlag() {
      if (this.classfyGroup[this.sonIndex].sonGroup.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // 合成表数据处理
    // 此处采用递归调用更佳
    treeData() {
      let obj = {
        name: this.floatObj.name,
        image_url: this.floatObj.iconPath
      };
      this.handleData(this.floatObj, obj);
      return obj;
    }
  },
  filters: {}
};
</script>

<style scoped lang='scss'>
.info-inner {
  .info-search {
    float: right;
    height: 40px;
    background: #fff;
    padding: 0 10px 0 8px;
    width: 24%;
  }
  .select-radios {
    float: left;
    margin-top: 10px;
    padding: 12px 20px;
    border: 1px solid #e1e1e1;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background: #fff;
    .sbg {
      top: -10px;
      left: 106px;
      display: block;
    }
    .commico-corner {
      width: 19px;
      height: 12px;
      background-position: -765px -102px;
    }
    .commspr {
      background-repeat: no-repeat;
      background-image: url(//game.gtimg.cn/images/lol/web201310/page.png?d=20131230);
    }
    // 攻击类
    .sbgmove2 {
      left: 202px;
    }
    // 法术类
    .sbgmove3 {
      left: 298px;
    }
    // 移动速度类
    .sbgmove4 {
      left: 394px;
    }
  }
  .info-main {
    margin-top: 70px;
    .info-item {
      float: left;
      width: 90px;
      height: 100px;
      margin-bottom: 22px;
      line-height: 15px;
      cursor: pointer;
      &:hover {
        .bg {
          display: block;
          display: flex;
        }
        .title {
          color: #00a383;
        }
      }
      img {
        width: 66px;
        height: 66px;
        margin: 0 12px 6px;
      }
      .title {
        color: #666;
      }
      .bg {
        top: 0;
        left: 12px;
        width: 66px;
        height: 66px;
        display: none;
        background: #00a383;
        opacity: 0.8;
        .el-icon-search {
          color: #fff;
          font-size: 24px;
        }
      }
      .float-box {
        position: fixed;
        width: 500px;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        .box-desc {
          .goods-img {
            width: 66px;
            height: 66px;
            margin: 0;
          }
          .more-infos {
            text-align: left;
            .goods-name {
              color: #54ff00;
            }
            .goods-price {
              color: #ca9033;
            }
          }
        }
        .item-desc {
          padding: 15px 0;
          border-bottom: 1px solid #222;
          color: #b0ddff;
          line-height: 16px;
          text-align: left;
        }
        .trees {
          .tree-title {
            width: 100%;
            height: 20px;
            text-align: left;
            margin-top: 5px;
            color: #f30;
          }
          .tree-table {
            /deep/.avat,
            img {
              width: 30px !important;
              height: 30px !important;
            }
            /deep/ .name {
              font-size: 12px !important;
            }
            /deep/ .node {
              width: 96px !important;
            }
            /deep/ .extend_handle::before {
              border: none !important;
            }
            /deep/ td {
              padding-bottom: 30px !important;
            }
          }
        }
      }
    }
  }
}
// 清除浮动
.info-inner::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>