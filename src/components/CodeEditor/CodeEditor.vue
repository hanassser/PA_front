<template>
  <div>

  <div class="mt-2" id="editor" ref="editor" @change="valueToBeSaved()" style="width: 600px; height: 500px"></div>
    <div class="row">
      <button class="button click" @click="compile()">Run</button>
      <button class="button click"  @click="modalValidate = !modalValidate">Save</button>
<!--      <button class="button click">Save</button>-->
      <save-code-modal :language="this.chosenLanguage.text" :code="valueToSave"
          v-if="modalValidate"
          @close="modalValidate = false"/>
    </div>
  </div>
</template>

<script>
import loader from "@monaco-editor/loader";
import axios from "axios";
import {post} from "@/api/post";
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
      default: { text: 'java', value: 'java' }
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

      console.log("codeEditor : "+this.chosenLanguage.text)
        const model = window.editor.getModel(this); // we'll create a model for you if the editor created from string value.
        monaco.editor.setModelLanguage(model, this.chosenLanguage.text)

        // console.log(window.editor.getModel(this))

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
      console.log("code : " + code)
      let data = qs.stringify({
        code: code,
        language: this.chosenLanguage.value,
        input: ""
      });

      console.log("data : " + JSON.stringify(data))
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      };
      let config = {
        method: "post",
        url: "https://codex-api.herokuapp.com/",
        headers: headers,
        data: data
      };
      //calling the code compilation API
      axios(config)
          .then(((response)=>{
            res = response.data
            console.log("config : " + JSON.stringify(config))
            // res.send(response.data)
            console.log("response.data : " + JSON.stringify(response.data))
             this.$emit('output',res)

          })).catch((error)=>{
        console.log("response error : " + error);
        alert("Une erreur est survenue");
      });
      if(res !== ""){
        console.log("codeEditor emit : " + res)
        this.$emit('output',res)
      }
    },
  }
};
</script>
