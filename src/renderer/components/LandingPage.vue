<template>
  <div class="wrapper">
    <main>
      <h1 id="lblWelcome">Welcome!</h1>
      <p id="lblDescription">Choose what you would like to do to practise Khmer typing today.</p>
      <br>
      <router-link
        class="button"
        id="lblVisualKeyboard-menu"
        v-bind:to="'/visual-keyboard'"
      >Practise with Visual Keyboard</router-link>
      <br>
      <router-link class="button" id="lblTypefast-menu" v-bind:to="'/typefast'">Play Typefast game</router-link>
      <div>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import VisualKeyboard from './VisualKeyboard/VisualKeyboard'
import Typefast from './Typefast/Typefast'

export default {
  name: 'landing-page',
  components: { VisualKeyboard, Typefast },
  methods: {}
}
</script>

<style>
</style>

