import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "@/types/user"
import { toast } from "sonner"

export function UpdateEmailForm({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Email</CardTitle>
        <CardDescription>Here you can update your email.</CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.warning("Not Yet Implemented", {
            description: "This feature is not yet implemented.",
          })
        }}
      >
        <CardContent>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="text" value={user.email} disabled />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
