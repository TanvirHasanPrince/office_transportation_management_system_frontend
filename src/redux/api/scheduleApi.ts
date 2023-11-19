import { IMeta, ISchedule } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SCHEDULE_URL = "/schedule";

export const scheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addSchedule: build.mutation({
      query: (data) => ({
        url: `${SCHEDULE_URL}/create-schedule`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.schedule],
    }),
    schedules: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${SCHEDULE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ISchedule, meta: IMeta) => {
        return {
          schedules: response,
          meta: meta,
        };
      },
      providesTags: [tagTypes.schedule],
    }),
    schedule: build.query({
      query: (id) => ({
        url: `${SCHEDULE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.schedule],
    }),
    updateSchedule: build.mutation({
      query: (data) => ({
        url: `${SCHEDULE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `${SCHEDULE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
 useAddScheduleMutation,
 useSchedulesQuery,
 useScheduleQuery,
 useUpdateScheduleMutation,
 useDeleteScheduleMutation
} = scheduleApi;
