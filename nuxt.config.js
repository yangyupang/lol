export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#fff'
    },
    /*
     ** Global CSS
     */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        'assets/common.css',
        'assets/reset.css'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/api',
        { src: '@/plugins/vueTreeChart', ssr: false }
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        proxy: true,
    },
    proxy: {
        '/api': {
            ws: false,
            target: 'https://yz.lol.qq.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
        '/game': {
            ws: false,
            target: 'https://game.gtimg.cn/images/lol/act/img/js',
            changeOrigin: true,
            pathRewrite: {
                '^/game': ''
            }
        },
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}