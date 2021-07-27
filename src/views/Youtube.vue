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
          </div>
        </div>
  </div>
</template>

<script>
import config from "@/config.yml";

export default {
  name: "Youtube", //컴포넌트 이름
  inject : ['url'],
  components: {}, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() {
    return {
      list: [], //불러온 api를 담을 list
      regions: ''
    };
  },
  created() { //컴포넌트가 생성되면 실행
    this.getList(this.url);
  },
  mounted() {
    this.getRegions();
  },
  methods: {
    async getList(url) { //api호출
      this.list = await this.$api(url, "get");
      this.list = this.list.items;
    },
    async getRegions() {
      const params = {
        'key': `${config.youtubeKey}`
      }
      this.regions = await this.$api('https://www.googleapis.com/youtube/v3/i18nRegions', "get", params);
      this.regions = this.regions.items
    },
  }
}
</script>

<style scoped>

</style>

