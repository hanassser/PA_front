<template>
  <div class="columns">

    <div class="column is-three-quarters">

      <el-card
          class="box-card"
          shadow="never"
      >
        <div
            slot="header"
            class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ codepost.title }}</p>

          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(codepost.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
            <el-divider direction="vertical" />
            <span>From：{{ codePostUser.alias }}</span>
            <el-divider direction="vertical" />
            <span>View：{{ codepost.view }}</span>
          </div>
        </div>

        <!--Markdown-->
        <div id="preview" />

        <!--language-->
        <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + codepost.language }}
                  </b-tag>
              </b-taglist>
            </p>
          </div>
          <div
              class="level-right"
          >
            <router-link
                v-if="token && user.id === codePostUser.id"
                class="level-item"
                :to="{name:'code-review',params: {id:codepost.id}}"
            >
              <span class="tag">Review</span>
            </router-link>

            <router-link
                v-if="token && user.id !== codePostUser.id"
                class="level-item"
                :to="{name:'code-collab',params: {id:codepost.id}}"
            >
              <span class="tag">Collaborate</span>
            </router-link>

            <router-link
                class="level-item"
                :to="{name:'code-collab',params: {id:codepost.id}}"
            >
              <span class="tag">Run </span>
            </router-link>
            <a v-if="token && user.id === codePostUser.id" class="level-item">
              <span
                  class="tag"
                  @click="handleDelete(codepost.id)"
              >Delete</span>
            </a>
          </div>

        </nav>
      </el-card>
      <button class="button is-link button-center is-fullwidth" @click="modalValidate = !modalValidate">
        Compare code
      </button>
<!--      <button class="button click"  @click="modalValidate = !modalValidate">Save</button>-->
      <compare-modal
          :codePostId="codepost.id"
          v-if="modalValidate"
          @close="modalValidate = false"/>

      <lv-comments :slug="codepost.id" />
    </div>

    <div class="column">
      <!--author-->
      <Author
          v-if="flag"
          :user="codePostUser"
      />
    <!--      collab-->
      <collab-before
          :codePostId="codepost.id">
      </collab-before>

      <collab-after
          :codePostId="codepost.id">
      </collab-after>
<!--      &lt;!&ndash;recommend&ndash;&gt;-->
<!--      <recommend-->
<!--          v-if="flag"-->
<!--          :topic-id="codepost.id"-->
<!--      />-->
    </div>
  </div>
</template>

<script>
import { deleteTopic } from '@/api/post'
import { mapGetters } from 'vuex'
import Author from '@/views/post/Author'
import Recommend from '@/views/post/Recommend'
import LvComments from '@/components/Comment/Comments'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {getCodePost} from "../../api/codepost";
import CollabAfter from "@/views/codeVersion/Collab"
import CollabBefore from "@/views/codeVersion/Version"
import CompareModal from '@/components/CodeEditor/CompareModal'

export default {
  name: 'CodePostDetail',
  components: { Author, Recommend, LvComments, CollabBefore, CollabAfter, CompareModal },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      modalValidate: false,
      flag: false,
      codepost: {
        code: '',
        id: this.$route.params.id
      },
      tags: [],
      codePostUser: {}
    }
  },
  mounted() {
    this.fetchTopic()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // initialize
    async fetchTopic() {
      getCodePost(this.$route.params.id).then(response => {
        const { data } = response
        document.title = data.codepost.title

        this.codepost = data.codepost
        this.codePostUser = data.user
        this.renderMarkdown(this.codepost.code)
        this.flag = true
      })
    },
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    },
    handleRun(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
</style>
