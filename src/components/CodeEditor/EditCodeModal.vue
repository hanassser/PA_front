<template>
  <modal
      title="Modal with form + Validate"
      @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="onSubmitCode">
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
  name: "EditCodeModal",
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
    codepost: {
      type: Object
    },

    code: {
      type: String,
    }
  },
  validations: {
    description: {
      required,
    },

  },
  methods: {
    onSubmitCode () {
      this.$v.$touch()
      if (this.codepost.code === this.code) {
        alert("You can not save : No difference with the previous code")
        return false
      }
      else if(!this.$v.$invalid) {
        const codepost = this.codepost
        codepost.code = this.code
        codepost.description = this.description
        codepost.originalPostId = this.codepost.id
        codepost.id = ""

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
        alert('Something went wrong')
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
