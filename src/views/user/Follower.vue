<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        Followers
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-card v-for="item in followerList">
            <li style="
list-style-type:none;
">{{ item.followerName }}
            </li>
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
        console.log(res)
        const {data} = res
        this.followerList = data
        console.log(this.followerList)
      })
    },
  }
}
</script>

<style scoped>

</style>