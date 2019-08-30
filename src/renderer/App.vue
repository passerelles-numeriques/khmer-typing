<template>
  <div class="container">
    <nav>
      <div class="top-nav row">
        <div>
          <router-link
            class="nav-item"
            :to="'/'"
          >
            {{ $t("Home") }}
          </router-link>
          <router-link
            class="nav-item"
            :to="'/about'"
          >
            {{ $t("About") }}
          </router-link>
        </div>
        <div>
          <select v-model="$i18n.locale">
            <option
              v-for="(lang, i) in langs"
              :key="`Lang${i}`"
              :value="lang"
            >
              {{ languages[lang] }}
            </option>
          </select>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'KhmerTyping',
    data () {
      return {
        langs: ['km', 'en', 'fr'],
        languages: {
          'km': 'ខ្មែរ',
          'en': 'English',
          'fr': '​Français'
        }
      }
    }
  }


</script>

<style>
@font-face {
  font-family: "Noto Sans Khmer";
  src: url("../../static/fonts/NotoSansKhmer-Regular.ttf") format("truetype");
}

body {
  margin: 0;
  padding: 0 30;
  font-family: "Noto Sans Khmer", Helvetica;
  background-color: #f5f5f5;
}

main {
margin: 0.5vw 2vw 2vw 2vw;
max-width: 90vw;
padding: 0 5vw;
border-radius: 5px;
border: solid #e8e8e8 1px;
text-align: center;
background-color: #fff;
}

hr {
border: 0;
height: 0;
border-top: 1px solid #e8e8e8;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

h1 {
  color: #3f51b5;
  margin: 1% 0 0 0;
}

h1 + p {
  margin: 1% 0 0 0;
}

select {
  margin: 10px;
  height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #ddd;
  font-size: 1em;
}

.top-nav {
  height: 45px;
  overflow: hidden;
  background-color: #3f51b5;
  width: 100%;
  margin: auto;
  justify-content: space-between;
}

.nav-item {
  float: left;
  color: #fff;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 1em;
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
  font-size: 1.5em;
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
