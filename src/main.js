import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import mixins from "@/mixins"
import language from "/src/locales/language.json"

//Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'bootstrap/dist/css/bootstrap.min.css'

const messages = language
let loc = 'kr';

const i18n = createI18n({
    locale: loc, // set locale
    fallbackLocale: 'en', // set fallback locale
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mixin(mixins);
app.mount('#app')