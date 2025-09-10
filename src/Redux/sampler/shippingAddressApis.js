import { baseApis } from "../main/baseApis";

const shippingAddressApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getShippingAddress: builder.query({
      query: () => ({
        url: "/shipping-address/get-shipping-address",
        method: "GET",
      }),
      providesTags: ["ShippingAddress"],
    }),
    updateShippingAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shipping-address/update-shipping-address/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),
    addShippingAddress: builder.mutation({
      query: ({ data }) => ({
        url: `/shipping-address/create-shipping-address`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ShippingAddress"],
    }),
  }),
});

export const {
  useGetShippingAddressQuery,
  useUpdateShippingAddressMutation,
  useAddShippingAddressMutation,
} = shippingAddressApis;
