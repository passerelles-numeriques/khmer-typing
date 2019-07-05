<template>
  <main>
    <h1>Visual Keyboard</h1>
    <p>Write the whole text as fast as you can with as few mistakes as possible</p>
    <button
      id="cmdTyping-vk"
      @click="startGame"
    >
      Start
    </button>

    <div
      id="gameWrap-vk"
      style="display:none;"
    >
      <div class="row">
        <div class="runesWrap">
          <strong>{{ runesCounter }}</strong>
          / {{ totalRunes }}
        </div>
        <div class="errorsWrap">
          <strong :class="{'error': alertError}">{{ errors }}</strong> errors
        </div>
      </div>
      <div
        id="textWrap-vk"
        :class="{'error-bg': alertError}"
      >
        <h2 id="text-vk">
          <span
            v-for="rune in runes"
            :key="rune.id"
            class="runes"
            :class="{current: rune.isCurrent, correct: rune.isCorrect, hidden: rune.isHidden}"
            :id="rune.id"
          >{{ rune.rune }}</span>
        </h2>
      </div>

      <div>
        <h4 id="decomposition-vk">
          <span>​</span>
          <!-- This span makes sure that the room for the decompisition doesn't disappear -->
          <span
            v-for="letter in letters"
            :key="letter.id"
            :class="{current: letter.isCurrent, correct: letter.isCorrect}"
            :id="letter.id"
          >{{ letter.letter }}</span>
        </h4>
      </div>

      <div id="handsAndKeyboardWrap-vk">
        <div class="row">
          <leftHand id="leftHand-vk" />
          <keyboard id="keyboard-vk" />
          <rightHand id="rightHand-vk" />
        </div>
      </div>
    </div>
    <v-dialog />
  </main>
</template>

