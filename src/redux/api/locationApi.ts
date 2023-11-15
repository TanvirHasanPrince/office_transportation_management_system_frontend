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
  }),
});

export const { useAddLocationMutation } = locationApi;
