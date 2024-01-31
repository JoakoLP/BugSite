import { Button, Dialog, Flex, Text, TextField, Tooltip } from "@radix-ui/themes";
import React from "react";
import { GoPencil } from "react-icons/go";
import { dbFunctions } from "../utils/dbFunctions";

type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: any;
  updatedAt: any;
};

const EditDialog = (issue: Issue) => {
  const submitIssue = () => {
    const newIssue = {
      ...issue,
      title: document.getElementById("newTitle")?.value,
      description: document.getElementById("newDescription")?.value,
    };
    dbFunctions.editIssue(newIssue).then(() => {
      window.location.reload();
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="surface">
          <GoPencil />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Edit Issue "{issue.id}"</Dialog.Title>

        <Flex className="space-x-2">
          <label>
            <Text>Title</Text>
            <TextField.Input id="newTitle" defaultValue={issue?.title} placeholder="Title of the issue" />
          </label>
          <label className="w-full">
            <Text>Description</Text>
            <TextField.Input id="newDescription" defaultValue={issue?.description} placeholder="Description  of the issue" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Tooltip content="Open this issue to edit." className={issue?.status == "OPEN" ? "hidden" : ""}>
              <Button variant="solid" color="blue" onClick={submitIssue} disabled={issue?.status == "CLOSED"}>
                Save
              </Button>
            </Tooltip>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditDialog;
