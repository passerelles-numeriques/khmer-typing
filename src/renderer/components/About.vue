<template>
  <main>
    <h1>khmer-typing</h1>
    <p>{{ $t("Khmer-Typing was developped by a team working for the french NGO Passerelles Numériques (meaning 'Digital Bridges'). Our mission is to provide education, technical and professional training in the digital sector to young underprivileged people by leveraging their potential and willpower.") }}</p>
    <a
      href="https://www.passerellesnumeriques.org/"
      rel="noopener"
      target="_blank"
    >
      <img
        src="static/images/PN_Logo.jpg"
        all="Passerelles Numeriques logo"
      >
    </a>
    <p>{{ $t("This project was born in PN's cambodian school, as a way to facilitate the learning of khmer typing for students. In order for it to benefit to as many people as possible, we then decided to make it open source and available on Windows and Linux stores.") }}</p>
    <hr>
    <div id="aboutLinks">
      <a
        href="https://www.microsoft.com/store/apps/9MZTL2KK24P7"
        rel="noopener"
        target="_blank"
      >Windows store</a>
      <a
        href="https://snapcraft.io/khmer-typing"
        rel="noopener"
        target="_blank"
      >Snapraft (Linux store)</a>
      <a
        href="https://github.com/passerelles-numeriques/khmer-typing"
        rel="noopener"
        target="_blank"
      >Github</a>
      <a
        href="https://www.passerellesnumeriques.org/"
        rel="noopener"
        target="_blank"
      >Passerelles Numériques</a>
    </div>
    <hr />
    <p style="text-align:center">
      v{{ version }}
    </p>
  </main>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {
        version: process.env.VUE_APP_VERSION
      }
    }
  }
</script>

<style lang="scss" scoped>
img {
  height: 10vh;
  margin-top: 3%;
}
#aboutLinks {
  margin-top: 3%;
  display: flex;
  flex-direction: column;
}
a {
  margin: 1% auto;
}
</style>
