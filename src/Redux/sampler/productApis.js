import { baseApis } from "../main/baseApis";

const productApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProductApis: builder.query({
      query: ({ selectedCategory, sortBy, searchTerm }) => ({
        url: `/product/get-all-product?category=${selectedCategory}`,
        method: "GET",
        params: { sort: sortBy, searchTerm },
      }),
      providesTags: ["Bookmark", "product"],
    }),
    getBusinessProductApis: builder.query({
      query: ({ id, status, searchTerm, sort, category }) => ({
        url: `/product/get-all-product?bussiness=${id}`,
        method: "GET",
        params: { status, searchTerm, sort, category },
      }),
      providesTags: ["Bookmark", "product", "businessProfile"],
    }),
    getCategoryProductApis: builder.query({
      query: ({ id }) => ({
        url: `/product/get-all-product?category=${id}`,
        method: "GET",
      }),
      providesTags: ["Bookmark"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `/product/get-all-product`,
        method: "GET",
      }),
      providesTags: ["Bookmark", "product"],
    }),
    getSingleProductApis: builder.query({
      query: ({ id }) => ({
        url: `/product/get-single-product/${id}`,
        method: "GET",
      }),
      providesTags: ["Bookmark", "product"],
    }),
    bookmarkUpdate: builder.mutation({
      query: ({ id }) => ({
        url: `/bookmark/add-delete-bookmark/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Bookmark"],
    }),
    getVariantProductApis: builder.query({
      query: ({ id }) => ({
        url: `/variant/get-product-variant/${id}`,
        method: "GET",
      }),
      providesTags: ["Bookmark"],
    }),
    softDeleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/soft-delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmark", "product", "businessProfile"],
    }),
    changeProductStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/change-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Bookmark", "product", "businessProfile", "product"],
    }),
  }),
});

export const {
  useGetProductApisQuery,
  useGetBusinessProductApisQuery,
  useGetCategoryProductApisQuery,
  useGetSingleProductApisQuery,
  useBookmarkUpdateMutation,
  useGetVariantProductApisQuery,
  useGetAllProductsQuery,
  useSoftDeleteProductMutation,
  useChangeProductStatusMutation,
} = productApis;
