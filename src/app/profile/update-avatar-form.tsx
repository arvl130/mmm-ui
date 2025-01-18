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

export function UpdateAvatarForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Avatar</CardTitle>
        <CardDescription>Here you can update your avatar.</CardDescription>
      </CardHeader>
      <form>
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
