<template>

  <div class="container">
    <div>
      <h1>{{ this.codepost.language }}</h1>
      <div class="mt-2" id="editor" ref="editor" @change="valueToBeSaved()" style="width: 600px; height: 500px"></div>
      <div class="row">
        <button class="button click" @click="compile()">Run</button>
        <button class="button click"  @click="modalValidate = !modalValidate">Review</button>
        <review-code-modal onfocus="openModal()" :codepost="this.codepost" :code="this.editor.getValue()"
                         v-if="modalValidate"
                         @close="modalValidate = false"/>
      </div>
    </div>
    <div class="ml-3">
      <OutputWindow :status_id="runOutput.status_id" :value="runOutput"></OutputWindow>
    </div>
  </div>
</template>

<script>

import OutputWindow from "../../components/CodeEditor/OutputWindow";
import lvEditor from '@/components/CodeEditor/CodeEditor';
import {getCodePost} from "../../api/codepost";
import loader from "@monaco-editor/loader";
import ReviewCodeModal from "../../components/CodeEditor/ReviewCodeModal";
export default {
  name: 'CodeReview',
  components: {lvEditor, OutputWindow, ReviewCodeModal},
  data() {
    return {

      editor: null,
      language: {},
      modalValidate: false,
      valueToSave: '',
      value: "",
      runOutput : {
        status_id: 3,
        error: "",
        timestamp: "",
        output: "",
        stderr : "",
        language: "",
        version: "",
        stdout: ""
      },
      codepost: {},
      code: ""
    }
  },

  created() {
    this.fetchCodePost();
  },
  methods: {
    async fetchCodePost() {
      getCodePost(this.$route.params.id).then((value) => {
        this.codepost = value.data.codepost;

        this.language = { text: this.codepost.language, value: this.codepost.languageId }
        this.code = this.codepost.code
        loader.init().then((monaco) => {
          const editorOptions = {
            value : this.codepost.code,
            language: this.language.text,
            minimap: { enabled: false },

          };

          this.editor  = monaco.editor.create(document.getElementById("editor"),editorOptions);

        });
      });


    },
    openModal(){
      this.modalValidate = !modalValidate
      this.valueToSave = this.editor.getValue()
    },
    handleUpdate: function () {
      this.topic.content = this.contentEditor.getValue();
      update(this.topic).then((response) => {
        const { data } = response;
        setTimeout(() => {
          this.$router.push({
            name: "post-detail",
            params: { id: data.id },
          });
        }, 800);
      });
    },
    getResult(output)
    {
      this.runOutput=output;
    },
    valueToBeSaved(){
      this.valueToSave = this.editor.getValue()
    },

    compile(){
      let res = ""
      let qs = require("qs");
      let code = this.editor.getValue()
      let data = {
        source_code: code,
        language_id: this.codepost.languageId,
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
        this.runOutput = res
      }).catch(function (error) {
        console.error(error);
        alert("Une erreur est survenue")
      });



    },
  }
}
</script>
