import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

type TSearchMode = "SIMPLE" | "FULL_TEXT" | "SEMANTIC"

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "")
  const [searchMode, setSearchMode] = useState<TSearchMode>(
    (searchParams.get("mode") as TSearchMode) ?? "SIMPLE",
  )

  const createQueryString = useCallback(
    ({ keyPairs }: { keyPairs: { name: string; value: string }[] }) => {
      const params = new URLSearchParams(searchParams.toString())

      for (const keyPair of keyPairs) {
        params.set(keyPair.name, keyPair.value)
      }

      return params.toString()
    },
    [searchParams],
  )

  return (
    <form
      className="grid grid-cols-[auto_1fr_auto] gap-2 mt-3"
      onSubmit={(e) => {
        e.preventDefault()
        router.push(
          pathname +
            "?" +
            createQueryString({
              keyPairs: [
                {
                  name: "q",
                  value: searchTerm,
                },
                {
                  name: "mode",
                  value: searchMode,
                },
              ],
            }),
        )
      }}
    >
      <Tabs
        value={searchMode}
        onValueChange={(value) => {
          setSearchMode(value as TSearchMode)
        }}
      >
        <TabsList>
          <TabsTrigger value="SIMPLE">Simple</TabsTrigger>
          <TabsTrigger value="SEMANTIC">AI</TabsTrigger>
          <TabsTrigger value="FULL_TEXT">Full Text</TabsTrigger>
        </TabsList>
      </Tabs>

      <Input
        type="search"
        placeholder="Enter a tag ..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.currentTarget.value)
        }}
      />

      <Button type="submit">Search</Button>
    </form>
  )
}
