"use client";
import React, { useEffect, useState } from "react";
import { Badge, Button, Flex, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { dbFunctions } from "../utils/dbFunctions";
import DeleteDialog from "./deleteDialog";
import EditDialog from "./editDialog";
import CloseIssue from "./closeIssueDialog";
import Spinner from "../components/Spinner";
import moment from "moment";

type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: any;
  updatedAt: any;
};

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    dbFunctions.getIssues(setIssues);
  }, []);

  moment.locale("en");

  return (
    <div>
      {issues.length > 0 ? (
        <Table.Root variant="surface" className="mb-4">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Open/Close</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue: Issue) => {
              return (
                <Table.Row>
                  <>
                    <Table.RowHeaderCell>
                      <Text className="flex items-center h-full">{issue?.id}</Text>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      <Text className="flex items-center h-full">{issue?.title}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text className="flex items-center h-full">{issue?.description}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Flex className="items-center h-full">
                        <Badge color={issue?.status == "OPEN" ? "blue" : "green"}>{issue?.status}</Badge>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell>
                      <CloseIssue {...issue} />
                    </Table.Cell>
                    <Table.Cell>
                      <Text className="flex items-center h-full" title={moment(issue?.createdAt).format("LLLL UTCZ")}>
                        {moment(issue?.createdAt).format("L LT")}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text className="flex items-center h-full" title={moment(issue?.updatedAt).format("LLLL UTCZ")}>
                        {moment(issue?.updatedAt).format("L LT")}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <EditDialog {...issue} />
                    </Table.Cell>
                    <Table.Cell>
                      <DeleteDialog id={issue?.id} />
                    </Table.Cell>
                  </>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      ) : (
        <div className="w-full ml-4 mb-4">
          <Spinner />
        </div>
      )}
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
