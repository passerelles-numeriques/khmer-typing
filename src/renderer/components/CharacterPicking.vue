<template>
  <main>
    <div id="app">  
      <div id="row1">
        <div class="grid-item empty s-7" />
        <actionkey
          v-for="(element,index) in actionitems"
          :key="index"
          :class="element.class"
          :action="element"
          @write-text="writeText" 
        />

        <div 
          v-if="isWeb" 
          @click="share()" 
          class="grid-item s-7e" 
          id="share"
        />
      </div>

      <div>
        <textarea
          ref="textInput"
          id="textInput"
          v-model="text" 
        />
      </div>
      
      <div id="container">  
        <itemkey
          v-for="(element,index) in items"
          :key="index"
          :class="element.class"
          :item="element"
          @write-text="writeText"
        />
      </div>
    </div>
    <v-dialog />
  </main>
</template>

<script>
import Vue from "vue";
import Clipboard from 'v-clipboard';
  Vue.use(Clipboard);

  Vue.component("actionkey", {
    props: {
      action:{
        type:Object,
        default:null
      }
    },
    template: `<div 
                  v-on:click="$emit('write-text',action.key)">
                  {{action.value}}
               </div>`
  });

  Vue.component("itemkey", {
    props: {
      item:{
        type:Object,
        default:null
      }
    },
    template: `<div 
                  v-on:click="$emit('write-text',item.key)">
                  {{item.value}}
               </div>`
  });

