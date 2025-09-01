import { baseApis } from '../main/baseApis'

const categoryApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    categorySectionApis: builder.query({
      query: () => ({
        url: '/category/all-categories',
        method: 'GET',
      }),
    }),
  }),
})

export const { useCategorySectionApisQuery } = categoryApis
