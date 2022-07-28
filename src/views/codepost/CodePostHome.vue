<template>
  <div>
    <div class="column">
      <CodePostList></CodePostList>
    </div>
  </div>
</template>

<script>
import CodePostList from '@/views/codepost/CodePostIndex'

export default {
  name: "CodePostHome",
  components: {CodePostList},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {

  },
  methods: {

  },
};
</script>
