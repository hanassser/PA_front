<template>
  <el-card class="" shadow="never">
    <div slot="header">
      <span class="has-text-weight-bold">🧐 Previous versions </span>
    </div>
    <div>
      <div v-if="codePostBefore === null || codePostBefore.length === 0">
        OG Post 😎
      </div>
      <div v-else>
      <p v-for="(item,index) in codePostBefore" :key="index" :title="item.title" class="block ellipsis is-ellipsis-1" style="border-radius:4px;">


          <router-link :to="{name:'codepost-detail',params: { id: item.id }}">
          <span v-if="index<9" class="tag">
            0{{ parseInt(index) + 1 }}
          </span>
            <span v-else class="tag">
            {{ parseInt(index) + 1 }}
          </span>
            {{ item.description }}

          </router-link>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import {getListBefore} from "../../api/codepost";

export default {
  name: 'CollabBefore',
  props: {
    codePostId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      codePostBefore: []
    }
  },
  created() {
    this.fetchCodePostBefore()
  },
  methods: {
    fetchCodePostBefore() {
      getListBefore(this.codePostId).then(value => {
        const { data } = value
        this.codePostBefore = data
        this.codePostBefore.splice(0,1)
        this.codePostBefore.splice(this.codePostBefore.length -1, 1)
        this.codePostBefore.reverse()
       })
    }
  }
}
</script>

<style scoped>

</style>
