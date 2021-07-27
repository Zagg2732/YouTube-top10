<template>
  <div class="d-flex flex-column">
    <Header/>
    <div class="container-fluid">
      <div class="row d-flex flex-row justify-content-between g-5 w-100">
        <Sidebar v-on:changeCateId="changeCateId" class="col-sm-2 py-4"/>
        <Youtube ref="youtube" class="col-sm-10 py-4 vh-0"/>
      </div>
    </div>
  </div>
  <Footer/>

</template>
<script>
import Header from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";
import Footer from "@/layouts/Footer";
import Youtube from "@/views/Youtube";
import config from "@/config.yml";

export default {
  name: "YoutubeHot", //컴포넌트 이름
  components: {
    Header, Footer, Sidebar, Youtube
  }, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() {
    return {
      //YoutubeAPI Data
      part: "snippet,statistics", //api part, 변동없음
      chart: "mostPopular", //api chart, 변동없음
      maxResults: 10, //불러올 영상 갯수
      videoCategoryId: 0, // 불러올 카테고리, 0이면 실시간인기
    }
  },
  provide() {
    return {
      url : this.url
    };
  },
  computed: {
    url() {
      //api불러올 url
      return `https://www.googleapis.com/youtube/v3/videos?part=${this.part}&chart=${this.chart}&key=${config.youtubeKey}&regionCode=${this.region}&maxResults=${this.maxResults}&videoCategoryId=${this.videoCategoryId}`;
    },
    region() { //지역정보
      return this.$store.getters.getRegion
    },
    regionTest() {
      let defRegion = this.$store.getters.getRegion === '' || this.$store.getters.getRegion === undefined;
      return defRegion ? this.$store.dispatch('defaultRegion') : this.$store.getters.getRegion;
    },
    langTest() {
      let defLang = this.$store.getters.getLang === '' || this.$store.getters.getLang === undefined;
      return defLang ? this.$store.dispatch('defaultLang') : this.$store.getters.getLang;
    }
  },
  watch: {
    url() { //url 값 변동시 getList()를 다시 실행시킴
      this.$refs.youtube.getList(this.url);
    },
    region() {
      this.$refs.youtube.getList(this.url);
    }
  },
  methods: {
    changeCateId(cateId) {
      this.videoCategoryId = cateId
    }
  }
}

</script>
<style>

table {
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
