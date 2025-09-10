import { baseApis } from "../../main/baseApis";

const businessCreateProduct = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/product/create-product`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    deletePorduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/delete-product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const { useCreateProductMutation, useDeletePorductMutation } =
  businessCreateProduct;
