<template>
  <div class="py-6 px-8 rounded shadow-md bg-white w-48 text-center mx-3">
    <h4 class="text-sm text-gray-500 font-semibold">{{ title }}</h4>
    <div class="text-indigo-800 font-bold text-3xl mt-2">{{ count }}</div>
  </div>
</template>

<script>
export default {
  name: "Count",
  props: {
    format: {
      type: Boolean,
      default: false,
    },
    resultSet: {
      type: Object,
      default: null,
    },
    property: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    count: null,
  }),
  mounted() {
    if (this.resultSet) {
      this.count = this.resultSet.tablePivot()[0][this.property];
    }

    if (this.format) this.count = parseFloat(this.count).toFixed(2);
  },
};
</script>
