<template>
  <div id="nav">
    <router-link to="/">Hot</router-link>
    |
    <router-link to="/hot">hot</router-link>
    |
    <button type="button" @click="getList">YoutubeApi콘솔찍기</button>
    <button type="button" @click="regionchangetest">지역변경테스트</button>
    <button type="button" @click="maxchangetest">불러오는갯수테스트</button>
  </div>
  <div>
    <table>
      <thead>
      <tr>
        <th>유튜브 주소</th>
        <th>썸네일</th>
        <th>유튜브 제목</th>
        <th>조회수</th>
        <th>좋아</th>
        <th>싫어</th>
        <th>댓글</th>
      </tr>
      </thead>
      <tbody>
      <tr :key="i" v-for="(product, i) in list">
        <td><a v-bind:href="'https://youtu.be/'+ product.id">바로가기(아이콘)</a></td>
        <td><img v-bind:src="product.snippet.thumbnails.default.url"/></td>
        <td>{{ product.snippet.title}}</td>
        <td>{{ product.statistics.viewCount}}</td>
        <td>{{ product.statistics.likeCount}}</td>
        <td>{{ product.statistics.dislikeCount}}</td>
        <td>{{ product.statistics.commentCount}}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <router-view/>
</template>
<script>
import config from "@/config.yml"

export default {
  name: "YoutubeHot", //컴포넌트 이름
  components: {}, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() {
    return {
      //YoutubeAPI Data
      part : "snippet,statistics", //api part, 변동없음
      chart : "mostPopular", //api chart, 변동없음
      maxResults : 10, //불러올 영상 갯수
      region : "KR",   //불러올 지역이름
      videoCategryId : null, // 불러올 카테고리, null이면 실시간인기
      list: [] //불러온 api를 담을 list
    };
  },
  computed : {
    url() {
      //api불러올 url
      return `https://www.googleapis.com/youtube/v3/videos?part=${this.part}&chart=${this.chart}&key=${config.youtubeKey}&regionCode=${this.region}&maxResults=${this.maxResults}`;
    },
  },
  watch : {
    url() { //url 값 변동시 getList()를 다시 실행시킴
      this.getList();
    }
  },
  created() { //컴포넌트가 생성되면 실행
    this.getList();
  },
  methods: {
    regionchangetest() {
      if(this.region == 'JP') {
        this.region = 'KR';
      } else {
        this.region = 'JP';
      }
    },
    maxchangetest() {
      if(this.maxResults == 10) {
        this.maxResults = 20;
      } else {
        this.maxResults = 10;
      }
    },
    async getList() {
      this.list = await this.$api(this.url, "get");
      this.list = this.list.items;

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
