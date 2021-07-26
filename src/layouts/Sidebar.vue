<template>
  <div class="flex-shrink-0 p-3 bg-light shadow-lg multi-collapse" id="navbar-toggler-success">
    <div class="d-flex flex-column align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
      <label class="col-auto">
        지역 :
        <select v-model="selectRegion" class="form-select-sm">
          <option v-for="region of regionList" :key="region" :value="region">{{region}}</option>
        </select>
      </label>
      <label class="col-auto">
        언어 :
        <select v-model="selectLang" class="form-select-sm">
          <option v-for="lang of langList" :key="lang.name" :value="lang.hl">{{lang.name}}</option>
        </select>
      </label>
    </div>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Home
        </button>
        <div class="collapse show" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">Overview</a></li>
            <li><a href="#" class="link-dark rounded">Updates</a></li>
            <li><a href="#" class="link-dark rounded">Reports</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Dashboard
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">Overview</a></li>
            <li><a href="#" class="link-dark rounded">Weekly</a></li>
            <li><a href="#" class="link-dark rounded">Monthly</a></li>
            <li><a href="#" class="link-dark rounded">Annually</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Orders
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New</a></li>
            <li><a href="#" class="link-dark rounded">Processed</a></li>
            <li><a href="#" class="link-dark rounded">Shipped</a></li>
            <li><a href="#" class="link-dark rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-dark rounded">New...</a></li>
            <li><a href="#" class="link-dark rounded">Profile</a></li>
            <li><a href="#" class="link-dark rounded">Settings</a></li>
            <li><a href="#" class="link-dark rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
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
      selectRegion: this.$store.getters.getRegion,
      selectLang: this.$store.getters.getLang
    };
  },
  created() {
    this.getRegionList();
    this.getLangList();
  }, //컴포넌트가 생성되면 실행
  watch : {
    selectRegion() {
      this.$store.dispatch('setRegion', this.selectRegion)
    },
    selectLang() {
      this.$store.dispatch('setLang', this.selectLang)
    }
  },
  methods: {
    async getRegionList() {
      const params = {
        'key': config.youtubeKey
      }
      const res = await this.$api('https://www.googleapis.com/youtube/v3/i18nRegions', 'get', params);
      for(let i of res.items) {
        this.regionList.push(i.id);
      }
    },
    async getLangList() {
      const params = {
        'key': config.youtubeKey,
        'part': 'snippet'
      }
      const res = await this.$api('https://www.googleapis.com/youtube/v3/i18nLanguages', 'get', params);
      for(let i of res.items) {
        this.langList.push(i.snippet);
      }
    }
  }, //컴포넌트 내에서 사용할 메소드 정의
}
</script>

<style scoped>

</style>