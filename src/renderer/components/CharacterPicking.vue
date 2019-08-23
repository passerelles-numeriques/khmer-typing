<template>
  <main>
    <div id="app">
      <br>
      <div>
        <textarea ref="textInput" id="textInput" v-model="text"></textarea>
      </div>
      <div id="container">
        <div id="row1">
          <div v-on:click="writeText('្')" class="grid-item border subscript">&nbsp;</div>
          <div v-on:click="writeText(' ')" class="grid-item border">SPACE</div>
          <div v-on:click="writeText('\t')" class="grid-item border">TAB</div>
          <div v-on:click="writeText('\n')" class="grid-item border">ENTER</div>
          <div v-on:click="writeText('del')" class="grid-item border">DEL</div>
          <div v-on:click="writeText('x')" class="grid-item border">X</div>
        </div>
        <div id="row2">
          <letter
            v-for="(item,index) in letters"
            :key="index"
            v-bind:letter="item"
            v-on:write-text="writeText"
          ></letter>
        </div>
        <div id="row3">
          <vowel
            v-for="(item,index) in vowels"
            :key="index"
            v-bind:vowel="item"
            v-on:write-text="writeText"
          ></vowel>
        </div>
        <div id="row4">
          <independent-vowel
            v-for="(item,index) in independentVowels"
            :key="index"
            v-bind:independentvowel="item"
            v-on:write-text="writeText"
          ></independent-vowel>
        </div>
        <div id="row5">
          <diacritic
            v-for="(item,index) in diacritics"
            :key="index"
            v-bind:diacritic="item"
            v-on:write-text="writeText"
          ></diacritic>
        </div>
        <div id="row6">
          <markh
            v-for="(item,index) in marks"
            :key="index"
            v-bind:markh="item"
            v-on:write-text="writeText"
          ></markh>
        </div>
        <div id="row7">
          <sign
            v-for="(item,index) in signs"
            :key="index"
            v-bind:sign="item"
            v-on:write-text="writeText"
          ></sign>
        </div>
        <div id="row8">
          <digit
            v-for="(item,index) in digits"
            :key="index"
            v-bind:digit="item"
            v-on:write-text="writeText"
          ></digit>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from "vue";

  Vue.component("digit", {
    props: ["digit"],
    template: `<div v-on:click="$emit('write-text',digit.key)" class="grid-item">{{digit.value}}</div>`
  });

  Vue.component("letter", {
    props: ["letter"],
    template: `<div v-on:click="$emit('write-text',letter.key)" class="grid-item">{{letter.value}}</div>`
  });

  Vue.component("vowel", {
    props: ["vowel"],
    template: `<div v-on:click="$emit('write-text',vowel.key)" class="grid-item">{{vowel.value}}</div>`
  });

  Vue.component("independent-vowel", {
    props: ["independentvowel"],
    template: `<div v-on:click="$emit('write-text',independentvowel.key)" class="grid-item">{{independentvowel.value}}</div>`
  });

  Vue.component("diacritic", {
    props: ["diacritic"],
    template: `<div v-on:click="$emit('write-text',diacritic.key)" class="grid-item">{{diacritic.value}}</div>`
  });

  Vue.component("markh", {
    props: ["markh"],
    template: `<div v-on:click="$emit('write-text',markh.key)" class="grid-item">{{markh.value}}</div>`
  });

  Vue.component("sign", {
    props: ["sign"],
    template: `<div v-on:click="$emit('write-text',sign.key)" class="grid-item">{{sign.value}}</div>`
  });

