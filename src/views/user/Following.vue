<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        Followers
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-card v-for="item in followerList">
            <router-link class="level-item" :to="{ path: `/member/${item.followerName}/home` }">
            <li style="list-style-type:none;" @click="toFollowerProfile">
              {{ item.followerName }}
            </li>
            </router-link>
          </el-card>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import {getAllFollowersArray} from "@/api/follow";

export default {
  name: 'Follower',
  data() {
    return {
      follower: {
        id: '',
      },
      followerList: [],
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      getAllFollowersArray(this.$store.getters.user.id).then(res => {
        const {data} = res
        this.followerList = data
      })
    },
    toFollowerProfile(){

    }
  }
}
</script>

<style scoped>

</style>