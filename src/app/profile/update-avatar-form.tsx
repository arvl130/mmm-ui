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
import { toast } from "sonner"

export function UpdateAvatarForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Avatar</CardTitle>
        <CardDescription>Here you can update your avatar.</CardDescription>
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
            <Label>Avatar</Label>
            <Input type="file" disabled />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
