import { baseApis } from "../main/baseApis";

const addBussinessInfoApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    addBussinessInfo: builder.mutation({
      query: (data) => ({
        url: "/bussiness/add-bussiness-info",
        method: "POST",
        body: data,
      }),
    }),

    addbusinessDocument: builder.mutation({
      query: (data) => ({
        url: "/bussiness/add-bussiness-document",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddBussinessInfoMutation, useAddbusinessDocumentMutation } =
  addBussinessInfoApis;
