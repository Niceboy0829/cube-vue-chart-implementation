<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    resultSet: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    if(this.resultSet) {
      const data = this.resultSet.tablePivot();
      const chartdata = {
        labels: data.map((item) => item["CovidCases.date"]),
        datasets: [
          {
            label: "Cases",
            data: data.map((item) => item["CovidCases.newCases"]),
            borderColor: "#90CDF4",
            fill: false,
          },
          {
            label: "Deaths",
            data: data.map((item) => item["CovidCases.newDeaths"]),
            borderColor: "#F56565",
            fill: false,
          },
        ],
      };
      this.renderChart(chartdata, this.options);
    }
  },
};
</script>
