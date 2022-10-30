<template>
  <div>

    <select v-model="selected"  @change="passEvent()">
      <option v-for="option in options" v-bind:value="option" :key="option.value">
        {{ option.text }}
      </option>
    </select>

  </div>
</template>
<script>
export default {
  name: "LanguageDropdown",
  data: function() {
    return {
      selected: {text: 'java', value: 62 },
      options: [
        { text: 'java', value: 62 },
        { text: 'javascript', value: 63 },
        { text: 'cpp', value: 54 },
        { text: 'python', value: 71 }
      ],
    }
  },
  props: {
    onClick: 'function',
    props: {
      placeholder: { type: String }
    },
},
methods: {
  passEvent()
  {
    this.$emit('input',this.selected)
  }
}
}
</script>
