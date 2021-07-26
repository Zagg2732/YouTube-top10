import { createStore } from 'vuex'
import persistedstate from 'vuex-persistedstate'

const store = createStore({
    state() {
        return {
            region: '',
            lang: ''
        }
    },
    getters: {
        getRegion: state => {
            return state.region;
        },
        getLang: state => {
            return state.lang;
        }
    },
    mutations: {
        setRegion(state, data) {
            state.region = data;
        },
        setLang(state, data) {
            state.lang = data;
        }
    },
    actions: {
        async defaultRegion({commit}) {
            await fetch('https://ipapi.co/country_code/')
                .then(res => {
                    res.text().then(txt => {
                        commit('setRegion', txt);
                    });
                }).catch(e => {
                    console.log(e);
                });
        },
        defaultLang({commit}) {
            let lang;
            if(navigator.appName == 'Netscape') {
                lang = navigator.language;
            }else {
                lang = navigator.userLanguage;
            }
            commit('setLang', lang.substring(0, 2));
        },
        setRegion({commit}, region) {
            commit('setRegion', region)
        },
        setLang({commit}, lang) {
            commit('setLang', lang)
        }
    },
    plugins: [
        persistedstate({
            paths: ['region', 'lang']
        })
    ]
})

export default store;