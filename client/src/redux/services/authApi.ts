import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addAuthHeader } from "../../utils/addAuthHeader";
import { roles } from "../../interface/role";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
interface LoginResponse {
  token: string;
  role: roles;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
  name: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/auth",
    prepareHeaders: addAuthHeader,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: { response: LoginResponse }) =>
        response.response,
    }),
    profile: builder.query<User, void>({
      query: () => "/user/profile",
      transformResponse: (response: { response: User }) => response.response,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery } =
  authApi;
