<template>
  <compare-modal
      @close="$emit('close')">
    <div slot="body">

    </div>
  </compare-modal>
</template>

<script>

import CompareModal from "./CompareModal";
export default {
  name: "selectCompareModal",
  components: {
    CompareModal
  },
}
</script>

<style scoped>

</style>
