"use client";

import { Table } from "@radix-ui/themes";

export default function DatasetTable({ measureArray }) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Attribute name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Attribute type</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Select</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {measureArray?.map((row, index) => {
          return (
            <Table.Row key={index}>
              <Table.RowHeaderCell>{row?.name}</Table.RowHeaderCell>
              <Table.Cell>{row?.type}</Table.Cell>
              <Table.Cell>Developer</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
}
