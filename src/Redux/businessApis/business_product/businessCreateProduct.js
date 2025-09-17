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
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/product/update-product/${id}`,
          method: "PATCH",
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
    saveDraftProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/product/save-product-as-draft`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeletePorductMutation,
  useSaveDraftProductMutation,
} = businessCreateProduct;
