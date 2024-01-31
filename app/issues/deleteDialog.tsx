import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { GoTrash } from "react-icons/go";
import { dbFunctions } from "../utils/dbFunctions";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
};

const DeleteDialog = (props: Props) => {
  const router = useRouter();

  const onConfirm = () => {
    dbFunctions.deleteIssue(props?.id).then(() => {
      window.location.reload();
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="surface" color="red">
          <GoTrash />
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
        <AlertDialog.Description>This issue 'id: {props?.id}' is going to be deleted.</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={onConfirm}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteDialog;
