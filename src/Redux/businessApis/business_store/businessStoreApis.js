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
      query: ({ id, data }) => ({
        url: `/store/update-store/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["businessStore"],
    }),
    createBusinessStore: builder.mutation({
      query: (data) => ({
        url: `/store/create-store`,
        method: "POST",
        body: data,
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
