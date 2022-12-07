<template>
  <div class="max-w-2xl mx-auto relative">
    <form action="" @submit="submit">
      <input
        type="text"
        name="search"
        placeholder="Search country..."
        class="w-full py-4 px-6 rounded-md shadow-md relative z-20"
        v-model="query"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {
      results: [],
      query: "",
      loading: false,
    };
  },
  props: {
    onSearch: Function,
  },
  methods: {
    submit(e) {
      e.preventDefault()
      this.onSearch(this.query)
    }
  },
};
</script>

<style scoped>
</style>
