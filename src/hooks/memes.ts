import { getMemes } from "@/api/meme"
import { useQuery } from "@tanstack/react-query"

export function useMemes({ q }: { q?: string | undefined }) {
  return useQuery({
    queryKey: [
      "memes",
      {
        q,
      },
    ],
    queryFn: async () => {
      const { result } = await getMemes({ q })

      return result
    },
  })
}
