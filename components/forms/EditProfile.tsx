import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/lib/actions/user.actions";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

export function EditProfile({
  authUserId,
  bio,
  name,
  username,
  imgUrl,
}: Props) {
  const [newBio, setNewBio] = useState<string>(bio);

  const onSubmit = async () => {
    await updateUser({
      name: name,
      path: "/",
      username: username,
      userId: authUserId,
      bio: newBio,
      image: imgUrl,
    });
  };
  return (
    <div className="mt-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  defaultValue={bio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className="col-span-3 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
