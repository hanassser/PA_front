<template>
  <modal
      title="Modal with form + Validate"
      @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="onSubmitCode">
        <!-- Title -->
        <div class="form-item" :class="{ errorInput: $v.title.$error }">
          <label>Title:</label>
          <p class="errorText" v-if="!$v.title.required"> Field is required!</p>
          <input
              v-model="title"
              :class="{ error: $v.title.$error }"
              @change="$v.title.$touch()">
        </div>
        <!-- Description -->
        <div class="form-item" :class="{ errorInput: $v.description.$error }">
          <label>Description:</label>
          <p class="errorText" v-if="!$v.description.required"> Field is required!</p>
          <input
              v-model="description"
              :class="{ error: $v.description.$error }"
              @change="$v.description.$touch()">
        </div>
        <!-- Button -->
        <button class="button click">Save</button>
      </form>
    </div>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import modal from '@/components/CodeEditor/Modal'
import {createcodePost} from "@/api/codepost";
export default {
  components: {
    modal
  },
  data () {
    return {
      title: '',
      description: '',

    }
  },
  props: {
    language: {
      type: String,
    },
    code: {
      type: String,
     }
  },
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },

  },
  methods: {
    onSubmitCode () {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        const codepost = {
          title: this.title,
          description: this.description,
          language : this.language,
          code : this.code
        }

        console.log(JSON.stringify(codepost))

        createcodePost(codepost).then((response) => {
          const { codepost } = response
          this.$message({
            message: "code saved !",
            type: "success",
            duration: 2000,
          });
          setTimeout(() => {

          }, 800)
        })
      } else {
        console.log('error submit!!')
        return false
      }


        this.$v.$reset()
        this.$emit('close')
      }


  }
}
</script>

<style lang="scss">
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: red;
}
.form-item {
  &.errorInput .errorText {
    display: block;
  }
}
input.error {
  border-color: red;
}
</style>