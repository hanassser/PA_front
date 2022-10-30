<template>
  <el-card class="" shadow="never">
    <div slot="header">
      <span class="has-text-weight-bold">🤓 From here </span>
    </div>
    <div>
      <div v-if="codePostAfter === null || codePostAfter.length === 0">
        Nothing to show...yet
      </div>
      <div v-else>
      <p v-for="(item,index) in codePostAfter" :key="index" :title="item.title" class="block ellipsis is-ellipsis-1">
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
import {getListAfter} from "../../api/codepost";

export default {
  name: 'CollabAfter',
  props: {
    codePostId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      codePostAfter: []
    }
  },
  created() {
    this.fetchCodePostAfter()
  },
  methods: {
    fetchCodePostAfter() {
      getListAfter(this.codePostId).then(value => {
        const { data } = value
        this.codePostAfter = data

      })
    }
  }
}
</script>

<style scoped>

</style>
