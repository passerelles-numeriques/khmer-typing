<template>
  <main>
    <h1>{{ $t("Typing game") }}</h1>
    <p>{{ $t("Type as many words as you can until time runs out!") }}</p>
    <button
      v-if="seconds == 0"
      @click="startGame"
    >
      {{ $t("Start") }}
    </button>
    <div v-if="seconds > 0">
      <div class="outerWrap">
        <div class="scoreWrap">
          <p>{{ $t("Score") }}</p>
          <span class="score">{{ score }}</span>
        </div>
        <div class="timeWrap">
          <p>{{ $t("Time left") }}</p>
          <span class="time">{{ seconds }}</span>
        </div>
      </div>
      <div class="wordsWrap">
        <p class="words">
          <span
            class="spans"
            v-for="span in spans"
            :key="span.id"
          >{{ span }}</span>
        </p>
      </div>
      <h3 class="buffer-title">
        {{ $t("What you are typing:") }}
      </h3>
      <div class="buffer">
        {{ buffer }}
      </div>
      <div
        id="keyboardWrap-tf"
        @click="zoomKeyboard"
      >
        <keyboard id="keyboard-tf" />
      </div>
    </div>
    <v-dialog />
  </main>
</template>

<script>
  import splitKhmerRunes from '../split-khmer'
  import keyboard from './VisualKeyboard/Keyboard'
  import {wordsList} from './words-list'

  export default {
    name: 'Typefast',
    components: {
      keyboard
    },
    data () {
      return {
        list: wordsList[this.$i18n.locale],
        score: 0,
        seconds: 0,
        spans: [],
        buffer: ''
      }
    },
    methods: {
      /**
       * Starts the game by running the timer, changing the DOM, setting th first word
       * and listenning to the user's typing inputs
       */
      startGame: function () {
        var timer
        this.seconds = 60
        this.score = 0
        // Start the timer
        clearInterval(timer)
        this.timer = timer = setInterval(() => {
          this.seconds--
          // Here is the end of the game, do something for final score
          if (this.seconds === 0) {
            this.spans = ''
            clearInterval(timer)
            this.endGame()
          }
        }, 1000)
        // Sets the first word to type
        this.random()
        this.buffer = ''
        // Listen to typing events
        document.onkeypress = this.typing
        document.onkeydown = this.clear
      },
      /**
       * Displays the modal with the scores
       * Also saves the highest score
       * In case user wants to play again, resets data
       */
      endGame: function () {
        // Store highest score
        var previousHighest = localStorage.getItem('typefast.score') ? localStorage.getItem('typefast.score') : 0
        if (this.score > previousHighest) {
          localStorage.setItem('typefast.score', this.score)
        }
        // Display end modal
        this.$modal.show('dialog', {
          title: this.$i18n.t('message.finishedPlaying'),
          text: this.$i18n.t('message.scoreTypeFast', { score: this.score }),
          buttons: [
            {
              title: this.$i18n.t('Home'),
              default: true, // Will be triggered by default if 'Enter' pressed.
              handler: () => {
                this.$router.push('landind-page')
              }
            },
            {
              title: this.$i18n.t('High scores'),
              handler: () => {
                this.$router.push('highScores')
              }
            },
            {
              title: this.$i18n.t('Play again'),
              default: true, // Will be triggered by default if 'Enter' pressed.
              handler: () => {
                this.$modal.hide('dialog')
                // Reset data
                this.score = 0
                this.seconds = 0
                this.spans = []
                this.buffer = ''
                this.startGame()
              }
            }
          ]
        })
      },
      /**
       * Selects a random word from the words list and displays it
       */
      random: function () {
        var random = Math.floor(Math.random() * (this.list.length))
        const word = this.list[random]
        let graphemes = splitKhmerRunes(word)
        this.spans = [] // resets spans
        for (let i = 0; i < graphemes.length; i++) { // building the word with spans around the letters
          this.spans.push(graphemes[i])
        }
      },
      /**
       * Clears buffer if DEL or backspace is pressed
       * @param e keydown event
       */
      clear: function (e) {
        switch (e.keyCode) {
          case 8:
            this.buffer = this.buffer.substring(0, this.buffer.length - 1)
            break
          case 46:
            this.buffer = this.buffer.substring(0, this.buffer.length - 1)
            break
        }
      },
      /**
       * Checks letter typed by the player, highlights it if it's correct and changes word
       * when one word is completly typed
       * @param e keypress event
       */
      typing: function (e) {
        var vue = this
        const noChars = ['Shift', 'Control', 'Alt', 'Tab', 'CapsLock', 'Home', 'PageUp',
          'PageDown', 'End', 'ScrollLock', 'Pause', 'Insert', 'Delete', 'Enter'
        ]
        let spans = document.getElementsByClassName('spans')
        if (!noChars.includes(e.key)) {
          let typed = e.key
          this.buffer += typed
          let graphemes = splitKhmerRunes(this.buffer)
          let lastGrapheme = graphemes[graphemes.length - 1]
          this.buffer = lastGrapheme // If more than one 'grapheme', it means that the ones before were wrong
          // Check all span elements one by one as each one contains one letter of the word
          for (let i = 0; i < spans.length; i++) {
            // Checks that the letter typed is the one we want
            if (spans[i].innerHTML === typed || spans[i].innerHTML === lastGrapheme) {
              if (spans[i].classList.contains('bg')) { // if it's alerady highlighted then check the next one
                continue
                // If it isn't highlighted yet and if the letter before is already highlighted (or if it's the first letter) (this is done to avoid
                // highlighting the letters who are not in order for being checked, for example if you have two "A"s it's to avoid marking both)
              } else if ((!spans[i].classList.contains('bg')) && ((spans[i - 1] === undefined) || (spans[i - 1].classList.contains('bg')))) {
                spans[i].classList.add('bg')
                break
              }
            }
          }
          // Check if the player has typed all the letters of the word
          var checker = 0
          for (var j = 0; j < spans.length; j++) {
            if (spans[j].className === 'spans bg') {
              checker++
            }
            if (checker === spans.length) {
              this.score++ // increment score and display it
              document.getElementsByClassName('words')[0].classList.add('fadeout') // make word disappears
              setTimeout(function () {
                vue.buffer = '' // resets buffers
                // Resets spans class so nothing is highlighted
                for (let k = 0; k < spans.length; k++) {
                  spans[k].classList = 'spans'
                }
                vue.random() // pick another word
                document.getElementsByClassName('words')[0].classList = 'words'
              }, 200) // happen when the word has finished disappearing
            }
          }
        }
      },
      zoomKeyboard: function () {
        var kb = document.getElementById('keyboard-tf')
        if (kb.style.width === '100%') { // it's big, make smaller
          kb.style.width = '10%'
          kb.style.height = 'auto'
          kb.style.cursor = 'zoom-in'
        } else { // it's small, make bigger
          kb.style.width = '100%'
          kb.style.height = (screen.availHeight - kb.offsetTop) + 'px'
          kb.style.cursor = 'zoom-out'
        }
      }
    },
    beforeDestroy () {
      document.onkeypress = null
      document.onkeydown = null
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
.fadeout {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s linear;
}

.buffer-title {
  color: bisque;
  margin-top: 30px;
}

.scoreWrap {
  float: left;
}
.timeWrap {
  float: right;
}

.outerWrap:after {
  font-size: 1em;
  content: "";
  display: block;
  clear: both;
}

.bg {
  background-color: #3f51b5;
}

.scoreWrap p,
.scoreWrap span,
.timeWrap p,
.timeWrap span {
  font-size: 1.5em;
  color: #ffc10a;
  margin-bottom: 1%;
}

.wordsWrap,
.wordsWrap p {
  margin: 0;
}

.words span {
  font-size: 3em;
  letter-spacing: 1px;
  color: #000;
}

.buffer {
  min-height: 1.5em;
  font-size: 3em;
  letter-spacing: 1px;
  background-color: #ddd;
  color: #3f51b5;
  border-radius: 5px;
}

#keyboardWrap-tf {
  display: flex;
  justify-content: flex-end;
}

#keyboard-tf {
  width: 10%;
  cursor: zoom-in;
}
</style>