<template>
  <div>

  <div class="mt-2" id="editor" ref="editor" @change="valueToBeSaved()" style="width: 600px; height: 500px"></div>
    <div class="row">
      <button class="button click" @click="compile()">Run</button>
      <button class="button click"  @click="modalValidate = !modalValidate">Save</button>
      <save-code-modal :languageId="this.chosenLanguage.value" :language="this.chosenLanguage.text" :code="valueToSave"
          v-if="modalValidate"
          @close="modalValidate = false"/>
    </div>
  </div>
</template>

<script>
import loader from "@monaco-editor/loader";
import axios from "axios";
import SaveCodeModal from "@/components/CodeEditor/SaveCodeModal";

export default {
  name: "CodeEditor",
  components: {SaveCodeModal},
  data () {
    return {
      modalValidate: false,
      valueToSave:''
    }
  },
  props: {
    chosenLanguage: {
      type: Object,
      default() {
        return  { text: 'java', value: 62 }
      }
    },
    value: {
      type: String,
      default: "public class MatSym {    public static void main(String[]args) {\n      System.out.println(2+2);\n    }\n}"
    }
  },
  async mounted() {

    loader.init().then((monaco) => {
      const editorOptions = {
        value : this.value,
        language: this.chosenLanguage.text,
        minimap: { enabled: false },

      };

      window.editor  = monaco.editor.create(document.getElementById("editor"),editorOptions);

    });


  },
  watch : {
    chosenLanguage() {

        const model = window.editor.getModel(this); // we'll create a model for you if the editor created from string value.
        monaco.editor.setModelLanguage(model, this.chosenLanguage.text)


      },
      immediate: true,

  },
  methods: {
    valueToBeSaved(){
      this.valueToSave = window.editor.getValue()
    },

    compile(){
      let res = ""
      let qs = require("qs");
      let code = window.editor.getValue()
      let data = {
        source_code: code,
        language_id: this.chosenLanguage.value,
        stdin: ""
      }
      let mydata = JSON.stringify(data)

      const axios = require("axios");

      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'false', fields: '*', wait: 'true'},
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'bd5865dd36msh2b759cf329fe440p1adaecjsna54592bd1706',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: mydata
      };

      axios.request(options).then((response) =>{

        res = response.data

        // alert("ok")
        this.$emit('output', res)
      }).catch(function (error) {
        console.error(error);
        alert("An error occured while running")
      });

      if(res !== ""){
        this.$emit('output',res)
      }

    },
  }
};
</script>












