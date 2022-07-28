<template>
  <div>

    <h1 class="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
      Output
    </h1>

    <div class="container fluid" >
      <textarea v-if="success === true" class="positive w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto" style="width: 400px; height: 250px">
      {{ value.output }}
    </textarea>
    <textarea  v-else class="negative w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto" style="width: 400px; height: 250px">
      {{ value.error }}
    </textarea>
      <button class="button click ml-2" @click="clearOutputWindow()">Clear</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "OutputWindow",
  props: {
    success: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      // default: ""
    }
  },
  methods:{
    clearOutputWindow(){
      this.value = {}
    }
  }
}
</script>

<style>
.negative {
  color: red;
}

.positive {
  color: green;
}
</style>