cube(`CovidCases`, {
  sql: `SELECT * FROM public.covid_cases`,
  
  measures: {
    virusFreeDays: {
      type: `count`,
      filters: [
        { sql: `${CUBE}.new_cases = 0` }
      ]
    },

    sumAllCases: {
      type: `sum`,
      sql: `new_cases`
    },

    sumAllDeaths: {
      type: `sum`,
      sql: `new_deaths`
    },

    ratioOfDeaths: {
      type: `number`,
      sql: `${sumAllDeaths} * 100.00 / ${sumAllCases}`,
    },

    avgCases: {
      type: `avg`,
      sql: `new_cases`,
    }
  },
  
  dimensions: {
    date: {
      sql: `date`,
      type: `string`
    },
    
    totalCases: {
      sql: `total_cases`,
      type: `number`
    },
    
    newCases: {
      sql: `new_cases`,
      type: `number`
    },
    
    totalDeaths: {
      sql: `total_deaths`,
      type: `number`
    },
    
    newDeaths: {
      sql: `new_deaths`,
      type: `number`
    },
    
    location: {
      sql: `location`,
      type: `string`
    },
  }
});
