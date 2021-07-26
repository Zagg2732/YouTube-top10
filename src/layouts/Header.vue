<template>
  <!-- Header -->
  <nav id="main_nav" class="navbar navbar-expand-lg navbar-light bg-white shadow">
    <div class="container-fluid d-flex justify-content-between align-items-center mx-xxl-5">
      <a class="navbar-brand col-sm-1 ms-xl-1" href="index.html">
        <img src="https://youtube.com/about/static/svgs/icons/brand-resources/YouTube-logo-full_color_light.svg" class="img-fluid">
        <span class="text-dark align-top">TOP-10</span>
      </a>
      <button class="navbar-toggler border-0 align-items-end" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-controls="navbarSupportedContent test-area" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

    </div>
  </nav>
  <!-- Close Header -->
</template>

<script>
export default {
  name: "Header", //컴포넌트 이름
  components: {}, //다른 컴포넌트 사용 시 import(배열로 등록)
  data() { //html과 js코드에서 사용할 데이터 변수 선언
    return {
      sampleData: ""
    };
  },
  setup() {
  }, //컴포지션 API
  created() {
  }, //컴포넌트가 생성되면 실행
  mounted() {
  }, //template에 정의된 html 코드가 랜더링된 후 실행
  unmounted() {
  }, //unmount가 완료된 후 실행
  methods: {} //컴포넌트 내에서 사용할 메소드 정의
}
</script>

<style scoped>

</style>