<script>
  import splitKhmerRunes from '../../split-khmer'
  import mapping from '../../assets/mapping'
  import hands from '../../assets/hands'
  import leftHand from './LeftHand'
  import rightHand from './RightHand'
  import keyboard from './Keyboard'
  import {textsList} from '../texts-list'

  function initialState () {
    return {
      text: '',
      seconds: 0,
      runes: [],
      letters: [],
      runesCounter: 0,
      totalRunes: 0,
      errors: 0,
      alertError: false,
      idsBreakBefore: null
    }
  }

  export default {
    name: 'VisualKeyboard',
    components: {
      leftHand,
      rightHand,
      keyboard
    },
    data: initialState,
    methods: {
      /**
       * Initializes the game by changing the DOM
       */
      startGame: function () {
        // Change the visible elements
        document.getElementById('cmdTyping-vk').style.display = 'none'
        document.getElementById('gameWrap-vk').style.display = 'inline'
        // Select random text from the texts list
        var random = Math.floor(Math.random() * (textsList.list.length))
        this.text = textsList.list[random]
        this.text = 'កកលក'
        // Start the timer
        clearInterval(this.timer)
        var vue = this
        this.timer = setInterval(() => {
          vue.seconds++
        }, 1000)
        // Start playing
        this.play()
      },
      /**
       * Play the game
       * The user has to type a text in khmer
       */
      play: function () {
        var vue = this
        // Initialization
        // var completeText = ''
        this.runesCounter = 0
        var listRunes = splitKhmerRunes(this.text)
        this.totalRunes = listRunes.length
        this.splitTextIntoSpannedRunes(this.text)
        this.splitRuneIntoSpannedLetters(listRunes[this.runesCounter])
        var listKeys = this.getAllKeys(this.text)
        var currentLetters = ''
        // Highlights
        this.runes[this.runesCounter].isCurrent = true
        this.letters[currentLetters.length].isCurrent = true
        // Display the first hints
        this.resetHints()
        this.nextHint(listKeys)

        // Game progress
        document.onkeypress = function (ev) {
          ev.preventDefault()
          var isCorrect = vue.areRightKeysPressed(ev, listKeys)
          // Pressed key is correct
          if (isCorrect) {
            // completeText += ev.key
            currentLetters += ev.key
            // Highlight correct letter
            vue.letters[currentLetters.length - 1].isCurrent = false
            vue.letters[currentLetters.length - 1].isCorrect = true
            // Check if a grapheme has been completed
            var graphemes = splitKhmerRunes(currentLetters)
            if (graphemes[0] === listRunes[vue.runesCounter]) {
              // We show to the user that the grapheme is completed
              vue.runes[vue.runesCounter].isCurrent = false
              vue.runes[vue.runesCounter].isCorrect = true
              // Current grapheme is completed, we start again to track the next one
              currentLetters = ''
              vue.letters = []
              vue.runesCounter++
              // Display decomposition of the next grapheme if exists
              if (vue.runesCounter < listRunes.length) {
                vue.splitRuneIntoSpannedLetters(listRunes[vue.runesCounter])
              }
              // If we arrive at the end of a line, hide it
              vue.scrollSync()
            }
            // Current action is done
            listKeys.shift()
            // No next action, game is won
            if (listKeys.length === 0) {
              currentLetters = ''
              vue.endGame()
            } else { // We display hints for the next action
              vue.runes[vue.runesCounter].isCurrent = true
              vue.letters[currentLetters.length].isCurrent = true
              vue.resetHints()
              vue.nextHint(listKeys)
            }
          } else { // Pressed key is wrong
            vue.alertWrongKey()
          }
        }
      },
      /**
       * Displays the modal with the scores
       * Also saves the highest score
       * In case user wants to play again, resets data
       */
      endGame: function () {
        clearInterval(this.timer)
        var minutes = Math.round((this.seconds / 60) * 100) / 100
        // Save highest scores (for now just last scores)
        localStorage.setItem('visualKeyboard.time', minutes)
        localStorage.setItem('visualKeyboard.errors', this.errors)
        localStorage.setItem('visualKeyboard.runes', this.runesCounter)
        // Display results
        this.$modal.show('dialog', {
          title: this.$i18n.t('message.finishedPlaying'),
          text: this.$i18n.t('message.scoreVisualKeyboard', { errors: this.errors, minutes: minutes }),
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
                Object.assign(this.$data, initialState())
                // Start new game
                this.startGame()
              }
            }
          ]
        })
      },
      /**
       * Display the text to be typed by the user
       * with each rune encapsulated in a span and with a specific id
       * to facilitate their highlighting later
       * @param text the text to be typed by the user
       */
      splitTextIntoSpannedRunes: function (text) {
        // Split the string to an array of grapheme clusters (one string each)
        var graphemes = splitKhmerRunes(text)
        for (var i = 0; i < graphemes.length; i++) {
          this.runes.push({'id': 'rune-' + i, 'rune': graphemes[i], 'isCurrent': false, 'isCorrect': false, 'isHidden': false})
        }
      },
      /**
       * Display the rune to be typed by the user
       * with each letter encapsulated in a span and with a specific id
       * to facilitate their highlighting later
       * @param text the text to be typed by the user
       */
      splitRuneIntoSpannedLetters: function (rune) {
        // Split the graph to an array of strings
        var letters = rune.split('')
        for (var i = 0; i < letters.length; i++) {
          var letter = letters[i]
          // Add a space before this specific character, otherwise it doesn't stand out
          if (letter === '្') {
            letter = ' ្'
          }
          this.letters.push({'id': 'letter-' + i, 'letter': letter, 'isCurrent': false, 'isCorrect': false})
        }
      },
      /**
       * Computes where the overflowed text is broken to begin new lines
       */
      getRunesIdsBreakBefore: function () {
        var idBreakBefore = []
        var runes = document.getElementsByClassName('runes')
        // Loop through all the runes
        for (var i = 0; i < runes.length; i++) {
          // If a rune has minimal offsetLeft, it means it's on the left of the element, ie at the beginning of a new line
          if ((!runes[i - 1]) || (runes[i].offsetLeft < runes[i - 1].offsetLeft)) {
            idBreakBefore.push(i)
          }
        }
        return idBreakBefore
      },
      /**
       * When the user arrives at the end of a line
       * Scroll to display the next one
       * @param ids the list of ids of the runes that are at the beginnig of each line
       * @param currentId the id of the current rune, ie the one after the last rune validated
       */
      scrollSync: function (currentId) {
        // We are at a break point
        if (this.idsBreakBefore.includes(this.runesCounter)) {
          // Hide all the runes before the current one, ie hide the line
          for (var i = 0; i < this.runesCounter; i++) {
            this.runes[i].isHidden = true
          }
        }
      },
      /**
       * Get the list of ordered keys to type
       * @param text the text to be typed by the user
       * @param hands the object defining which key should be typed with which finger
       * @return an array containing the ordered list of keys to type
       */
      getAllKeys: function (text) {
        // Array of arrays
        var listKeys = []
        // Get the list of actions to be done by the user
        for (var i = 0; i < text.length; i++) {
          var letter = text.substring(i, i + 1)
          var keys = mapping[letter]
          if (keys === undefined) {
            console.log('Mapping undefined: ' + letter)
          } else {
            listKeys.push(keys)
          }
        }
        return listKeys
      },
      /**
       * Checks if the keys the user typed fit with what the action should be
       * @param event the pressedKey event generated when the user typed a new character
       * @param listKeys the current ordered list of keys to type
       * @return a boolean, true if the right keys have have been pressed, false otherwise
       */
      areRightKeysPressed: function (event, listKeys) {
        var keyPressed = mapping[event.key]
        var isCorrect = true
        var keyToPress = listKeys[0]

        // Careful if typing in english letters
        if (keyPressed === undefined) {
          this.$modal.show('dialog', {
            title: this.$i18n.t('Alert!'),
            text: this.$i18n.t('message.alertVisualKeyboard'),
            buttons: [
              {
                title: this.$i18n.t('Close'),
                default: true // Will be triggered by default if 'Enter' pressed.
              }
            ]
          })
          isCorrect = false
        } else if (keyToPress.length > 1) {
        // More than one key to press means the first key is ALT or SHIFT
          if (keyToPress[0].split('_')[1] === 'SHIFT') {
            isCorrect = event.shiftKey
          }
          // We've checked SHIFT and ALT, we move on to checking the second key
          keyPressed = keyPressed[1]
          keyToPress = keyToPress[1]
        } else {
          keyPressed = keyPressed[0]
          keyToPress = keyToPress[0]
        }
        isCorrect = ((keyPressed === keyToPress) && (isCorrect))
        return isCorrect
      },
      /**
       * When the user makes a mistake, the text area and error counter blinks in orange
       * and the error counter is incremented
       */
      alertWrongKey: function () {
        var vue = this
        vue.alertError = true
        // Back to normal after 0.5s
        setTimeout(function () {
          vue.alertError = false
        }, 500)
        // Incrementation
        this.errors++
      },
      /**
       * Highlights the fingers and keys to use for the current action in orange
       * To help the user type the text correctly
       * @param listKeys the current ordered list of keys to type
       */
      nextHint: function (listKeys) {
        // These are arrays
        var currentKeys = listKeys[0]
        var currentFingers = []
        for (var j = 0; j < currentKeys.length; j++) {
          currentFingers.push(hands[currentKeys[j]])
        }
        var color = '#ffab40'
        for (var i = 0; i < currentFingers.length; i++) {
          var finger = currentFingers[i]
          var key = currentKeys[i]
          // Space is the only key where we can use two fingers
          if (key === 'SPACE') {
            document.getElementById('leftHand').getElementById('left-finger-1').setAttributeNS(null, 'fill', color)
            document.getElementById('rightHand').getElementById('right-finger-1').setAttributeNS(null, 'fill', color)
          } else {
            var hand = finger.split('-')[0]
            // Highlight the correct finger on the correct hand
            document.getElementById(hand + 'Hand').getElementById(finger).setAttributeNS(null, 'fill', color)
          }
          // Highlight the correct key on the keyboard
          document.getElementById('keyboard').getElementById(key).setAttributeNS(null, 'fill', color)
        }
      },
      /**
      * Resets all the fingers and keys to their default color
      */
      resetHints: function () {
        var keys = Object.keys(hands)
        var fingers = ['right-finger-1', 'left-finger-1', 'right-finger-2', 'left-finger-2', 'right-finger-3', 'left-finger-3', 'right-finger-4', 'left-finger-4', 'right-finger-5', 'left-finger-5']
        var greyKeys = ['BACKSPACE', 'MENU', 'FN', 'WINDOWS', 'path5784', 'SPACE', 'ALT_GR', 'ENTER', 'RIGHT_SHIFT', 'RIGHT_CTRL', 'ALT', 'TAB', 'CAPS_LOCK', 'LEFT_SHIFT', 'LEFT_CTRL']
        var hand
        // Loop through all the fingers
        for (var i = 0; i < fingers.length; i++) {
          hand = fingers[i].split('-')[0]
          document.getElementById(hand + 'Hand').getElementById(fingers[i]).setAttributeNS(null, 'fill', 'none')
        }
        var svgKeyboard = document.getElementById('keyboard')
        // Loop through all the normal keys
        for (i = 0; i < keys.length; i++) {
          svgKeyboard.getElementById(keys[i]).setAttributeNS(null, 'fill', 'white')
        }
        // Loop through all the grey keys
        for (i = 0; i < greyKeys.length; i++) {
          svgKeyboard.getElementById(greyKeys[i]).setAttributeNS(null, 'fill', '#C1C0C0')
        }
      }
    },
    beforeDestroy () {
      document.onkeypress = null
      clearInterval(this.timer)
    },
    updated () {
      // The dom hass changed, update the list of breaking points in case it's needed
      this.idsBreakBefore = this.getRunesIdsBreakBefore()
    }
  }
