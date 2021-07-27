<template>
  <div class="row">
    <div class="col-lg-3 col-md-6"  :key="i" v-for="(product, i) in list">
          <div class="mb-4 card"><a v-bind:href="'https://youtu.be/'+ product.id"><img class="card-img-top" v-bind:src="product.snippet.thumbnails.high.url" alt="Card image cap"/></a>
            <div class="card-body">
              <div class="card-title h5">{{ product.snippet.title }}</div>
              <p class="card-text"></p></div>
            <div class="list-group list-group-flush">
              <div class="text-muted list-group-item" v-html="'조회수 : ' + product.statistics.viewCount" ></div>
              <div class="text-muted list-group-item" v-html="'👍 ' + product.statistics.likeCount + ' 👎 ' + product.statistics.dislikeCount + ' ✍ ' + product.statistics.commentCount "  ></div>
            </div>
            <!--        <div class="card-body"><a class="card-link" href="#">Card link</a><a class="card-link" href="#">Another link-->
            <!--          here</a></div>-->
          </div>
        </div>
  </div>
</template>

<script>
import config from "@/config.yml";

export default {
  name: "Youtube", //컴포넌트 이름
  components: {}, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() {
    return {
      //YoutubeAPI Data
      part: "snippet,statistics", //api part, 변동없음
      chart: "mostPopular", //api chart, 변동없음
      maxResults: 10, //불러올 영상 갯수
      videoCategoryId: 0, // 불러올 카테고리, 0이면 실시간인기
      list: [], //불러온 api를 담을 list
      regions: ''
    };
  },
  computed: {
    url() {
      //api불러올 url
      return `https://www.googleapis.com/youtube/v3/videos?part=${this.part}&chart=${this.chart}&key=${config.youtubeKey}&regionCode=${this.region}&maxResults=${this.maxResults}&videoCategoryId=${this.videoCategoryId}`;
    },
    region() { //지역정보
      return this.$store.getters.getRegion
    }
  },
  watch: {
    url() { //url 값 변동시 getList()를 다시 실행시킴
      this.getList();
    },
    region() {
      this.getList();
    }
  },
  created() { //컴포넌트가 생성되면 실행
    this.getList();
  },
  mounted() {
    this.$emit("testfunc", "안녕 ㅋㅋ") //test emit
    this.getRegions();
  },
  methods: {
    async getList() { //api호출
      this.list = await this.$api(this.url, "get");
      this.list = this.list.items;
      console.log(this.list)
    },
    async getRegions() {
      const params = {
        'key': `${config.youtubeKey}`
      }
      this.regions = await this.$api('https://www.googleapis.com/youtube/v3/i18nRegions', "get", params);
      this.regions = this.regions.items
      console.log(this.regions)

      // this.regions = this.regions.items;
      // console.log(this.regions)
    }
  }
}
</script>

<style scoped>

</style>