export default {
  data() {
    return {
      text: "",
      digits: [
        { key: "០", value: "០" },
        { key: "១", value: "១" },
        { key: "២", value: "២" },
        { key: "៣", value: "៣" },
        { key: "៤", value: "៥" },
        { key: "៦", value: "៦" },
        { key: "៧", value: "៧" },
        { key: "៨", value: "៨" },
        { key: "៩", value: "៩" }
      ],
      letters: [
        { key: "ក", value: "ក" },
        { key: "ខ", value: "ខ" },
        { key: "គ", value: "គ" },
        { key: "ឃ", value: "ឃ" },
        { key: "ង", value: "ង" },
        { key: "កក", value: "្ក" },
        { key: "ខខ", value: "្ខ" },
        { key: "គគ", value: "្គ" },
        { key: "ឃឃ", value: "្ឃ" },
        { key: "ងង", value: "្ង" },
        { key: "ច", value: "ច" },
        { key: "ឆ", value: "ឆ" },
        { key: "ជ", value: "ជ" },
        { key: "ឈ", value: "ឈ" },
        { key: "ញ", value: "ញ" },
        { key: "ចច", value: "្ច" },
        { key: "ឆឆ", value: "្ឆ" },
        { key: "ជជ", value: "្ជ" },
        { key: "ឈឈ", value: "្ឈ" },
        { key: "ញញ", value: "្ញ" },
        { key: "ដ", value: "ដ" },
        { key: "ឋ", value: "ឋ" },
        { key: "ឌ", value: "ឌ" },
        { key: "ឍ", value: "ឍ" },
        { key: "ណ", value: "ណ" },
        { key: "ដដ", value: "្ដ" },
        { key: "ឋឋ", value: "្ឋ" },
        { key: "ឌឌ", value: "្ឌ" },
        { key: "ឍឍ", value: "្ឍ" },
        { key: "ណណ", value: "្ណ" },
        { key: "ត", value: "ត" },
        { key: "ថ", value: "ថ" },
        { key: "ទ", value: "ទ" },
        { key: "ធ", value: "ធ" },
        { key: "ន", value: "ន" },
        { key: "ថថ", value: "្ថ" },
        { key: "ទទ", value: "្ទ" },
        { key: "ធធ", value: "្ធ" },
        { key: "តត", value: "្ត" },
        { key: "នន", value: "្ន" },
        { key: "ប", value: "ប" },
        { key: "ផ", value: "ផ" },
        { key: "ព", value: "ព" },
        { key: "ភ", value: "ភ" },
        { key: "ម", value: "ម" },
        { key: "បប", value: "្ប" },
        { key: "ផផ", value: "្ផ" },
        { key: "ពព", value: "្ព" },
        { key: "ភភ", value: "្ភ" },
        { key: "មម", value: "្ម" },
        { key: "យ", value: "យ" },
        { key: "រ", value: "រ" },
        { key: "ល", value: "ល" },
        { key: "វ", value: "វ" },
        { key: "ស", value: "ស" },
        { key: "យយ", value: "្យ" },
        { key: "ររ", value: "្រ" },
        { key: "លល", value: "្ល" },
        { key: "វវ", value: "្វ" },
        { key: "សស", value: "្ស" },
        { key: "ហ", value: "ហ" },
        { key: "ឡ", value: "ឡ" },
        { key: "អ", value: "អ" },
        { key: "ហហ", value: "្ហ" },
        { key: "អអ", value: "្អ" }
      ],
      vowels: [
        { key: "ា", value: "ា" },
        { key: "ិ", value: "ិ" },
        { key: "ី", value: "ី" },
        { key: "ឹ", value: "ឹ" },
        { key: "ឺ", value: "ឺ" },
        { key: "ុ", value: "ុ" },
        { key: "ូ", value: "ូ" },
        { key: "ួ", value: "ួ" },
        { key: "ើ", value: "ើ" },
        { key: "ឿ", value: "ឿ" },
        { key: "ៀ", value: "ៀ" },
        { key: "េ", value: "េ" },
        { key: "ែ", value: "ែ" },
        { key: "ៃ", value: "ៃ" },
        { key: "ោ", value: "ោ" },
        { key: "ៅ", value: "ៅ" },
        { key: "ុំ", value: "ុំ" },
        { key: "ំ", value: "ំ" },
        { key: "ាំ", value: "ាំ" },
        { key: "ះ", value: "ះ" },
        { key: "ិះ", value: "ិះ" },
        { key: "ុះ", value: "ុះ" },
        { key: "េះ", value: "េះ" },
        { key: "ោះ", value: "ោះ" }
      ],      
      independentVowels: [
        { key: "ឥ", value: "ឥ" },
        { key: "ឦ", value: "ឦ" },
        { key: "ឧ", value: "ឧ" },
        { key: "ឩ", value: "ឩ" },
        { key: "ឪ", value: "ឪ" },
        { key: "ឬ", value: "ឬ" },
        { key: "ឫ", value: "ឫ" },
        { key: "ឭ", value: "ឭ" },
        { key: "ឮ", value: "ឮ" },
        { key: "ឯ", value: "ឯ" },
        { key: "ឰ", value: "ឰ" },
        { key: "ឲ", value: "ឲ" },
        { key: "ឱ", value: "ឱ" },
        { key: "ឳ", value: "ឳ" }
      ],
      diacritics: [
        { key: "ំ", value: "ំ" },
        { key: "ះ", value: "ះ" },
        { key: "ៈ", value: "ៈ" },
        { key: "៉", value: "៉" },
        { key: "៊", value: "៊" },
        { key: "់", value: "់" },
        { key: "៍", value: "៍" },
        { key: "៌", value: "៌" },
        { key: "៏", value: "៏" },
        { key: "័", value: "័" },
        { key: "៎", value: "៎" },
        { key: "៑", value: "៑" }
      ],
      marks: [
        { key: "។", value: "។" },
        { key: "៕", value: "៕" },
        { key: "ៗ", value: "ៗ" },
        { key: "៛", value: "៛" },
        { key: "៖", value: "៖" },
        { key: "៚", value: "៚" },
        { key: "៙", value: "៙" }
      ],
      signs: [
        { key: ",", value: "," },
        { key: ".", value: "." },
        { key: "?", value: "?" },
        { key: "!", value: "!" },
        { key: "(", value: "(" },
        { key: ")", value: ")" },
        { key: "%", value: "%" },
        { key: "{", value: "{" },
        { key: "}", value: "}" }
      ]
    };
  },
  methods: {
    writeText: function(param) {
      if (param.length == 2 && param[0] === param[1]) {
        this.text += "្";
        param = param[1];
      }

      if (param === "del") {
        this.text = this.text.substring(0, this.text.length - 1);
        param = "";
      }

      if (param === "x") {
        this.text = "";
        param = "";
      }

      this.text += param;
      this.$refs.textInput.focus();
    }
  },
  mounted() {
    this.$refs.textInput.focus();
  }
};
</script>

