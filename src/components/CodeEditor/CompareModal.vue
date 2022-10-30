<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">
        <!-- header -->
        <div class="modal-header">
          <span class="modal-title"> Compare this code with :  </span>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>
        <!-- body -->
        <div class="modal-body">
          <div>
            <el-card shadow="never">
              <div slot="header" class="clearfix">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="Previous Versions" name="pastcodes">
                    <article v-for="(item, index) in codePostBefore" :key="index" class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`" style="border-radius: 5px;">
                        </figure>
                      </div>
                      <div class="media-content">
                        <div class="">
                          <p class="ellipsis is-ellipsis-1">
                            <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                              <router-link :to="{name:'diff-editor',params:{id:codePostId,idtocompare:item.id}}">
                                <span style="float:left" class="is-size-6 ml-3">{{ item.description }}</span>
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

                  <el-tab-pane label="Following Versions">
                    <article v-for="(item, index) in codePostAfter" :key="index" class="media">
                      <div class="media-left">
                        <figure class="image is-48x48">
                          <img :src="`https://cn.gravatar.com/avatar/${item.userId}?s=164&d=monsterid`" style="border-radius: 5px;">
                        </figure>
                      </div>
                      <div class="media-left">
                        <div class="">
                          <p class="ellipsis is-ellipsis-1">
                            <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                              <router-link :to="{name:'diff-editor',params:{id:codePostId,idtocompare:item.id}}">
                                <span style="float:left" class="is-size-6 ml-3">{{ item.description }}</span>

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

                </el-tabs>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {getListAfter, getListBefore, getListContribCodePostUser} from "../../api/codepost";

export default {
name: "CompareModal",
  data() {
    return {
      activeName: 'pastcodes',
      codePostBefore: [],
      codePostAfter: [],
      page: {
        current: 1,
        size: 10,
        total: 0,
        tab: 'pastcodes'
      },
    }
  },
  props: {
    codePostId: {
      type: String,
      required: true
    }
  },
  mounted () {
    document.body.addEventListener('keyup', e => {
      if (e.key === 'Escape') this.$emit('close')
    })
  },
  created() {
    this.init(this.tab)
  },
  computed: {},
  methods: {

    init(tab) {
      if (this.activeName == 1) {
        getListAfter(this.codePostId).then(value => {
          const { data } = value
          this.codePostAfter = data

        })
      } else {

        getListBefore(this.codePostId).then(value => {
          const { data } = value
          this.codePostBefore = data
          this.codePostBefore.splice(0,1)
          this.codePostBefore.splice(this.codePostBefore.length -1, 1)
          this.codePostBefore.reverse()
        })
      }
    },

    handleClick(tab) {
      this.init(tab.name)
    },
  }
}
</script>

<style lang="scss">
//animations
.modal-enter, .modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}
.modal__wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity .2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00,00,00,.48);
}
.modal-content {
  position: relative;
  max-width: 600px;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all .2s ease;
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
  @media screen and (min-width: 900px) {
    min-width: 500px;
  }
}
.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding-bottom: 20px;
  span {
    font-size: 24px;
  }
  .button-close {
    cursor: pointer;
  }
}
.modal-body {
  text-align: center;
}
.modal-bottom {
  padding-top: 40px;
}
a.another-modal {
  color: #000;
  border-bottom: 1px solid #000;
}
</style>
