<template>
  <div id="app">
    <nav>
      <div class="top-nav">
        <router-link class="nav-item" id="lblHome" v-bind:to="'/'">Home</router-link>
        <router-link class="nav-item" id="lblAbout" v-bind:to="'/about'">About</router-link>
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
  font-family: "Noto Sans Khmer";
  src: url("./assets/fonts/NotoSansKhmer-Regular.ttf") format("truetype");
}

body {
  margin: 0;
  font-family: "Noto Sans Khmer", Arial, Helvetica, sans-serif;
}

.top-nav {
  overflow: hidden;
  background-color: #3f51b5;
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
  color: #3f51b5;
}

button,
.button {
  border: none;
  background-color: #2197f3;
  box-shadow: 0px 5px 0px 0px #3f51b5;
  outline: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 22px;
  text-decoration: none;
  margin: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
  cursor: pointer;
}

button:active,
.button:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 1px 0px 0px;
}
</style>
