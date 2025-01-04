import { getMemes } from "@/api/meme"
import { useQuery } from "@tanstack/react-query"

export function useMemes() {
  return useQuery({
    queryKey: ["memes"],
    queryFn: async () => {
      const { result } = await getMemes()

      return result
    },
  })
}
