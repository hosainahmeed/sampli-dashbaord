import { baseApis } from "../../main/baseApis";

const variantApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    addVariant: builder.mutation({
      query: (data) => ({
        url: `/variant/create-variant`,
        method: "POST",
        body: data,
      }),
    }),
    updateVariant: builder.mutation({
      query: ({ data, id }) => ({
        url: `/variant/update-variant/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `/variant/delete-variant/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = variantApis;
