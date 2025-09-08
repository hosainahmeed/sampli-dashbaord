import { baseApis } from "../main/baseApis";

const wishListApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    wishListApis: builder.query({
      query: () => ({
        url: "/bookmark/my-bookmarks",
        method: "GET",
      }),
      providesTags: ["Bookmark"],
    }),
  }),
});

export const { useWishListApisQuery } = wishListApis;
