"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

function ShareThread() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-transparent h-6 w-6" size="icon" type="submit">
            <Image
              src="/assets/share.svg"
              alt="share"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share this post</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                defaultValue="https://www.thrinks.com/"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Copy link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShareThread;
