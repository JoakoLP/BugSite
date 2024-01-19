"use client";
import React, { useEffect, useState } from "react";
import { AlertDialog, Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { GoPencil, GoTrash } from "react-icons/go";

const IssuesPage = () => {
  const [issues, setIssues] = useState([]);

  const getIssues = async () => {
    await axios.get("/api/issues").then((res) => {
      // console.log(res);
      console.log(res.data);
      setIssues(res.data);
      // return res.data;
    });
  };

  useEffect(() => {
    getIssues();
  }, []);

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
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Updated At</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue: any) => {
              return (
                <Table.Row>
                  <Table.RowHeaderCell>{issue?.id}</Table.RowHeaderCell>
                  <Table.Cell>{issue?.title}</Table.Cell>
                  <Table.Cell>{issue?.description}</Table.Cell>
                  <Table.Cell>{issue?.status}</Table.Cell>
                  <Table.Cell>{issue?.createdAt}</Table.Cell>
                  <Table.Cell>{issue?.updatedAt}</Table.Cell>
                  <Table.Cell>
                    <Button variant="surface">
                      <GoPencil />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button variant="surface" color="red">
                          <GoTrash />
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                        <AlertDialog.Description>This issue is going to be deleted.</AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button variant="solid" color="red">
                              Delete Issue
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      ) : null}
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
