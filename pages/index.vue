<template>
  <div>
    <!-- 头部导航栏 -->
    <commonNav></commonNav>
    <!-- 头部广告 -->
    <topact></topact>
    <!-- 中间内容层 -->
    <el-main style="background: #f7f8f8;">
      <div class="container">
        <!-- 头部tabs栏 -->
        <div class="pagetab p-r">
          <div class="nav-list fl p-a">
            <div
              class="nav-item t-center"
              :class="navNum === index?'is_active':''"
              v-for="(item,index) in indexNav"
              :key="index"
              @click="changeNav(index)"
            >{{item.navTitle}}</div>
          </div>
        </div>
        <!-- 下方内容层 -->
        <div class="info-box">
          <boxDemo :infoList="heroList" nav="英雄名" :classfyGroup="heroGroup" v-if="navNum === 0"></boxDemo>
          <boxDemo :infoList="goodsList" nav="物品" :classfyGroup="goodsGroup" v-if="navNum === 1"></boxDemo>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import commonNav from "../components/common/commonNav";
import topact from "../components/common/topact";
import boxDemo from "../components/common/boxDemo";
export default {
  data() {
    return {
      // 当前导航栏选中项(添加类名参数)
      navNum: 0,
      // 首页导航栏
      indexNav: [
        {
          navTitle: "英雄"
        },
        {
          navTitle: "物品"
        },
        {
          navTitle: "召唤师技能"
        },
        {
          navTitle: "符文"
        },
        {
          navTitle: "云顶之弈"
        }
      ],
      // 英雄分类参数
      heroGroup: [
        {
          faTitle: "所有英雄",
          faRole: ""
        },
        {
          faTitle: "战士",
          faRole: "fighter"
        },
        {
          faTitle: "法师",
          faRole: "mage"
        },
        {
          faTitle: "刺客",
          faRole: "assassin"
        },
        {
          faTitle: "坦克",
          faRole: "tank"
        },
        {
          faTitle: "射手",
          faRole: "marksman"
        },
        {
          faTitle: "辅助",
          faRole: "support"
        }
      ],
      // 物品分类参数
      goodsGroup: [
        {
          faTitle: "所有物品",
          faRole: "",
          sonGroup: []
        },
        {
          faTitle: "防御类",
          faRole: "Health,HealthRegen,Armor,SpellBlock",
          sonGroup: [
            {
              sonTitle: "生命值",
              sonRole: "Health"
            },
            {
              sonTitle: "生命回复",
              sonRole: "HealthRegen"
            },
            {
              sonTitle: "护甲",
              sonRole: "Armor"
            },
            {
              sonTitle: "魔法抗性",
              sonRole: "SpellBlock"
            }
          ]
        },
        {
          faTitle: "攻击类",
          faRole: "LifeSteal,CriticalStrike,AttackSpeed,Damage",
          sonGroup: [
            {
              sonTitle: "生命偷取",
              sonRole: "LifeSteal"
            },
            {
              sonTitle: "暴击",
              sonRole: "CriticalStrike"
            },
            {
              sonTitle: "攻击速度",
              sonRole: "AttackSpeed"
            },
            {
              sonTitle: "攻击力",
              sonRole: "Damage"
            }
          ]
        },
        {
          faTitle: "法术类",
          faRole: "Mana,SpellDamage,CooldownReduction, ManaRegen",
          sonGroup: [
            {
              sonTitle: "法力值",
              sonRole: "Mana"
            },
            {
              sonTitle: "法术强度",
              sonRole: "SpellDamage"
            },
            {
              sonTitle: "冷却缩减",
              sonRole: "CooldownReduction"
            },
            {
              sonTitle: "法力回复",
              sonRole: "ManaRegen"
            }
          ]
        },
        {
          faTitle: "移动速度",
          faRole: "Boots,NonbootsMovement",
          sonGroup: [
            {
              sonTitle: "鞋子",
              sonRole: "Boots"
            },
            {
              sonTitle: "其他移动速度物品",
              sonRole: "NonbootsMovement"
            }
          ]
        },
        {
          faTitle: "消耗品",
          faRole: "Consumable",
          sonGroup: []
        }
      ]
    };
  },
  components: {
    commonNav,
    topact,
    boxDemo
  },
  methods: {
    // 切换tabs栏
    changeNav(idx) {
      if (idx > 1) {
        this.$notify.info({
          title: "开发中",
          message: "暂未开发，敬请期待"
        });
      } else {
        // 重新加载子组件
        this.navNum = -1;
        this.$nextTick(() => {
          this.navNum = idx;
        });
      }
    }
  },
  async asyncData(ctx) {
    let api = ctx.app.$api;
    let hero = api.getHero();
    let goods = api.getGoods();
    let res = await Promise.all([hero, goods]);
    return {
      heroList: res[0].hero,
      goodsList: res[1].items
    };
  },
  mounted() {},
  watch: {},
  computed: {},
  filters: {}
};
</script>

<style scoped lang='scss'>
.container {
  width: 1240px;
  min-height: 600px;
  margin: 0 auto;
  border: 1px solid #e1e1e1;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  .pagetab {
    border-top: 4px solid #d7d7d7;
    border-bottom: 1px solid #e2e2e2;
    height: 53px;
    background: #f0f0f0;
    .nav-list {
      top: -4px;
      .nav-item {
        border-top: 4px solid #d7d7d7;
        height: 53px;
        line-height: 48px;
        width: 160px;
        color: #525252;
        cursor: pointer;
        &:hover {
          border-top: 4px solid #00a383;
          color: #00a383;
        }
      }
      // 选中项样式
      .is_active {
        text-decoration: none;
        background: #fff;
        border-top: 4px solid #00a383;
        color: #00a383;
      }
    }
  }
  .info-box {
    min-height: 500px;
    padding: 30px 37px 30px 30px;
  }
  .info-box::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
</style>