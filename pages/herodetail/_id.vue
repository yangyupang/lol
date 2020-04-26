<template>
  <div>
    <!-- 头部导航栏 -->
    <commonNav></commonNav>
    <!-- 头部广告 -->
    <topact></topact>
    <el-main style="background: #f7f8f8;">
      <div class="container">
        <div class="infodefail">
          <div class="defail-data">
            <h1>{{heroDetail.name}}</h1>
            <h2>{{heroDetail.title}}</h2>
            <div class="defail-tags">
              <span v-for="(item,index) in heroDetail.roles" :key="index">{{item|tag}}</span>
            </div>
            <dl class="defail-stat">
              <dt>物理攻击</dt>
              <dd>
                <i class="up up1" :title="heroDetail.attack" :style="{width:attackNum+'%'}"></i>
              </dd>
              <dt>魔法攻击</dt>
              <dd>
                <i class="up up2" :title="heroDetail.magic" :style="{width:magicNum+'%'}"></i>
              </dd>
              <dt>防御能力</dt>
              <dd>
                <i class="up up3" :title="heroDetail.defense" :style="{width:defenseNum+'%'}"></i>
              </dd>
              <dt>上手难度</dt>
              <dd>
                <i class="up up4" :title="heroDetail.difficulty" :style="{width:difficultyNum+'%'}"></i>
              </dd>
            </dl>
            <div class="defail-buy">
              <div class="commspr commbtn-buy"></div>
            </div>
          </div>
          <span class="sbg"></span>
          <div class="defail-skin">
            <ul class="defail-skin-bg" :style="{left: distance+'px'}">
              <li v-for="(item,index) in skinsArr" :key="index" :title="item.name">
                <img :src="item.mainImg" :alt="item.name" />
              </li>
            </ul>
            <div class="defail-skin-nav">
              <div class="defail-skin-name">
                <span></span>
              </div>
              <ul>
                <li
                  v-for="(item,index) in skinsArr"
                  :key="index"
                  :class="selectSkin===index?'current':''"
                  @click="select(index)"
                >
                  <a :title="item.name">
                    <img style="width:60px;height:60px" :src="item.iconImg" :alt="item.name" />
                    <span class="sbor"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clearfix">
          <div class="infoleftcont">
            <h4 class="infotitle">背景故事</h4>
            <div class="colbox bgstroy">
              <div :class="[txtIsOver?'t-over-4':'']">{{heroDetail.shortBio}}</div>
              <a v-if="txtIsOver" @click="isOver">查看更多...</a>
              <a v-else @click="isOver">收起...</a>
            </div>
            <h4 class="infotitle">技能介绍</h4>
            <ul class="infotab">
              <li
                v-for="(item,index) in spellArr"
                :key="index"
                :class="spellIndex===index?'current':''"
                @click="spellChange(index)"
              >
                <img :src="item.abilityIconPath" alt />
              </li>
            </ul>
            <div
              class="colbox infoskillbox"
              v-for="(item,index) in spellArr"
              :key="index"
              :style="{display:(spellIndex===index?'block':'none')}"
            >
              <div class="skilltitle">
                <h5>{{item.name}}</h5>
                <em v-if="item.spellKey ==='passive'">被动技能</em>
                <em v-else-if="item.spellKey ==='q'">快捷键：Q</em>
                <em v-else-if="item.spellKey ==='w'">快捷键：W</em>
                <em v-else-if="item.spellKey ==='e'">快捷键：E</em>
                <em v-else-if="item.spellKey ==='r'">快捷键：R</em>
              </div>
              <p class="skilltip">{{item.description}}</p>
            </div>
            <h4 class="infotitle">使用技巧</h4>
            <div class="colbox arttips">
              <dl class="borlineX">
                <dt>当你使用{{heroDetail.name}}</dt>
                <dd v-for="(item,index) in heroDetail.allytips" :key="index">{{item}}</dd>
              </dl>
              <dl class="">
                <dt>敌人使用{{heroDetail.name}}</dt>
                <dd v-for="(item,index) in heroDetail.enemytips" :key="index">{{item}}</dd>
              </dl>
            </div>
          </div>
          <div class="inforightcont">
            <div class="clearfix infotitle">
              <h4>我的记录</h4>
            </div>
            <div class="colbox">
              <div class="pageuserline-shout">您无法查看使用该英雄的记录，请[登陆]，并绑定所在大区。</div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import commonNav from "../../components/common/commonNav";