export default {
  data() {
    return {
      text: (this.$route.params.text) ? this.$route.params.text : "" ,         
      // text: (this.$route.params.text) ? this.$route.params.text : "" ,         
      actionitems: [
        { key: "្", value: "",class:"grid-item border subscript" },
        { key: " ", value: "SPACE",class:"grid-item border" },
        { key: "\t", value: "TAB",class:"grid-item border" },
        { key: "\n", value: "ENTER",class:"grid-item border" },
        { key: "del", value: "DEL",class:"grid-item border" },
        { key: "x", value: "X",class:"grid-item border" }
      ],
      items: [
        { key: "ក", value: "ក",class:"grid-item consonant" },
        { key: "ខ", value: "ខ",class:"grid-item consonant" },
        { key: "គ", value: "គ" ,class:"grid-item consonant"},
        { key: "ឃ", value: "ឃ" ,class:"grid-item consonant"},
        { key: "ង", value: "ង" ,class:"grid-item consonant"},
        { key: "កក", value: "្ក" ,class:"grid-item leg"},
        { key: "ខខ", value: "្ខ" ,class:"grid-item leg"},
        { key: "គគ", value: "្គ" ,class:"grid-item leg"},
        { key: "ឃឃ", value: "្ឃ" ,class:"grid-item leg"},
        { key: "ងង", value: "្ង" ,class:"grid-item leg"},
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "ា", value: "ា",class:"grid-item vowel" },
        { key: "ិ", value: "ិ",class:"grid-item vowel" },
        { key: "ី", value: "ី",class:"grid-item vowel" },
        { key: "ឹ", value: "ឹ",class:"grid-item vowel" },
        { key: "ឺ", value: "ឺ",class:"grid-item vowel" },
        { key: "ុ", value: "ុ",class:"grid-item vowel" },
        { key: "ូ", value: "ូ",class:"grid-item vowel"},     
        { key: "ច", value: "ច",class:"grid-item consonant" },
        { key: "ឆ", value: "ឆ",class:"grid-item consonant" },
        { key: "ជ", value: "ជ" ,class:"grid-item consonant"},
        { key: "ឈ", value: "ឈ",class:"grid-item consonant" },
        { key: "ញ", value: "ញ" ,class:"grid-item consonant"},
        { key: "ចច", value: "្ច",class:"grid-item leg" },
        { key: "ឆឆ", value: "្ឆ",class:"grid-item leg" },
        { key: "ជជ", value: "្ជ",class:"grid-item leg" },
        { key: "ឈឈ", value: "្ឈ",class:"grid-item leg" },
        { key: "ញញ", value: "្ញ",class:"grid-item leg" },
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "ួ", value: "ួ",class:"grid-item vowel" },
        { key: "ើ", value: "ើ",class:"grid-item vowel" },
        { key: "ឿ", value: "ឿ",class:"grid-item vowel" },
        { key: "ៀ", value: "ៀ",class:"grid-item vowel" },
        { key: "េ", value: "េ",class:"grid-item vowel" },
        { key: "ែ", value: "ែ",class:"grid-item vowel" },
        { key: "ៃ", value: "ៃ",class:"grid-item vowel" },
        { key: "ដ", value: "ដ",class:"grid-item consonant" },
        { key: "ឋ", value: "ឋ",class:"grid-item consonant" },
        { key: "ឌ", value: "ឌ" ,class:"grid-item consonant"},
        { key: "ឍ", value: "ឍ",class:"grid-item consonant" },
        { key: "ណ", value: "ណ" ,class:"grid-item consonant"},
        { key: "ដដ", value: "្ដ" ,class:"grid-item leg"},
        { key: "ឋឋ", value: "្ឋ",class:"grid-item leg" },
        { key: "ឌឌ", value: "្ឌ",class:"grid-item leg" },
        { key: "ឍឍ", value: "្ឍ",class:"grid-item leg" },
        { key: "ណណ", value: "្ណ" ,class:"grid-item leg"},
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "ោ", value: "ោ",class:"grid-item vowel" },
        { key: "ៅ", value: "ៅ",class:"grid-item vowel" },
        { key: "ុំ", value: "ុំ" ,class:"grid-item vowel"},
        { key: "ំ", value: "ំ" ,class:"grid-item vowel"},
        { key: "ាំ", value: "ាំ" ,class:"grid-item vowel"},
        { key: "ះ", value: "ះ",class:"grid-item vowel" },
        { key: "ិះ", value: "ិះ",class:"grid-item vowel" },
        { key: "ត", value: "ត",class:"grid-item consonant" },
        { key: "ថ", value: "ថ" ,class:"grid-item consonant"},
        { key: "ទ", value: "ទ" ,class:"grid-item consonant"},
        { key: "ធ", value: "ធ",class:"grid-item consonant" },
        { key: "ន", value: "ន",class:"grid-item consonant" },
        { key: "ថថ", value: "្ថ",class:"grid-item leg" },
        { key: "ទទ", value: "្ទ" ,class:"grid-item leg"},
        { key: "ធធ", value: "្ធ",class:"grid-item leg" },
        { key: "តត", value: "្ត",class:"grid-item leg" },
        { key: "នន", value: "្ន",class:"grid-item leg" },
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "ុះ", value: "ុះ" ,class:"grid-item vowel"},
        { key: "េះ", value: "េះ" ,class:"grid-item vowel"},
        { key: "ោះ", value: "ោះ" ,class:"grid-item vowel"},
        { key: "", value: "" ,class:"grid-item empty s-15"},
        { key: "ប", value: "ប",class:"grid-item consonant" },
        { key: "ផ", value: "ផ" ,class:"grid-item consonant"},
        { key: "ព", value: "ព" ,class:"grid-item consonant"},
        { key: "ភ", value: "ភ" ,class:"grid-item consonant"},
        { key: "ម", value: "ម" ,class:"grid-item consonant"},
        { key: "បប", value: "្ប" ,class:"grid-item leg"},
        { key: "ផផ", value: "្ផ" ,class:"grid-item leg"},
        { key: "ពព", value: "្ព" ,class:"grid-item leg"},
        { key: "ភភ", value: "្ភ",class:"grid-item leg" },
        { key: "មម", value: "្ម" ,class:"grid-item leg"},
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "ឥ", value: "ឥ",class:"grid-item independentVowel" },
        { key: "ឦ", value: "ឦ" ,class:"grid-item independentVowel"},
        { key: "ឧ", value: "ឧ" ,class:"grid-item independentVowel"},
        { key: "ឩ", value: "ឩ" ,class:"grid-item independentVowel"},
        { key: "ឪ", value: "ឪ" ,class:"grid-item independentVowel"},
        { key: "ឬ", value: "ឬ",class:"grid-item independentVowel" },
        { key: "ឫ", value: "ឫ",class:"grid-item independentVowel" },
        { key: "យ", value: "យ",class:"grid-item consonant" },
        { key: "រ", value: "រ",class:"grid-item consonant" },
        { key: "ល", value: "ល" ,class:"grid-item consonant"},
        { key: "វ", value: "វ" ,class:"grid-item consonant"},
        { key: "ស", value: "ស" ,class:"grid-item consonant"},
        { key: "យយ", value: "្យ",class:"grid-item leg" },
        { key: "ររ", value: "្រ" ,class:"grid-item leg"},
        { key: "លល", value: "្ល" ,class:"grid-item leg"},
        { key: "វវ", value: "្វ" ,class:"grid-item leg"},
        { key: "សស", value: "្ស" ,class:"grid-item leg"},
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "ឭ", value: "ឭ" ,class:"grid-item independentVowel"},
        { key: "ឮ", value: "ឮ" ,class:"grid-item independentVowel"},
        { key: "ឯ", value: "ឯ" ,class:"grid-item independentVowel"},
        { key: "ឰ", value: "ឰ" ,class:"grid-item independentVowel"},
        { key: "ឲ", value: "ឲ" ,class:"grid-item independentVowel"},
        { key: "ឱ", value: "ឱ" ,class:"grid-item independentVowel"},
        { key: "ឳ", value: "ឳ",class:"grid-item independentVowel" },
        { key: "ហ", value: "ហ",class:"grid-item consonant" },
        { key: "ឡ", value: "ឡ" ,class:"grid-item consonant"},
        { key: "អ", value: "អ",class:"grid-item consonant" },
        { key: "ហហ", value: "្ហ",class:"grid-item leg" },
        { key: "អអ", value: "្អ" ,class:"grid-item leg"},
        { key: "", value: "" ,class:"grid-item empty s-6"},
        { key: "ំ", value: "ំ" ,class:"grid-item diacritic"},
        { key: "ះ", value: "ះ" ,class:"grid-item diacritic"},
        { key: "ៈ", value: "ៈ",class:"grid-item diacritic" },
        { key: "៉", value: "៉" ,class:"grid-item diacritic"},
        { key: "៊", value: "៊" ,class:"grid-item diacritic"},
        { key: "់", value: "់" ,class:"grid-item diacritic"},
        { key: "៍", value: "៍" ,class:"grid-item diacritic"},
        { key: "០", value: "០",class:"grid-item digit" },
        { key: "១", value: "១",class:"grid-item digit" },
        { key: "២", value: "២" ,class:"grid-item digit"},
        { key: "៣", value: "៣",class:"grid-item digit" },
        { key: "៤", value: "៤",class:"grid-item digit" },
        { key: "៥", value: "៥" ,class:"grid-item digit"},
        { key: "៦", value: "៦",class:"grid-item digit" },
        { key: "៧", value: "៧",class:"grid-item digit" },
        { key: "៨", value: "៨",class:"grid-item digit" },
        { key: "៩", value: "៩",class:"grid-item digit" },
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "៌", value: "៌" ,class:"grid-item diacritic"},
        { key: "៏", value: "៏" ,class:"grid-item diacritic"},
        { key: "័", value: "័" ,class:"grid-item diacritic"},
        { key: "៎", value: "៎" ,class:"grid-item diacritic"},
        { key: "៑", value: "៑",class:"grid-item diacritic" },
        { key: "", value: "" ,class:"grid-item empty s-17"},
        { key: ",", value: "," ,class:"grid-item sign" },
        { key: ".", value: "." ,class:"grid-item sign" },
        { key: "?", value: "?" ,class:"grid-item sign" },
        { key: "!", value: "!" ,class:"grid-item sign" },
        { key: "%", value: "%" ,class:"grid-item sign" },
        { key: "(", value: "(" ,class:"grid-item sign" },
        { key: ")", value: ")" ,class:"grid-item sign" },        
        { key: "{", value: "{" ,class:"grid-item sign" },
        { key: "}", value: "}" ,class:"grid-item sign" },
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "", value: "" ,class:"grid-item empty"},
        { key: "។", value: "។",class:"grid-item mark" },
        { key: "៕", value: "៕",class:"grid-item mark" },
        { key: "ៗ", value: "ៗ" ,class:"grid-item mark"},
        { key: "៛", value: "៛" ,class:"grid-item mark"},
        { key: "៖", value: "៖",class:"grid-item mark" },
        { key: "៚", value: "៚",class:"grid-item mark" },
        { key: "៙", value: "៙" ,class:"grid-item mark"}
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
    },
    share:function(){  
      var url = window.location.href.split(encodeURI(this.$route.params.text))[0];
      if(!url.endsWith("/")){
        url+="/"
      }
      url+=encodeURI(this.text);
      this.$clipboard(url); 
      
            // Display end modal
            this.$modal.show('dialog', {
              title: this.$i18n.t('Shared link is copied to clipboard'),
              text: url,
              buttons: [
                {
                  title: this.$i18n.t('Close'),
                }
              ]
            })
      
 
    }
      
  },
  computed:{
    isWeb(){
      if(window.process){
        return false;
      }    
      return true;      
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
  height: 130px;
  margin-bottom: 10px;
  font-size: 2em;
  white-space: pre-wrap;
}
#row1{
  display: grid;
  grid-template-columns: repeat(18,auto);
  grid-gap: 5px;
  margin-top: 1px;
}
#container{
  display: grid;
  grid-template-columns: repeat(18,auto);
  grid-template-rows: repeat(14,1fr);            
  grid-gap: 5px;
}

