module.exports = {
    publicPath: '/youtube-top10',
    outputDir: 'docs',
    chainWebpack: config => {
        config.plugins.delete('prefetch'); // prefetch 삭제
        // prefetch 기능을 삭제해도 Lazy Load 사용 가능
        // 컴포넌트 import 시 아래와 같이 처리
        // import(/* webpackPrefetch: true */ './views/XXX.vue');
    },
    devServer: {
        proxy: {
            "/": {
                target: 'https://youtube.com/',
                changeOrigin: true
            }
        }
    }
}