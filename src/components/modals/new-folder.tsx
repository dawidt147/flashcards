"use client";

import Form from "next/form";
import { Folder } from "lucide-react";
import Button from "@/components/buttons/button";
import { useActionState, startTransition } from "react";
import { createFolder } from "@/lib/actions/taxonomies";
import { CircleAlert } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";

type ModalNewFolderProps = {
  onClose: () => void;
};

const ModalNewFolder = ({ onClose }: ModalNewFolderProps) => {
  const [state, formAction, isPending] = useActionState(
    createFolder,
    undefined,
  );
  let message: React.ReactNode = null;

  if (state?.error) {
    message = (
      <>
        <CircleAlert className="h-5 w-5 text-red-500" />
        <p className="text-sm text-red-500">{state.error}</p>
      </>
    );
  }

  if (state?.success) {
    onClose();
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.set("description", "");

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <div className="modal fixed top-0 left-0 w-screen h-screen">
      <div
        className="modal-overlay w-screen h-screen flex justify-center items-center bg-black/25"
        onClick={onClose}
      >
        <div
          className="modal-content w-full max-w-125 bg-gray-400 p-5 rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center p-5">
            <Folder className="inline w-20 h-20" />
          </div>
          <Form action={formAction} onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Name your folder"
              className="mb-4"
            />
            <div className="flex justify-end gap-4">
              <Button
                onClick={onClose}
                type="button"
                id="create-new-folder-modal-close"
                className="border border-zinc-300 bg-transparent text-sm text-foreground hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                id="folder-create"
                className="border border-zinc-300 bg-transparent text-sm text-foreground hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
                disabled={isPending}
              >
                Create
              </Button>
              <div>{message}</div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModalNewFolder;