</script>

<style scoped>
.hidden {
  display: none;
}
.current {
  color: #ffc10a;
}

.correct {
  color: #3f51b5;
}

.runesWrap,
.errorsWrap {
  font-size: 1.5em;
  width: 50%;
  color: #ffc10a;
  margin-bottom: 1%;
}

.runesWrap {
  text-align: start;
}
.errorsWrap {
  text-align: end;
}

#leftHand-vk,
#rightHand-vk {
  width: 15%;
}
#keyboard-vk {
  width: 70%;
}

#decomposition-vk,
#text-vk {
  font-weight: normal;
}

#text-vk {
  line-height: 1.5em;
  font-size: 3em;
  max-height: 3em;
  overflow: hidden;
  margin: 0 auto;
}

#decomposition-vk {
  font-size: 2em;
  margin: 1% auto 3% auto;
}

#textWrap-vk {
  background-color: #ddd;
  border-radius: 5px;
}

.error-bg {
  animation: errorAnimationBackground 0.5s;
}

@keyframes errorAnimationBackground {
  0% {
    background-color: #ddd;
  }
  33% {
    background-color: #ffc10a;
  }
  100% {
    background-color: #ddd;
  }
}

.error {
  animation: errorAnimation 0.5s;
}

@keyframes errorAnimation {
  0% {
    color: #ffc10a;
  }
  33% {
    color: black;
  }
  100% {
    color: #ffc10a;
  }
}
</style>