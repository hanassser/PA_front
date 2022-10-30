<template>
  <section>
    <el-card shadow="never">
      <div slot="header">
        Follows
      </div>
      <div class="columns">
        <div class="column is-full">
          <el-card v-for="item in followsListName">
            <router-link class="level-item" :to="{ path: `/member/${item}/home` }">
              <li style="list-style-type:none;" @click="toFollowerProfile">
                {{ item}}
              </li>
            </router-link>
          </el-card>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import {getAllFollowsArray} from "../../api/follow";
import {getById} from "../../api/user";

export default {
  name: 'Follower',
  data() {
    return {
      follower: {
        id: '',
      },
      followsList: [],
      followsListName: [],
    }
  },
  created() {
    this.fetchInfo()
  },
  methods: {
    async fetchInfo() {
      await getAllFollowsArray(this.$route.params.id).then(res => {
        const {data} = res
        this.followsList = data
        console.log(JSON.stringify(this.followsList))
      })
      this.followsList.forEach(elem => this.getNameFromId(elem))
    },

    getNameFromId(id){
      getById(id).then(res => {
        this.followsListName.push(res.data.username)
        console.log(res.data.username)
        return res.data.username
      })
      },


    toFollowerProfile(){

    }
  }
}
</script>

<style scoped>

</style>
