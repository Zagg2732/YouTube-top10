<template>
  <div class="flex-shrink-0 p-3 bg-light shadow-lg multi-collapse" id="navbar-toggler-success">
    <div class="d-flex flex-column align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <label class="col-auto">
        지역 :
        <select v-model="selectRegion" class="form-select-sm">
          <option v-for="region of regionList" :key="region" :value="region">{{ region }}</option>
        </select>
      </label>
      <label class="col-auto">
        언어 :
        <select v-model="selectLang" class="form-select-sm">
          <option v-for="lang of langList" :key="lang.name" :value="lang.hl">{{ lang.name }}</option>
        </select>
      </label>
    </div>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse"
                data-bs-target="#home-collapse" aria-expanded="true">
          Category
        </button>
        <div class="collapse show" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small" v-for="category of categoryList"
              :key="category.snippet.title" ref="categoryUL">
            <li><a @click="changeCateId(category.id)" class="link-dark rounded">{{ category.snippet.title }}</a></li>
          </ul>
        </div>
      </li>

      <li class="border-top my-3"></li>

    </ul>
  </div>
</template>

<script>
import config from '@/config.yml';

export default {
  name: "Sidebar", //컴포넌트 이름
  components: {}, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() { //html과 js코드에서 사용할 데이터 변수 선언
    return {
      regionList: [],
      langList: [],
      categoryList: [],
      selectRegion: this.$store.getters.getRegion,
      selectLang: this.$store.getters.getLang
    }
  },
  setup() {
  }, //컴포지션 API
  created() {
    this.getRegionList();
    this.getLangList();
    this.getCategoryList();
  }, //컴포넌트가 생성되면 실행
  mounted() {
  }, //template에 정의된 html 코드가 랜더링된 후 실행
  unmounted() {
  }, //unmount가 완료된 후 실행
  methods: {
    changeCateId(cateId) { //카테고리변경
      console.log(cateId)
    },
    async getRegionList() {
      const params = {
        'key': config.youtubeKey
      }
      const res = await this.$api('https://www.googleapis.com/youtube/v3/i18nRegions', 'get', params);
      for (let i of res.items) {
        this.regionList.push(i.id);
      }
    },
    async getLangList() {
      const params = {
        'key': config.youtubeKey,
        'part': 'snippet'
      }
      const res = await this.$api('https://www.googleapis.com/youtube/v3/i18nLanguages', 'get', params);
      for (let i of res.items) {
        this.langList.push(i.snippet);
      }
    },
    async getCategoryList() {
      const params = {
        'key': config.youtubeKey,
        'part': 'snippet',
        'regionCode': this.$store.getters.getRegion,
        'hl': this.$store.getters.getLang
      }
      const res = await this.$api('https://www.googleapis.com/youtube/v3/videoCategories', 'get', params);
      this.categoryList.splice(0);
      for (let i of res.items) {
        if (i.snippet.assignable == true) {
          this.categoryList.push(i);
        }
      }
      console.log(this.categoryList);
    }
  }, //컴포넌트 내에서 사용할 메소드 정의
  watch: {
    selectRegion() {
      this.$store.dispatch('setRegion', this.selectRegion)
      this.getCategoryList();
    },
    selectLang() {
      this.$store.dispatch('setLang', this.selectLang)
      this.getCategoryList();
    }
  }
}
</script>

<style scoped>

</style>