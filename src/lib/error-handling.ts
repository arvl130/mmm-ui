import { HttpError } from "@/errors/http"
import { toast } from "sonner"
import { ZodError } from "zod"

export function handleErrorWithToast(e: unknown) {
  if (e instanceof HttpError) {
    toast.error("Request error occured", {
      description: e.message,
    })
  } else if (e instanceof ZodError) {
    toast.error("Validation error occured", {
      description: e.message,
    })
  } else if (e instanceof Error) {
    toast.error("Generic error occured", {
      description: e.message,
    })
  } else {
    toast.error("Unknown error occured", {
      description: "Check the logs for details.",
    })
    console.log("Unknown error occured:", e)
  }
}
