import { baseApis } from "../main/baseApis";

const productApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProductApis: builder.query({
      query: ({ selectedCategory, sortBy, searchTerm }) => ({
        url: `/product/get-all-product?category=${selectedCategory}`,
        method: "GET",
        params: { sort: sortBy, searchTerm },
      }),
    }),
    bookmarkUpdate: builder.mutation({
      query: ({ id }) => ({
        url: `/bookmark/add-delete-bookmark/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Bookmark"],
    }),
  }),
});

export const { useGetProductApisQuery, useBookmarkUpdateMutation } =
  productApis;