/* @media (max-width: 400px) {
  #container{
    grid-template-columns: repeat(5,auto);
  }
} */

.grid-item {  
  padding: 5px;
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;  
}

.s-6{
  grid-column: 6/12;
}
.s-15{
  grid-column: 15/-1;
}  
.s-17{
  grid-column: 17/-1;
}
.s-7{
  grid-column: 1/6;
}
.s-7e{
  grid-column: 18/-1;
}

.border{
  border: 1px solid #c7c7c7;  
  font-size: 0.7em;  
}
.border:hover{
  background-color: #e0e0e0; 
}
.consonant{  
  background-color: #F9F871;
}
.consonant:hover{  
  background-color: rgb(224, 224, 100);    
}
.leg{
  background-color: #74BDCB;
}
.leg:hover{
  background-color: rgb(80, 168, 185);
}
.vowel{
  background-color: #FFA384;
}
.vowel:hover{
  background-color: rgb(243, 132, 95);
}
.independentVowel{
  background-color: #EFE7BC;
}
.independentVowel:hover{
  background-color: rgb(226, 216, 160);
}
.mark{
  background-color: #BDA69F;
}
.mark:hover{
  background-color: rgb(177, 142, 131);
}
.sign{
  background-color: #C0BC84;
}
.sign:hover{
  background-color: rgb(173, 169, 108);
}
.digit{
  background-color: #9BDE7E;
}
.digit:hover{
  background-color: rgb(131, 189, 107);
}
.diacritic{
  background-color: rgba(216, 218, 213, 0.8);
}
.diacritic:hover{
  background-color: rgba(192, 192, 192, 0.8);
}
.subscript{
  background-image: url("../../../static/images/subscript.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 40%;
}
#share{
  background-image: url("../../../static/images/share.png");
  background-position: 100% 50%;
  background-repeat: no-repeat;
  background-size: 50%;
}

.empty{
  border: none;
  cursor: auto;
}
</style>
