<template>
  <main>
    <h1>{{ $t("Welcome!") }}</h1>
    <p>{{ $t("Choose what you would like to do to practice Khmer typing today.") }}</p>
    <br />
    <router-link
      class="button"
      v-bind:to="'/visualKeyboard'"
    >{{ $t("Practise with Visual Keyboard") }}</router-link>
    <br />
    <router-link class="button" v-bind:to="'/typefast'">{{ $t("Play Typefast game") }}</router-link>
    <br />
    <hr />
    <router-link class="button" v-bind:to="'/highScores'">{{ $t("View high scores") }}</router-link>
  </main>
</template>

<script>
export default {
  name: 'landingPage'
}
</script>
