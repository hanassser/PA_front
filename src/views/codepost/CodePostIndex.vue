<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="Your Codes" name="ycodes">
            <article v-for="(item, index) in articleList" :key="index" class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`" style="border-radius: 5px;">
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <router-link :to="{name:'codepost-detail',params:{id:item.id}}">
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                        {{ item.alias }}
                      </router-link>

                      <span class="mr-1">
                        Posted at : {{ dayjs(item.createTime).format("YYYY/MM/DD") }}
                      </span>

                      <span
                          class="tag is-hidden-mobile is-success is-light mr-1"
                      >
                        Language : {{item.language}}
                      </span>

                      <span class="is-hidden-mobile">View : {{ item.view }}</span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
          <!-- execute code -->
          <el-tab-pane label="Contributions" >



          </el-tab-pane>
          <!--          <Monaco />-->


        </el-tabs>

      </div>

      <!--pagination-->
      <pagination
          v-show="page.total > 0"
          :total="page.total"
          :page.sync="page.current"
          :limit.sync="page.size"
          @pagination="init"
      />
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MonacoEditor from 'monaco-editor-vue';
import Monaco from '@/components/Monaco.vue';
import Landing from '@/components/CodeEditor/Landing'
import {getListCodePostUser} from "@/api/codepost";

export default {
  name: 'CodePostList',
  components: { Pagination, MonacoEditor, Monaco, Landing },
  data() {
    return {
      activeName: 'ycodes',
      articleList: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'ycodes'
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
      getListCodePostUser(this.page.current, this.page.size, tab).then((response) => {
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
  }
}
</script>

<style scoped>

</style>
