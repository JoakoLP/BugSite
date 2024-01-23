"use client";
import React, { useEffect, useState } from "react";
import { AlertDialog, Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import axios from "axios";
import { GoPencil, GoTrash } from "react-icons/go";
import { dbFunctions } from "../utils/dbFunctions";
import DeleteDialog from "./deleteDialog";

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
    // getIssues();
    dbFunctions.getIssues(setIssues);
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
                    <DeleteDialog id={issue?.id} />
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
