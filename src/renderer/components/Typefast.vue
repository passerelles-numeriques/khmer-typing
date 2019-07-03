<template>
  <div class="wrapper">
    <main>
      <h1 id="lblGameTitle-tf">{{ $t("Typing game") }}</h1>
      <p id="lblGameDescription-tf">{{ $t("Type as many words as you can until time runs out!") }}</p>
      <button id="cmdTyping-tf" v-on:click="startGame">{{ $t("Start") }}</button>
      <div id="gameWrap-tf" style="display:none">
        <div class="outerWrap">
          <div class="scoreWrap">
            <p id="lblGameScore-tf">{{ $t("Score") }}</p>
            <span class="score" id="lblScore-tf">{{ score }}</span>
          </div>
          <div class="timeWrap">
            <p id="lblGameTimeLeft-tf">{{ $t("Time left") }}</p>
            <span class="time" id="lblTimer-tf">{{ seconds }}</span>
          </div>
        </div>
        <div class="wordsWrap">
          <p class="words">
            <span>​</span>
            <!-- This span makes sure that the room for the word doesn't disappear even when transitionning -->
            <span class="spans" v-for="span in spans" v-bind:key="span.id">{{ span }}</span>
          </p>
        </div>
        <h3
          style="color:bisque margin-top: 30px"
          id="lblGameBuffer-tf"
        >{{ $t("What you are typing:") }}</h3>
        <div class="buffer" id="lblBuffer-tf">
          <span>​</span>
          <!-- This span makes sure that the room for the buffer doesn't disappear even when transitionning -->
          {{ buffer }}
        </div>
        <div id="keyboardWrap-tf" class="row" v-on:click="zoomKeyboard">
          <keyboard id="keyboard-tf"></keyboard>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import splitKhmerRunes from '../split-khmer'
  import keyboard from './VisualKeyboard/Keyboard'
  import {wordsList} from './words-list'

  export default {
    name: 'typefast',
    components: {
      keyboard
    },
    data () {
      return {
        list: wordsList[this.$i18n.locale],
        score: 0,
        seconds: 60,
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
        // Hide the start button and display the game
        document.getElementById('cmdTyping-tf').style.display = 'none'
        document.getElementById('gameWrap-tf').style.display = 'inline'
        // Start the timer
        clearInterval(timer)
        this.timer = timer = setInterval(() => {
          this.seconds--
          if (this.seconds === 0) {
            this.spans = ''
            clearInterval(timer)
            // Here is the end of the game, do something for final score
            alert('you wrote ' + this.score + ' words!')
          }
        }, 1000)
        // Sets the first word to type
        this.random()
        this.buffer = ''
        // Listen to typing events
        this.keypress = document.addEventListener('keypress', this.typing, false)
        this.keydown = document.addEventListener('keydown', this.clear, false)
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
          this.buffer = typed
          let graphemes = splitKhmerRunes(this.buffer)
          let lastGrapheme = graphemes[graphemes.length - 1]
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
              }, 300) // happen when the word has finished disappearing
            }
          }
        }
      },
      zoomKeyboard: function () {
        var kb = document.getElementById('keyboard-tf')
        if (kb.style.width === '100%') { // it's big, make smaller
          kb.style.width = '10%'
          kb.style.cursor = 'zoom-in'
        } else { // it's small, make bigger
          kb.style.width = '100%'
          kb.style.cursor = 'zoom-out'
        }
      }
    },
    beforeDestroy () {
      document.removeEventListener('keypress', this.keypress)
      document.removeEventListener('keydown', this.keydown)
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
.fadeout {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.3s, opacity 0.3s linear;
}

.scoreWrap {
  float: left;
}
.timeWrap {
  float: right;
}

.outerWrap:after {
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
  font-family: "Noto Sans Khmer";
  font-size: 3em;
  letter-spacing: 1px;
  color: #000;
}

.buffer {
  font-family: "Noto Sans Khmer";
  font-size: 3em;
  letter-spacing: 1px;
  background-color: #ddd;
  color: #3f51b5;
  border-radius: 5px;
}

#keyboardWrap-tf {
  display: flex;
  margin-top: 3%;
  justify-content: flex-end;
}

#keyboard-tf {
  width: 10%;
  height: 15%;
  cursor: zoom-in;
}
</style>