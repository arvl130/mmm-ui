import { signOut } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { handleErrorWithToast } from "@/lib/error-handling"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function LogoutButton() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const signOutMutation = useMutation({
    mutationFn: async () => {
      return await signOut()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], null)
      router.push("/signin")

      toast.info(data.message, {
        description: "See ya later! 🐊",
      })
    },
    onError: (e) => {
      handleErrorWithToast(e)
    },
  })

  return (
    <Button
      type="button"
      variant="ghost"
      className="w-full justify-normal px-2"
      disabled={signOutMutation.isPending}
      onClick={() => signOutMutation.mutate()}
    >
      {signOutMutation.isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <LogOut />
      )}
      Logout
    </Button>
  )
}
