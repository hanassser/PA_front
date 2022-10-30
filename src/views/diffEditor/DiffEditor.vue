<template>
  <div class="container">

  <div class="row mt-6" id="details" ref="details">
    <div class="col">
    <article class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="`https://cn.gravatar.com/avatar/${codepost.userId}?s=164&d=monsterid`" style="border-radius: 5px;">
        </figure>
      </div>
      <div class="media-content">
        <div class="">
          <p class="ellipsis is-ellipsis-1">
            <el-tooltip class="item" effect="dark" :content="codepost.title" placement="top">
              <router-link :to="{name:'codepost-detail',params:{id:codepost.id}}">
                <span class="is-size-6">{{ codepost.description }}</span>
              </router-link>
            </el-tooltip>
          </p>
        </div>
        <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
          <div class="level-left">
            <div class="level-left">

              <span class="mr-1">
                        Posted at : {{ dayjs(codepost.createTime).format("YYYY/MM/DD") }}
                      </span>

              <span
                  class="tag is-hidden-mobile is-success is-light mr-1"
              >
                        Language : {{codepost.language}}
                      </span>

              <span class="is-hidden-mobile">View : {{ codepost.view }}</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="media-right" />
    </article>

    </div>
      <div class="col">
    <article class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="`https://cn.gravatar.com/avatar/${codepostToCompare.userId}?s=164&d=monsterid`" style="border-radius: 5px;">
        </figure>
      </div>
      <div class="media-content">
        <div class="">
          <p class="ellipsis is-ellipsis-1">
            <el-tooltip class="item" effect="dark" :content="codepostToCompare.title" placement="top">
              <router-link :to="{name:'codepost-detail',params:{id:codepostToCompare.id}}">
                <span class="is-size-6">{{ codepostToCompare.description }}</span>
              </router-link>
            </el-tooltip>
          </p>
        </div>
        <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
          <div class="level-left">
            <div class="level-left">

              <span class="mr-1">
                        Posted at : {{ dayjs(codepostToCompare.createTime).format("YYYY/MM/DD") }}
                      </span>

              <span
                  class="tag is-hidden-mobile is-success is-light mr-1"
              >
                        Language : {{codepostToCompare.language}}
                      </span>

              <span class="is-hidden-mobile">View : {{ codepostToCompare.view }}</span>
            </div>
          </div>
        </nav>
      </div>
      <div class="media-right" />
    </article>
      </div>

  </div>


  <div class="mt-4" id="diffeditor" ref="diffeditor" style="width: 100%
  ; height: 500px"></div>
  </div>
</template>

<script>
import loader from "@monaco-editor/loader";
import {getCodePost} from "../../api/codepost";

export default {
  name: "DiffEditor",
  data () {
    return {
      diffEditor: null,
      ogEditor : null,
      toCompareEditor : null,
      codepost: {},
      codepostToCompare: {},
      language: {}
    }
  },
  created() {
    this.loadMonaco();

  },
  methods: {

    async loadMonaco() {
      await this.fetchCodePosts()
      loader.init().then((monaco) => {

        this.language = { text: this.codepost.language, value: this.codepost.languageId }
        this.ogEditor  = monaco.editor.createModel(this.codepost.code,this.language.text);
        this.toCompareEditor  = monaco.editor.createModel(this.codepostToCompare.code,this.language.text);
        this.diffEditor = monaco.editor.createDiffEditor(document.getElementById('diffeditor'), {
          // You can optionally disable the resizing
          enableSplitViewResizing: true,
          originalEditable: false, // for left pane
          readOnly: true,         // for right pane
        });
        this.diffEditor.setModel({
          original: this.ogEditor,
          modified: this.toCompareEditor
        });
      })
    },
    async fetchCodePosts() {
      await getCodePost(this.$route.params.id).then((value) => {
        this.codepost = value.data.codepost;


      });
      await getCodePost(this.$route.params.idtocompare).then((value) => {
        this.codepostToCompare = value.data.codepost;

      });

    },


  },
}
</script>

<style scoped>

</style>