<style scoped>
body {
  font-family: Helvetica;
}
#textInput {
  border: 1px solid brown;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  font-size: 3em;
}
#container {
  display: grid;
  grid-template-columns: repeat(23, auto);
  grid-template-rows: repeat(13);
  grid-gap: 5px;
}

.grid-item {  
  padding: 5px;
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;
}
.border{
  border: 1px solid #c7c7c7;
  background-color: none important;
}

.subscript{
  background-image: url("../../../static/images/subscript.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
#container #row1 {
  grid-column: 8/17;
  grid-row: 1/2;
  display: grid;
  /* align-items: center; */
  grid-gap: 5px;
  /* grid-template-columns: repeat(6,auto); */
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
}

#container #row2 {
  grid-column: 1/11;
  grid-row: 2/9;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(10,auto); */
  grid-template-columns: repeat(auto-fit, minmax(55px, 1fr));
}
#container #row2 .grid-item {
  background-color: rgba(221, 235, 34, 0.8);
}

#container #row3 {
  grid-column: 12/24;
  grid-row: 2/4;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(12,auto); */
  grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
}
#container #row3 .grid-item {
  background-color: rgba(235, 198, 34, 0.8);
}
#container #row4 {
  grid-column: 12/15;
  grid-row: 4/8;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(3,auto); */
  grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
}
#container #row4 .grid-item {
  background-color: rgba(216, 218, 213, 0.8);
}
#container #row5 {
  grid-column: 16/22;
  grid-row: 4/5;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(6,auto); */
  grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
}
#container #row5 .grid-item {
  background-color: rgba(101, 162, 232, 0.8);
}
#container #row6 {
  grid-column: 16/23;
  grid-row: 5/6;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(7,auto); */
  grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
}
#container #row6 .grid-item {
  background-color: rgba(153, 238, 42, 0.8);
}
#container #row7 {
  grid-column: 16/24;
  grid-row: 6/7;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(9,auto); */
  grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
}
#container #row7 .grid-item {
  background-color: rgb(208, 182, 202);
}
#container #row8 {
  grid-column: 12/22;
  grid-row: 8/9;
  display: grid;
  grid-gap: 5px;
  /* grid-template-columns: repeat(10,auto); */
  grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
}
#container #row8 .grid-item {
  background-color: rgba(236, 78, 157, 0.836);
}
</style>
