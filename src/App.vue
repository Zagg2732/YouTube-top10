<template>
  <div id="nav">
    <div class="hello">
      <p>{{ $t("message.hello") }}</p>
    </div>
    <button type="button" @click="getList">YoutubeApi콘솔찍기</button>
    <button type="button" @click="regionchangetest">지역변경테스트</button>
    <button type="button" @click="maxchangetest">불러오는갯수테스트</button>
    <button type="button" @click="vedioCategoryTest">카테고리변경</button>
  </div>
  <div class="row">
    <div class="col-lg-3 col-md-6 h-100"  :key="i" v-for="(product, i) in list">
      <h1>{{i+1}}</h1>
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
<!--  <div>-->
<!--    <b-table striped hover>-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>유튜브 주소</th>-->
<!--        <th>썸네일</th>-->
<!--        <th>유튜브 제목</th>-->
<!--        <th>조회수</th>-->
<!--        <th>좋아</th>-->
<!--        <th>싫어</th>-->
<!--        <th>댓글</th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr :key="i" v-for="(product, i) in list">-->
<!--        <td><a v-bind:href="'https://youtu.be/'+ product.id">바로가기(아이콘)</a></td>-->
<!--        <td><img v-bind:src="product.snippet.thumbnails.default.url"/></td>-->
<!--        <td>{{ product.snippet.title }}</td>-->
<!--        <td>{{ product.statistics.viewCount }}</td>-->
<!--        <td>{{ product.statistics.likeCount }}</td>-->
<!--        <td>{{ product.statistics.dislikeCount }}</td>-->
<!--        <td>{{ product.statistics.commentCount }}</td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </b-table>-->
<!--  </div>-->
</template>
<script>
import config from "@/config.yml"

export default {
  name: "YoutubeHot", //컴포넌트 이름
  components: {}, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() {
    return {
      //YoutubeAPI Data
      part: "snippet,statistics", //api part, 변동없음
      chart: "mostPopular", //api chart, 변동없음
      maxResults: 10, //불러올 영상 갯수
      region: "KR",   //불러올 지역이름
      videoCategoryId: 0, // 불러올 카테고리, 0이면 실시간인기
      list: [] //불러온 api를 담을 list
    };
  },
  computed: {
    url() {
      //api불러올 url
      return `https://www.googleapis.com/youtube/v3/videos?part=${this.part}&chart=${this.chart}&key=${config.youtubeKey}&regionCode=${this.region}&maxResults=${this.maxResults}&videoCategoryId=${this.videoCategoryId}`;
    },
  },
  watch: {
    url() { //url 값 변동시 getList()를 다시 실행시킴
      this.getList();
    },
  },
  created() { //컴포넌트가 생성되면 실행
    this.getList();
  },
  methods: {
    regionchangetest() {
      if (this.region == 'JP') {
        this.region = 'KR';
      } else {
        this.region = 'JP';
      }
    },
    maxchangetest() {
      if (this.maxResults == 10) {
        this.maxResults = 20;
      } else {
        this.maxResults = 10;
      }
    },
    vedioCategoryTest() {
      if (this.videoCategoryId == 0) {
        this.videoCategoryId = 2;
      } else {
        this.videoCategoryId = 0;
      }
    },
    async getList() { //api호출
      this.list = await this.$api(this.url, "get");
      this.list = this.list.items;
      console.log(this.list)
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