import topact from "../../components/common/topact";
export default {
  data() {
    return {
      // 技能介绍
      spellArr: [],
      // 皮肤
      skinsArr: [],
      //英雄其他介绍
      //allytips [] 当你使用黑暗之女
      //enemytips [] 敌人使用黑暗之女
      //shortBio 背景故事
      //attack 物理攻击
      //magic 魔法攻击
      //defense 防御能力
      //difficulty 上手难度
      heroDetail: {},
      selectSkin: 0,
      distance: 0,
      txtIsOver: true,
      spellIndex: 0
    };
  },
  components: {
    commonNav,
    topact
  },
  methods: {
    getHerodetail(heroId) {
      this.$api
        .getHeroDetails(heroId)
        .then(res => {
          let numArr = [1, 2, 4, 0, 3];
          numArr.map(item => {
            this.spellArr.push(res.spells[item]);
          });
          // this.skinsArr = res.skins;
          this.heroDetail = res.hero;
          //皮肤处理
          this.skinsArr = res.skins.filter(item => {
            return item.chromasBelongId === "0";
          });
          // console.log(res);
          // console.log(this.spellArr);
          // console.log(this.skinsArr);
          console.log(this.heroDetail);
        })
        .catch(err => {
          console.log(err);
        });
    },
    select(index) {
      this.selectSkin = index;
      if (index !== 0) {
        this.distance = 0 - index * 1240;
      } else {
        this.distance = 0;
      }
    },
    isOver() {
      this.txtIsOver = !this.txtIsOver;
    },
    spellChange(index) {
      this.spellIndex = index;
    }
  },
  mounted() {
    this.getHerodetail(this.$route.query.heroId);
    // console.log(this.$route.query.heroId);
  },
  watch: {},
  computed: {
    attackNum() {
      let Str = "";
      if (this.heroDetail.attack === "1") {
        Str = "10";
      } else if (this.heroDetail.attack === "2") {
        Str = "20";
      } else if (this.heroDetail.attack === "3") {
        Str = "30";
      } else if (this.heroDetail.attack === "4") {
        Str = "40";
      } else if (this.heroDetail.attack === "5") {
        Str = "50";
      } else if (this.heroDetail.attack === "6") {
        Str = "60";
      } else if (this.heroDetail.attack === "7") {
        Str = "70";
      } else if (this.heroDetail.attack === "8") {
        Str = "80";
      } else if (this.heroDetail.attack === "9") {
        Str = "90";
      } else if (this.heroDetail.attack === "10") {
        Str = "100";
      }
      return Str;
    },
    magicNum() {
      let Str = "";
      if (this.heroDetail.magic === "1") {
        Str = "10";
      } else if (this.heroDetail.magic === "2") {
        Str = "20";
      } else if (this.heroDetail.magic === "3") {
        Str = "30";
      } else if (this.heroDetail.magic === "4") {
        Str = "40";
      } else if (this.heroDetail.magic === "5") {
        Str = "50";
      } else if (this.heroDetail.magic === "6") {
        Str = "60";
      } else if (this.heroDetail.magic === "7") {
        Str = "70";
      } else if (this.heroDetail.magic === "8") {
        Str = "80";
      } else if (this.heroDetail.magic === "9") {
        Str = "90";
      } else if (this.heroDetail.magic === "10") {
        Str = "100";
      }
      return Str;
    },
    defenseNum() {
      let Str = "";
      if (this.heroDetail.defense === "1") {
        Str = "10";
      } else if (this.heroDetail.defense === "2") {
        Str = "20";
      } else if (this.heroDetail.defense === "3") {
        Str = "30";
      } else if (this.heroDetail.defense === "4") {
        Str = "40";
      } else if (this.heroDetail.defense === "5") {
        Str = "50";
      } else if (this.heroDetail.defense === "6") {
        Str = "60";
      } else if (this.heroDetail.defense === "7") {
        Str = "70";
      } else if (this.heroDetail.defense === "8") {
        Str = "80";
      } else if (this.heroDetail.defense === "9") {
        Str = "90";
      } else if (this.heroDetail.defense === "10") {
        Str = "100";
      }
      return Str;
    },
    difficultyNum() {
      let Str = "";
      if (this.heroDetail.difficulty === "1") {
        Str = "10";
      } else if (this.heroDetail.difficulty === "2") {
        Str = "20";
      } else if (this.heroDetail.difficulty === "3") {
        Str = "30";
      } else if (this.heroDetail.difficulty === "4") {
        Str = "40";
      } else if (this.heroDetail.difficulty === "5") {
        Str = "50";
      } else if (this.heroDetail.difficulty === "6") {
        Str = "60";
      } else if (this.heroDetail.difficulty === "7") {
        Str = "70";
      } else if (this.heroDetail.difficulty === "8") {
        Str = "80";
      } else if (this.heroDetail.difficulty === "9") {
        Str = "90";
      } else if (this.heroDetail.difficulty === "10") {
        Str = "100";
      }
      return Str;
    }
  },
  filters: {
    tag(val) {
      let name = "";
      if (val === "mage") {
        name = "法师";
      } else if (val === "fighter") {
        name = "战士";
      } else if (val === "assassin") {
        name = "刺客";
      } else if (val === "tank") {
        name = "坦克";
      } else if (val === "marksman") {
        name = "射手";
      } else if (val === "support") {
        name = "辅助";
      }
      return name;
    }
    // shortcuts(val) {
    //   let
    // }
  }
};
</script>

