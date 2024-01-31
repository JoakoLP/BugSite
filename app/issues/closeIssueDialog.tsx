import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { GoLock, GoUnlock } from "react-icons/go";
import { dbFunctions } from "../utils/dbFunctions";

type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: any;
  updatedAt: any;
};

const CloseIssueDialog = (issue: Issue) => {
  const switchIssue = () => {
    const closed = {
      ...issue,
      status: issue?.status == "OPEN" ? "CLOSED" : "OPEN",
    };
    console.log(closed);
    dbFunctions.editIssue(closed).then(() => {
      window.location.reload();
    });
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Flex className="pl-4">
          <Button color={issue?.status == "OPEN" ? "blue" : "green"} variant="surface">
            {issue?.status == "OPEN" ? <GoUnlock /> : <GoLock />}
          </Button>
        </Flex>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>{issue?.status == "OPEN" ? "Close" : "Open"} Issue</AlertDialog.Title>
        <AlertDialog.Description>
          This issue '{issue?.id}' is going to be {issue?.status == "OPEN" ? "closed" : "opened"}.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color={issue?.status == "OPEN" ? "green" : "blue"} onClick={switchIssue}>
              {issue?.status == "OPEN" ? "Close" : "Open"} Issue {issue?.id}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default CloseIssueDialog;
