import { getCurrentUser } from "@/api/auth"
import { useQuery } from "@tanstack/react-query"

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { result } = await getCurrentUser()

      return result
    },
  })
}
