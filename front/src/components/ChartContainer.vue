<template>
  <div>
    <h3
      class="text-2xl text-center mb-8 font-semibold text-gray-800 capitalize"
      v-show="country"
    >
      {{ country }}
    </h3>
    <div
      class="flex justify-center mb-8"
      v-show="country"
    >
      <query-builder :cubejs-api="cubejsApi" :query="virusFreeDaysQuery">
        <template v-slot="{ measures, resultSet, loading }">
          <count
            v-if="!loading"
            :result-set="resultSet"
            property="CovidCases.virusFreeDays"
            title="Virus Free Days"
          />
        </template>
      </query-builder>
      <query-builder :cubejs-api="cubejsApi" :query="sumAllCasesQuery">
        <template v-slot="{ measures, resultSet, loading }">
          <count
            v-if="!loading"
            :result-set="resultSet"
            property="CovidCases.sumAllCases"
            title="Total Cases"
          />
        </template>
      </query-builder>
      <query-builder :cubejs-api="cubejsApi" :query="sumAllDeathsQuery">
        <template v-slot="{ measures, resultSet, loading }">
          <count
            v-if="!loading"
            :result-set="resultSet"
            property="CovidCases.sumAllDeaths"
            title="Total Deaths"
          />
        </template>
      </query-builder>
      <query-builder :cubejs-api="cubejsApi" :query="ratioOfDeathsQuery">
        <template v-slot="{ measures, resultSet, loading }">
          <count
            v-if="!loading"
            :result-set="resultSet"
            property="CovidCases.ratioOfDeaths"
            title="Ratio, %"
            format
          />
        </template>
      </query-builder>
    </div>
    <query-builder
      v-show="lineChartQuery"
      :cubejs-api="cubejsApi"
      :query="lineChartQuery"
    >
      <template v-slot="{ measures, resultSet, loading }">
        <line-chart v-if="!loading" :result-set="resultSet" />
      </template>
    </query-builder>
  </div>
</template>

<script>
import { QueryBuilder } from "@cubejs-client/vue";
import { cubejsApi } from "../config";
import Count from "./Count";
import LineChart from "./LineChart";

export default {
  name: "ChartContainer",
  components: { Count, LineChart, QueryBuilder },
  props: {
    country: String,
  },
  data: () => ({
    cubejsApi,
    lineChartQuery: {},
    virusFreeDaysQuery: {},
    sumAllCasesQuery: {},
    sumAllDeathsQuery: {},
    ratioOfDeathsQuery: {},
  }),
  watch: {
    async country() {
      const filters = [
        {
          dimension: "CovidCases.location",
          operator: "contains",
          values: [this.country],
        },
      ];

      this.lineChartQuery = {
        dimensions: [
          "CovidCases.newCases",
          "CovidCases.newDeaths",
          "CovidCases.date",
        ],
        filters,
        order: {
          "CovidCases.date": "asc",
        },
      };

      this.virusFreeDaysQuery = {
        measures: ["CovidCases.virusFreeDays"],
        filters,
      };

      this.sumAllCasesQuery = {
        measures: ["CovidCases.sumAllCases"],
        filters,
      };

      this.sumAllDeathsQuery = {
        measures: ["CovidCases.sumAllDeaths"],
        filters,
      };

      this.ratioOfDeathsQuery = {
        measures: ["CovidCases.ratioOfDeaths"],
        filters,
      };
    },
  },
};
</script>