<style scoped lang='scss'>
.container {
  width: 1240px;
  min-height: 600px;
  margin: 0 auto;
}
.infodefail {
  height: 632px;
  position: relative;
  font-size: 12px;
  .defail-data {
    position: absolute;
    top: 50px;
    left: 40px;
    width: 290px;
    color: #fff;
    z-index: 3;
    h1 {
      font-size: 24px;
      line-height: 25px;
      padding-bottom: 25px;
      font-weight: 400;
    }
    h2 {
      font-size: 42px;
      padding-bottom: 30px;
    }
    .defail-tags {
      overflow: hidden;
      zoom: 1;
      span {
        float: left;
        width: 35px;
        height: 21px;
        line-height: 21px;
        margin-right: 5px;
        text-align: center;
        background: #00a483;
        border-radius: 5px;
      }
    }
    .defail-stat {
      margin-top: 25px;
      height: 90px;
      width: 150px;
      dt {
        float: left;
        width: 40%;
        margin-bottom: 5px;
        height: 16px;
        line-height: 16px;
      }
      dd {
        float: left;
        width: 60%;
        margin: 2px 0 7px;
        height: 12px;
        background: #363c3c;
      }
      .up {
        display: block;
        height: 12px;
      }
      .up1 {
        background: #f2c500;
      }
      .up2 {
        background: #f59d00;
      }
      .up3 {
        background: #2c97de;
      }
      .up4 {
        background: #1eca6b;
      }
    }
    .defail-buy {
      margin-top: 25px;
      cursor: pointer;
      .commspr {
        background-repeat: no-repeat;
        background-image: url(//game.gtimg.cn/images/lol/web201310/page.png?d=20131230);
      }
      .commbtn-buy {
        display: block;
        width: 153px;
        height: 40px;
        overflow: hidden;
        text-indent: -999em;
        background-position: -638px 0;
      }
    }
  }
  .sbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 305px;
    height: 100%;
    z-index: 2;
    background: #000;
    opacity: 0.6;
  }
  .defail-skin {
    width: 100%;
    height: 632px;
    overflow: hidden;
    position: relative;
    .defail-skin-bg {
      width: 20000px;
      position: relative;
      li {
        float: left;
        width: 1240px;
        img {
          width: 1240px;
          height: 632px;
        }
      }
    }
    .defail-skin-nav {
      position: absolute;
      bottom: 10px;
      right: 10px;
      padding-left: 306px;
      li {
        float: left;
      }
      a {
        display: block;
        width: 60px;
        height: 60px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        &:hover {
          img {
            opacity: 1;
          }
        }
      }
      img {
        opacity: 0.7;
      }
      .sbor {
        display: none;
        cursor: pointer;
      }
      .current {
        img {
          opacity: 1;
        }
        .sbor {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 60px;
          height: 60px;
          border: 4px solid #00a483;
        }
      }
    }
  }
}
.clearfix {
  zoom: 1;
}
.infoleftcont {
  float: left;
  width: 63%;
}
.inforightcont {
  float: right;
  width: 35%;
}
.infotitle {
  margin: 47px 0 15px;
  font-size: 16px;
  color: #338c7a;
  font-weight: 600;
}
.colbox {
  border: 1px solid #e1e1e1;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  background: #fff;
  .pageuserline-shout {
    padding: 35px 0 22px 20px;
    width: 311px;
    font-size: 12px;
    line-height: 18px;
  }
}
.bgstroy {
  padding: 28px 32px;
  font-size: 14px;
  line-height: 24px;
  text-indent: 2em;
  color: #666;
  a {
    cursor: pointer;
    line-height: 40px;
    color: #999;
  }
}
.infotab {
  overflow: hidden;
  height: 90px;
  position: relative;
  z-index: 2;
  li {
    float: left;
    padding: 13px 20px;
    cursor: pointer;
  }
  .current {
    border-top: 3px solid #00a383;
    padding: 10px 19px 13px;
    background: #fff;
    border-left: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
  }
}
.infoskillbox {
  padding: 20px 30px;
  margin-top: -1px;
  position: relative;
  z-index: 1;
  .skilltitle {
    padding-bottom: 10px;
    font-size: 14px;
    color: #999;
    h5 {
      display: inline;
      padding-right: 10px;
      font-size: 16px;
      color: #333;
      font-weight: 600;
    }
    em {
      font-style: normal;
    }
  }
  .skilltip {
    color: #333;
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 20px;
  }
}
.arttips {
  padding: 20px 30px 10px;
  dl {
    padding-bottom: 15px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }
  dt {
    font-size: 14px;
    font-weight: 700;
    color: #338c7a;
    padding-bottom: 8px;
  }
  dd {
    padding-bottom: 10px;
  }
}
.borlineX {
  border-bottom: 1px solid #eee;
}
</style>