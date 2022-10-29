<template>
  <div class="container">
<!--    <div >-->
    <div>
      <language-dropdown @input="ChangeL($event)"></language-dropdown>
      <lv-editor @output="getResult($event)" :chosenLanguage="language" :value="value"></lv-editor>
    </div>
    <div class="ml-3">
      <OutputWindow :status_id="runOutput.status_id" :value="runOutput"></OutputWindow>
    </div>
<!--    </div >-->
  </div>
</template>

<script>
import lvEditor from '@/components/CodeEditor/CodeEditor'
import LanguageDropdown from "@/components/CodeEditor/LanguageDropdown";
import OutputWindow from "@/components/CodeEditor/OutputWindow";

export default {
  name: 'Landing',
  components: {lvEditor, LanguageDropdown, OutputWindow},
  data: function() {
    return {
      language: {
        text: "java",
        value:62
      },
      value : "",
      runOutput : {
        status_id: 3,
        error: "",
        timestamp: "",
        output: "",
        stderr : "",
        language: "",
        version: "",
        stdout: ""
      }
    }
  },

  methods: {
    ChangeL(language)
    {
      console.log("landing : "+ language.text)
      this.language=language;
    },
    getResult(output)
    {
      console.log("landing getResult: "+ JSON.stringify(output))
      this.runOutput=output;
    },
  }

}
</script>

<style>
.container {
  display: flex; /* or inline-flex */
}
</style>
