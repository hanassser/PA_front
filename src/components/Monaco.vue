<template>
  <section>
    <MonacoEditor
              width="650"
              height="500"
              theme="vs-dark"
              language="javascript"
              :options="options"
              @change="onChange"
            
            ></MonacoEditor>

                <div  class="has-text-left">
                <b-button type="is-danger" style="margin-top:20px" tag="router-link" :to="{path:'/post/create'}" outlined>Run</b-button>
              </div>    
            </section>
</template>

<script>

import { execute } from '@/api/code/code'
import MonacoEditor from 'monaco-editor-vue';

export default {
  name: 'Monaco',
  components: { MonacoEditor },
  data() {
    return {
      activeName: 'latest',
      articleList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'latest'
      },
      codeResponse:{
        success: Boolean,
        output: "Output",
        language:"",
        timestamp:""
      },
      options:{

      }
    }
  },
  created() {
    this.init(this.tab)
  },
  methods: {
    init(tab) {
      getList(this.page.current, this.page.size, tab).then((response) => {
        const { data } = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.articleList = data.records
      })
    },
    handleClick(tab) {
      this.page.current = 1
      this.init(tab.name)
    },
    async executeCode(body) {
      execute(body).then(response => {
        const { data } = response
       this.codeResponse.success = data.success
        this.codeResponse.output = data.output
        this.codeResponse.language = data.language
        this.codeResponse.timestamp = data.timestamp
        console.log(this.codeResponse)
      })
    },
    onChange(body) {
    //  execute(body);
      console.log(body);
    },
  }
}
</script>

<style scoped>

</style>