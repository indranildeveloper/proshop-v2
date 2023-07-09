import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});

export default apiSlice;
