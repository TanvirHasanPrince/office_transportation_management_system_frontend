import { IDriver,  IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const DRIVER_URL = "/driver";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addDriver: build.mutation({
      query: (data) => ({
        url: `${DRIVER_URL}/create-driver`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.driver],
    }),
    drivers: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${DRIVER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDriver, meta: IMeta) => {
        return {
          drivers: response,
          meta: meta,
        };
      },
      providesTags: [tagTypes.driver],
    }),
    driver: build.query({
      query: (id) => ({
        url: `${DRIVER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.driver],
    }),
    updateDriver: build.mutation({
      query: (data) => ({
        url: `${DRIVER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.driver],
    }),
    deleteDriver: build.mutation({
      query: (id) => ({
        url: `${DRIVER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.driver],
    }),
  }),
});

export const {
 useAddDriverMutation,
 useDriversQuery,
 useDriverQuery,
 useUpdateDriverMutation,
 useDeleteDriverMutation
} = driverApi;
