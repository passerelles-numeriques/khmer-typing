<template>
  <div class="wrapper">
    <main>
      <h1 id="lblGameTitle-tf">Typing game</h1>
      <p id="lblGameDescription-tf">Type as many words as you can until time runs out!</p>
      <button id="cmdTyping-tf" v-on:click="startGame">START</button>
      <div id="gameWrap-tf" style="display:none">
        <div class="outerWrap">
          <div class="scoreWrap">
            <p id="lblGameScore-tf">Score</p>
            <span class="score" id="lblScore-tf">{{ score }}</span>
          </div>
          <div class="timeWrap">
            <p id="lblGameTimeLeft-tf">Time left</p>
            <span class="time" id="lblTimer-tf">{{ seconds }}</span>
          </div>
        </div>
        <div class="wordsWrap">
          <p class="words">
            <span>​</span>
            <!-- This span makes sure that the room for the word doesn't disappear even when transitionning -->
            <span class="spans" v-for="span in spans">{{ span }}</span>
          </p>
        </div>
        <h3 style="color:bisque margin-top: 30px" id="lblGameBuffer-tf">What you are typing:</h3>
        <div class="buffer" id="lblBuffer-tf">
          <span>​</span>
          <!-- This span makes sure that the room for the word doesn't disappear even when transitionning -->
          {{ buffer }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'typefast',
    data () {
      return {
        list: ['test', 'does', 'it', 'work'],
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
        timer = setInterval(() => {
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
        document.addEventListener('keypress', this.typing, false)
        document.addEventListener('keydown', this.clear, false)
      },
      /**
       * Splits a text in khmer into an array of separate graphemes
       * Each grapheme is what would normally be considered as a "letter", but can be the result of multiple typed keys
       * Uses grapheme.splitter and corrects its mistakes related to khmer
       * @param text the text to split
       * @return an array of graphemes
       */
      splitKhmerRunes: function (text) {
        text.normalize()
        var GraphemeSplitter = require('grapheme-splitter')
        const splitter = new GraphemeSplitter()
        let graphemes = splitter.splitGraphemes(text)
        // Correct one mistake that happens in Khmer language
        let previousCodePoint = null
        for (let i = 0; i < graphemes.length; i++) {
          if (previousCodePoint === 0x17D2) {
            graphemes[i - 1] += graphemes[i]
            graphemes.splice(i, 1)
            i-- // decrement
          }
          previousCodePoint = [...graphemes[i]].pop().charCodeAt(0) // get last codepoint
        }
        return graphemes
      },
      /**
       * Selects a random word from the words list and displays it
       */
      random: function () {
        var random = Math.floor(Math.random() * (this.list.length))
        const word = this.list[random]
        let graphemes = this.splitKhmerRunes(word)
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
          let graphemes = this.splitKhmerRunes(this.buffer)
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
              }, 400) // happen when the word has finished disappearing
            }
          }
        }
      }
    }
  }
</script>

<style>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  padding: 2%;
  background-color: #fff;
  height: 600px;
}

.fadeout {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.4s, opacity 0.4s linear;
}

h1 {
  color: #3f51b5;
  margin-bottom: 0;
}

h1 + p {
  margin-bottom: 5%;
  margin-top: 0%;
  color: #3f51b5;
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
  font-size: 26px;
  color: #ffc10a;
  margin-bottom: 1%;
}

.wordsWrap {
  margin-top: 40px;
}

.words span {
  font-family: "Noto Sans Khmer";
  font-size: 60px;
  letter-spacing: 1px;
  color: #ddd;
}

.buffer {
  font-family: "Noto Sans Khmer";
  font-size: 60px;
  letter-spacing: 1px;
  background-color: #ddd;
  color: #ffc10a;
}
</style>

