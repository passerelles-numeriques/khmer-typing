<template>
  <div id="app">
    <nav>
          <div class="top-nav">
              <div class='nav-item'><router-link id='lblHome' v-bind:to="'/'">Home</router-link></div>
          </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'khmer-typing'
  }
</script>

<style>
  @font-face {
    font-family: 'Noto Sans Khmer';
    src: url('./assets/fonts/NotoSansKhmer-Regular.ttf') format('truetype');
  }

  .wrapper {
    background-color: #353535;
    font: "Noto Sans Khmer";
  }

  body {
    margin: 0;
    font-family: 'Noto Sans Khmer', Arial, Helvetica, sans-serif;
  }

  .top-nav {
    overflow: hidden;
    background-color: #333;
  }

  .nav-item {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  .nav-item:hover {
    background-color: #ddd;
    color: black;
  }
</style>
