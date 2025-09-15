import { baseApis } from "../../main/baseApis";

const businessStoreApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessStore: builder.query({
      query: (id) => ({
        url: `/store/get-bussiness-store/${id}`,
        method: "GET",
      }),
      providesTags: ["businessStore"],
    }),
    updateBusinessStore: builder.mutation({
      query: ({ data, id }) => ({
        url: `/store/update-store/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["businessStore"],
    }),
    createBusinessStore: builder.mutation({
      query: (data) => ({
        url: `/store/create-store`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["businessStore"],
    }),
  }),
});

export const {
  useGetBusinessStoreQuery,
  useUpdateBusinessStoreMutation,
  useCreateBusinessStoreMutation,
} = businessStoreApis;
