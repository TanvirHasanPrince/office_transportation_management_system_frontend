import { IAdmin, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROFILE_URL = "/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => ({
        url: `${PROFILE_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
  }),
});

export const {
useProfileQuery
} = profileApi;
