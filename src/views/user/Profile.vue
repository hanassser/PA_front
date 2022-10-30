<template>
  <div class="member">
    <div class="columns">
      <div class="column is-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered">
            <el-avatar :size="64" :src="`https://cn.gravatar.com/avatar/${topicUser.id}?s=164&d=monsterid`" />
            <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
          </div>
          <div>
            <p class="content">Score：<code>{{ topicUser.score }}</code></p>
            <p class="content">Since：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
            <p class="content">About：{{ topicUser.bio }}</p>
          </div>
        </el-card>
        <section id="author">
          <el-card class="" shadow="never">
            <div slot="header">
              <span class="has-text-weight-bold has-text-centered">   ❤  Relationships</span>
            </div>
            <div class="has-text-centered">

              <div class="columns is-mobile">
                <div class="column is-half">
                  <code>{{ this.followsCount }}</code>
                  <router-link :to="{ name: 'follows',params:{id:userId} }">            <p>Follows</p>
                  </router-link>
                </div>

                <div class="column is-half">
                  <code>{{ this.followerCount }}</code>
                  <router-link :to="{ name: 'followers',params:{id:userId} }">            <p>Followers</p>
                  </router-link>
                </div>
              </div>
              <div>
                <button
                    v-if="hasFollow"
                    class="button is-success button-center is-fullwidth"
                    @click="handleUnFollow(userId)"
                >
                  followed
                </button>

                <button v-else class="button is-link button-center is-fullwidth" @click="handleFollow(userId)">
                  follow
                </button>
              </div>
            </div>
          </el-card>
        </section>
      </div>

      <div class="column">
        <!--Posted topic-->
        <el-card class="box-card content" shadow="never">
          <div slot="header" class="has-text-weight-bold">
            <span>Topic</span>
          </div>

          <div v-if="topics.length===0">
            Nothing yet
          </div>

          <div v-else class="topicUser-info">
            <article v-for="(item, index) in topics" :key="index" class="media">
              <div class="media-content">
                <div class="content ellipsis is-ellipsis-1">
                  <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                    <router-link :to="{ name: 'post-detail', params: { id: item.id } }">
                      {{ item.title }}
                    </router-link>
                  </el-tooltip>
                </div>
                <nav class="level has-text-grey is-size-7">
                  <div class="level-left">
                    <span class="mr-1">
                      Posted at:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </span>
                  </div>
                </nav>
              </div>
              <div v-if="token" class="media-right">
                <div v-if="topicUser.username === user.username" class="level">
                  <div class="level-item mr-1">
                    <router-link :to="{name:'topic-edit',params: {id:item.id}}">
                      <span class="tag is-warning">Edit</span>
                    </router-link>
                  </div>
                  <div class="level-item">
                    <a @click="handleDelete(item.id)">
                      <span class="tag is-danger">Delete</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!--pagination-->
          <pagination
            v-show="page.total > 0"
            class="mt-5"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserById"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoByName } from '@/api/user'
import pagination from '@/components/Pagination/index'
import { mapGetters } from 'vuex'
import { deleteTopic } from '@/api/post'
import Author from '@/views/post/Author'
import {unFollow, follow, getAllFollowersArray, hasFollow, getAllFollowsArray} from "../../api/follow";

export default {
  name: 'Profile',
  components: { pagination, Author },
  data() {
    return {
      topicUser: {},
      topics: {},
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      userId: "",
      followerCount: 0,
      followsCount: 0,
      hasFollow: false
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  async created() {
    await this.fetchUserById()
    await this.fetchInfoFollowers()
    await this.fetchInfoFollows()
    await this.fetchInfo()
    this.userId = this.topicUser.id
  },
  methods: {
    async fetchUserById() {
      await getInfoByName(this.$route.params.username, this.page.current, this.page.size).then(res => {
        const { data } = res
        this.topicUser = data.user
        this.userId = this.topicUser.id
        this.page.current = data.topics.current
        this.page.size = data.topics.size
        this.page.total = data.topics.total
        this.topics = data.topics.records
      })
    },
    async fetchInfoFollowers() {

      getAllFollowersArray(this.userId).then(value => {
        const { data } = value
        this.followerCount = data.length

      })

    },
    async fetchInfoFollows() {

      getAllFollowsArray(this.userId).then(value => {
        const { data } = value
        this.followsCount = data.length

      })

    },
    async fetchInfo() {
      // if(this.token != null && this.token !== '')
      // {
        hasFollow(this.userId).then(value => {
          const { data } = value
          this.hasFollow = data.hasFollow
        })
      // }
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
    handleFollow: function(id) {
      if(this.token != null && this.token !== '')
      {
        follow(id).then(response => {
          const { message } = response
          this.$message.success(message)
          this.hasFollow = !this.hasFollow
          this.followerCount = parseInt(this.followerCount) + 1
        })
      }
      else{
        this.$message.success('please login first')
      }
    },
    handleUnFollow: function(id) {
      unFollow(id).then(response => {
        const { message } = response
        this.$message.success(message)
        this.hasFollow = !this.hasFollow
        this.followerCount = parseInt(this.followerCount) - 1
      })
    }
  }
}
</script>

<style scoped>

</style>
