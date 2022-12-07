import cubejs from '@cubejs-client/core';

export const cubejsApi = cubejs(
  process.env.CUBEJS_API_SECRET,
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' },
);