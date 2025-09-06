import { baseApis } from '../main/baseApis'

const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    updateProfileApis: builder.mutation({
      query: (data) => ({
        url: '/reviewer/update-reviewer-profile',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
})

export const { useUpdateProfileApisMutation } = profileApis
