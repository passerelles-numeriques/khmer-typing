<template>
  <div id="wrapper">
    <main>
      <div>Welcome!</div>
      <router-link
        class="button"
        id="lblVisualKeyboard-menu"
        v-bind:to="'/visual-keyboard'"
      >Practise with Visual Keyboard</router-link>
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

