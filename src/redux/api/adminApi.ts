import { IAdmin, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADMIN_URL = "/admin";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/create-admin`,
        method: "POST",
        data: data,
      }),
   
      invalidatesTags: [tagTypes.admin],
    }),
    admins: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${ADMIN_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IAdmin, meta: IMeta) => {
        return {
          admins: response,
          meta: meta,
        };
      },
      providesTags: [tagTypes.admin],
    }),
  }),
});

export const { useAddAdminMutation, useAdminsQuery } = adminApi;
