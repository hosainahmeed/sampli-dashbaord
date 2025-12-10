import { baseApis } from "../main/baseApis";

const cartApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/add-to-cart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    increaseItem: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/increase-item-quantity`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    decreaseItem: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/decrease-item-quantity`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/delete-cart`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCart: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/remove-cart-item`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    getAllCartItems: builder.query({
      query: () => ({
        url: `/cart/view-cart`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ data }) => ({
        url: `/cart/update-quantity`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useDecreaseItemMutation,
  useIncreaseItemMutation,
  useDeleteCartMutation,
  useRemoveCartMutation,
  useGetAllCartItemsQuery,
  useUpdateCartItemMutation,
} = cartApis;
