import { ILocation, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const LOCATION_URL = "/location";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addLocation: build.mutation({
      query: (data) => ({
        url: `${LOCATION_URL}/create-location`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.location],
    }),
    locations: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${LOCATION_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ILocation, meta: IMeta) => {
        return {
          locations: response,
          meta: meta,
        };
      },
      providesTags: [tagTypes.location],
    }),

    location: build.query({
      query: (id) => ({
        url: `${LOCATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.location],
    }),

    updateLocation: build.mutation({
      query: (data) => ({
        url: `${LOCATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.location],
    }),

    deleteLocation: build.mutation({
      query: (id) => ({
        url: `${LOCATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.location],
    }),
  }),
});

export const {
  useLocationsQuery,
  useAddLocationMutation,
  useLocationQuery,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
