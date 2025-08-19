"use client";

import { DeleteBannerAction } from "@/actions/product/action";
import SubmitButton from "@/components/_components/submit-button";
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
import { Input } from "@/components/ui/input";

export default function DeleteBanner({ bannerId }: { bannerId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full text-sm text-left pl-2 hover:bg-black/5 py-1 rounded-sm">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form action={DeleteBannerAction}>
              <Input type="hidden" name="bannerId" value={bannerId} />
              <SubmitButton text="Continue" /> 
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
