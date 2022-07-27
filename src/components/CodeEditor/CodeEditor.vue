<template>
  <div>

  <div class="mt-2" id="editor" ref="editor" style="width: 600px; height: 500px"></div>
  <button class="button click" @click="compile()">Run</button>
  </div>
</template>

<script>
import loader from "@monaco-editor/loader";
import axios from "axios";

export default {
  name: "CodeEditor",
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
<!--<script>-->
<!--import loader from "@monaco-editor/loader"-->

<!--// export component-->
<!--export default {-->
<!--name: "CodeEditor",-->
<!--functional: true,-->
<!--// components: { Editor },-->
<!--render(h, c) {-->
<!--let { onChange, language, code, theme } = c.props-->
<!--const [value, setValue] = useState(code || "")-->

<!--const handleEditorChange = value => {-->
<!--setValue(value)-->
<!--onChange("code", value)-->
<!--}-->
<!--  monaco.editor.create(document.getElementById("editor"),editorOptions);-->

<!--// return (-->
<!--// <div class="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">-->
<!--// <editor-->
<!--//     height="85vh"-->
<!--//     width={`100%`}-->
<!--//     language={language || "javascript"}-->
<!--// value={value}-->
<!--// theme={theme}-->
<!--// defaultValue="// some comment"-->
<!--// onChange={handleEditorChange}-->
<!--// />-->
<!--// </div>-->
<!--// )-->
<!--}-->
<!--}-->
<!--</script>-->