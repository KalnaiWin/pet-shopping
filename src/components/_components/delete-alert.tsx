"use client";

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

// interface DeleteFormProps {
//   nameId: string;
//   name: string;
//   // action: (formData: FormData) => Promise<any> | Promise<void>;
//   action: (formData: FormData) => void | Promise<void>;
// }

interface DeleteFormProps<T = unknown> {
  nameId: string;
  name: string;
  action: (formData: FormData) => Promise<T> | void | Promise<void>;
}

export default function DeleteForm({ nameId, name, action }: DeleteFormProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full text-sm text-left pl-2 hover:bg-black/5 py-1 rounded-sm">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {name} and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                await action(fd);
              }}
            >
              <Input type="hidden" name={name} value={nameId} />
              <SubmitButton text="Continue" />
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
