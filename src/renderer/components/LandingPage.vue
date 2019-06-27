<template>
  <div id="wrapper">
    <main>
      <div>
        <span>
          Welcome!
        </span>
        <div class='button' id='lblVisualKeyboard-menu'><router-link v-bind:to="'/visual-keyboard'">Practise with Visual Keyboard</router-link></div>
        <div class='button' id='lblTypefast-menu'><router-link v-bind:to="'/typefast'">Play Typefast game</router-link></div>
        <div>
          <router-view></router-view>
        </div>
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
    methods: {
    }
  }
</script>

<style>
</style>

