import {  IEmployee, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EMPLOYEE_URL = "/employee";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addEmployee: build.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/create-employee`,
        method: "POST",
        data: data,
      }),

      invalidatesTags: [tagTypes.employee],
    }),
    employees: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${EMPLOYEE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IEmployee, meta: IMeta) => {
        return {
          employees: response,
          meta: meta,
        };
      },
      providesTags: [tagTypes.employee],
    }),
    employee: build.query({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.employee],
    }),
    updateEmployee: build.mutation({
      query: (data) => ({
        url: `${EMPLOYEE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.employee],
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `${EMPLOYEE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.employee],
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useEmployeesQuery,
  useEmployeeQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
