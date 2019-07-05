<template>
  <main>
    <h1>khmer-typing</h1>
    <p>{{ $t("Khmer-Typing was developped by a team working for the french NGO Passerelles Numériques (meaning 'Digital Bridges'). Our mission is to provide education, technical and professional training in the digital sector to young underprivileged people by leveraging their potential and willpower.") }}</p>
    <img
      src="static/images/PN_Logo.png"
      all="Passerelles Numeriques logo"
    >
    <p>{{ $t("This project was born is PN's cambodian school, as a way to facilitate the learning of khmer typing for students. In order for it to benefit to as many people as possible, we then decided to make it open source and available on Windows and Linux stores.") }}</p>
    <hr>
    <div id="aboutLinks">
      <a
        href="https://www.passerellesnumeriques.org/"
        target="_blank"
      >Passerelles Numériques</a>
      <a
        href="https://github.com/passerelles-numeriques/khmer-typing"
        target="_blank"
      >Github</a>
      <a
        href="https://snapcraft.io/khmer-typing"
        target="_blank"
      >Linux store (Snapraft)</a>
      <a>Windows store</a>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'About'
  }
</script>

<style lang="scss" scoped>
img {
  height: 10vh;
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
