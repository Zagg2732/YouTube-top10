<template>
  <div class="d-flex flex-column">
    <Header/>
    <div class="container-fluid">
      <div class="row d-flex flex-row justify-content-between g-5 w-100">
        <Sidebar class="col-sm-2 py-4" />
        <Youtube class="col-sm-10 py-4 vh-0" />
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

export default {
  name: "YoutubeHot", //컴포넌트 이름
  components: {
    Header, Footer, Sidebar, Youtube
  }, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() {
    return {
      tempRegion: 'JP',
      tempLang: 'ja'
    }
  },
  provide() {
    return {
      test : 'test'
    };
  },
  computed: {
    regionTest() {
      let defRegion = this.$store.getters.getRegion === '' || this.$store.getters.getRegion === undefined;
      return defRegion ? this.$store.dispatch('defaultRegion') : this.$store.getters.getRegion;
    },
    langTest() {
      let defLang = this.$store.getters.getLang === '' || this.$store.getters.getLang === undefined;
      return defLang ? this.$store.dispatch('defaultLang') : this.$store.getters.getLang;
    }
  },
  methods : {
    testfunc : function (test) {
      console.log(test)
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
