<template>
  <main>
    <h1>{{ $t('highScores.title') }}</h1>
    <p>{{ $t("highScores.description") }}</p>
    <br>
    <hr>
    <h2>{{ $t('Visual Keyboard') }}</h2>
    <div v-if="vkaErrors">
      <p>
        <strong>{{ $t('highScores.accuracy') }}</strong>
        {{ $t('highScores.visualKeyboard', {runes: vkaRunes, time: vkaTime, errors: vkaErrors}) }}
      </p>
      <p>
        <strong>{{ $t('highScores.speed') }}</strong>
        {{ $t('highScores.visualKeyboard', {runes: vksRunes, time: vksTime, errors: vksErrors}) }}
      </p>
    </div>
    <p v-if="!vkaErrors">
      {{ $t("highScores.notPlayed") }}
    </p>
    <hr>
    <h2>{{ $t("Typing game") }}</h2>
    <p v-if="tfScore">
      {{ $t('highScores.typefast', {score: tfScore}) }}
    </p>
    <p v-if="!tfScore">
      {{ $t("highScores.notPlayed") }}
    </p>
  </main>
</template>

<script>
  export default {
    name: 'HighScores',
    data () {
      return {
        vkaErrors: localStorage.getItem('visualKeyboard.acc.errors'),
        vkaTime: localStorage.getItem('visualKeyboard.acc.time'),
        vkaRunes: localStorage.getItem('visualKeyboard.acc.runes'),
        vksErrors: localStorage.getItem('visualKeyboard.speed.errors'),
        vksTime: localStorage.getItem('visualKeyboard.speed.time'),
        vksRunes: localStorage.getItem('visualKeyboard.speed.runes'),
        tfScore: localStorage.getItem('typefast.score')
      }
    }
  }
</script>
