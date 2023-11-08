"use client";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { deleteThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function OptionsThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="/assets/three-dots.svg"
              alt="heart"
              width={15}
              height={15}
              className="cursor-pointer object-contain decoration-white"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-3 no-focus border-dark-4">
            <DropdownMenuItem className="text-light-2 focus:text-light-2 focus:bg-dark-4">
              Report
            </DropdownMenuItem>
            {currentUserId !== authorId || pathname === "/" ? null : (
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="focus:bg-red-200 focus:text-red-600 text-red-500">
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* TO DO: Alert dialog refactor  */}
        <AlertDialogContent className="bg-dark-3">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-light-2">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              post and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-dark-4 hover:bg-dark-3 text-light-2 hover:text-light-3 border-0">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
                  onClick={async () => {
                    await deleteThread(JSON.parse(threadId), pathname);
                    if (!parentId || !isComment) {
                      router.push("/");
                    }
                  }}
            className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default OptionsThread;
