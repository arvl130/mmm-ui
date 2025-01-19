import { z } from "zod"
import { fetchResponseToValidSchema } from "@/mappers/fetch-response"
import { CsrfTokenSchema } from "@/types/csrf-token"
import { UserSchema } from "@/types/user"

export async function getCsrfToken() {
  const response = await fetch("/api/v1/csrf")

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: CsrfTokenSchema,
    }),
  })
}

export async function signIn(input: { username: string; password: string }) {
  const { result: csrfToken } = await getCsrfToken()

  const response = await fetch("/api/v1/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      [csrfToken.headerName]: csrfToken.token,
    },
    body: JSON.stringify(input),
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: UserSchema,
    }),
  })
}

export async function signOut() {
  const { result: csrfToken } = await getCsrfToken()

  const response = await fetch("/api/v1/auth/signout", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      [csrfToken.headerName]: csrfToken.token,
    },
    credentials: "include",
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
    }),
  })
}

export async function getCurrentUser() {
  const response = await fetch("/api/v1/auth/user")

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
      result: UserSchema.nullable(),
    }),
  })
}

export async function updateCurrentUserEmail(input: { newEmail: string }) {
  const { result: csrfToken } = await getCsrfToken()

  const response = await fetch("/api/v1/auth/user/email", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      [csrfToken.headerName]: csrfToken.token,
    },
    body: JSON.stringify(input),
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
    }),
  })
}

export async function updateCurrentUserPassword(input: {
  oldPassword: string
  newPassword: string
}) {
  const { result: csrfToken } = await getCsrfToken()

  const response = await fetch("/api/v1/auth/user/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      [csrfToken.headerName]: csrfToken.token,
    },
    body: JSON.stringify(input),
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
    }),
  })
}

export async function storeCurrentUserAvatar() {
  const { result: csrfToken } = await getCsrfToken()

  const response = await fetch("/api/v1/auth/user/avatar", {
    method: "POST",
    headers: {
      [csrfToken.headerName]: csrfToken.token,
    },
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
    }),
  })
}

export async function destroyCurrentUserAvatar() {
  const { result: csrfToken } = await getCsrfToken()

  const response = await fetch("/api/v1/auth/user/avatar", {
    method: "DELETE",
    headers: {
      [csrfToken.headerName]: csrfToken.token,
    },
  })

  return await fetchResponseToValidSchema({
    response,
    expectedSchema: z.object({
      message: z.string().min(1),
    }),
  })
}
