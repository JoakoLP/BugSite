"use client";
import { Badge, Card, Flex, Heading, Separator } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { dbFunctions } from "./utils/dbFunctions";

type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: any;
  updatedAt: any;
};

const Home = () => {
  const [issues, setIssues] = useState([]);

  const [stats, setStats] = useState({ total: 0, open: 0, closed: 0 });

  useEffect(() => {
    dbFunctions.getIssues(setIssues);
  }, []);

  useEffect(() => {
    countIssues();
  }, [issues]);

  const countIssues = () => {
    let count = { total: 0, open: 0, closed: 0 };
    issues.forEach((issue: Issue) => {
      switch (issue.status) {
        case "OPEN":
          count = { total: count.total + 1, open: count.open + 1, closed: count.closed };
          break;
        case "CLOSED":
          count = { total: count.total + 1, open: count.open, closed: count.closed + 1 };
          break;
        default:
          count = { total: count.total + 1, open: count.open, closed: count.closed };
          break;
      }
    });
    setStats(count);
  };

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <Card className="max-w-lg p-2 pt-0.5 w-max">
        <Heading className="text-center pb-1">Issues Stats</Heading>
        <Flex gap="1" align="center" justify="center">
          <Badge color="violet" variant="surface" size="2">
            Total: {stats.total}
          </Badge>
          <Separator orientation="vertical" />
          <Badge color="blue" variant="surface" size="2">
            Open issues: {stats.open}
          </Badge>
          <Separator orientation="vertical" />
          <Badge color="green" variant="surface" size="2">
            Closed issues: {stats.closed}
          </Badge>
        </Flex>
      </Card>
    </div>
  );
};

export default Home;
