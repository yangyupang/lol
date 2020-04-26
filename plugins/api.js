export default ({
    app
}, inject) => {
    let {
        $axios
    } = app
    $axios.interceptors.response.use(res => {
        return res.data
    })
    let api = {
            //物品
            getGoods() {
                return $axios.get('/game/items/items.js')
            },
            //英雄列表
            getHero() {
                return $axios.get('/game/heroList/hero_list.js')
            },
            //英雄详情
            getHeroDetails(id) {
                return $axios.get(`/game/hero/${id}.js`)
            },
            // //符文
            // getRune() {
            //     return $axios.get(`https://lol.qq.com/act/a20170926preseason/data/cn/runes.json`)
            // }
            //专题
            // hero-modules 头部数据
            //latest-modules 最新
            //trending-modules 精选
            //featured-champions
            //featured-factions 底部数据
            getExplore() {
                return $axios.get(`/api/v1/zh_cn/explore/index.json`)
            },
            //地区
            getRegion() {
                return $axios.get(`/api/v1/zh_cn/faction-browse/index.json`)
            },
            //地区详情
            getRegionDetail(slug) {
                return $axios.get(`/api/v1/zh_cn/factions/${slug}/index.json`)
            },
            getRole() {
                return $axios.get(`/api/v1/zh_cn/champion-browse/index.json`)
            },
            //角色详情
            getRoleDetail(slug) {
                return $axios.get(`/api/v1/zh_cn/champions/${slug}/index.json`)
            }
        }
        // 全局注入 拥有了一个this.$api对象
    inject('api', api)
}