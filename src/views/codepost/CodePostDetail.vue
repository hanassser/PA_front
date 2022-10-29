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
                class="level-item"
                :to="{name:'topic-edit',params: {id:codepost.id}}"
            >
              <span class="tag">Edit</span>
            </router-link>

            <a class="level-item">
              <span
                  class="tag"
                  @click="handleRun(codepost.id)"
              >Run</span>
            </a>
            <a v-if="token && user.id === codePostUser.id"class="level-item">
              <span
                  class="tag"
                  @click="handleDelete(codepost.id)"
              >Delete</span>
            </a>
          </div>

        </nav>
      </el-card>

      <lv-comments :slug="codepost.id" />
    </div>

    <div class="column">
      <!--author-->
      <Author
          v-if="flag"
          :user="codePostUser"
      />
      <!--recommend-->
      <recommend
          v-if="flag"
          :topic-id="codepost.id"
      />
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

export default {
  name: 'CodePostDetail',
  components: { Author, Recommend, LvComments },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
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
        console.log("DATA : " + JSON.stringify(data))
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
