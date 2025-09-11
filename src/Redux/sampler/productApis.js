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
      query: ({ id, status, searchTerm, sort }) => ({
        url: `/product/get-all-product?bussiness=${id}`,
        method: "GET",
        params: { status, searchTerm, sort },
      }),
      providesTags: ["Bookmark", "product"],
    }),
    getCategoryProductApis: builder.query({
      query: ({ id }) => ({
        url: `/product/get-all-product?category=${id}`,
        method: "GET",
      }),
      providesTags: ["Bookmark"],
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
  }),
});

export const {
  useGetProductApisQuery,
  useGetBusinessProductApisQuery,
  useGetCategoryProductApisQuery,
  useGetSingleProductApisQuery,
  useBookmarkUpdateMutation,
  useGetVariantProductApisQuery,
} = productApis;
