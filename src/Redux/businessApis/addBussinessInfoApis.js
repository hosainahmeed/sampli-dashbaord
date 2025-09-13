import { baseApis } from "../main/baseApis";

const addBussinessInfoApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    addBussinessInfo: builder.mutation({
      query: (data) => ({
        url: "/bussiness/add-bussiness-info",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),

    addbusinessDocument: builder.mutation({
      query: (data) => ({
        url: "/bussiness/add-bussiness-document",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const { useAddBussinessInfoMutation, useAddbusinessDocumentMutation } =
  addBussinessInfoApis;
