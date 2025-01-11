import { getMemes } from "@/api/meme"
import { useQuery } from "@tanstack/react-query"

export function useMemes({
  q,
  mode,
}: {
  q?: string | undefined
  mode?: "SIMPLE" | "FULL_TEXT" | "SEMANTIC" | undefined
}) {
  return useQuery({
    queryKey: [
      "memes",
      {
        q,
        mode,
      },
    ],
    queryFn: async () => {
      const { result } = await getMemes({ q, mode })

      return result
    },
  })
}
