<template>
  <main>
    <h1>{{ $t('highScores.title')}}</h1>
    <p>{{ $t("highScores.description")}}</p>
    <br />
    <hr />
    <h2>{{ $t('Visual Keyboard')}}</h2>
    <p
      v-if="vkErrors"
    >{{ $t('highScores.visualKeyboard', {runes: vkRunes, time: vkTime, errors: vkErrors}) }}</p>
    <p v-if="!vkErrors">{{ $t("highScores.notPlayed") }}</p>
    <hr />
    <h2>{{ $t("Typing game") }}</h2>
    <p v-if="tfScore">{{ $t('highScores.typefast', {score: tfScore}) }}</p>
    <p v-if="!tfScore">{{ $t("highScores.notPlayed") }}</p>
    <hr />
  </main>
</template>

<script>
  export default {
    name: 'highScores',
    data () {
      return {
        vkErrors: localStorage.getItem('visualKeyboard.errors'),
        vkTime: localStorage.getItem('visualKeyboard.time'),
        vkRunes: localStorage.getItem('visualKeyboard.runes'),
        tfScore: localStorage.getItem('typefast.score')
      }
    }
  }
</script>