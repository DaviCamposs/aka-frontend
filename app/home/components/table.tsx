import { IExchangeHistoryTableDTO } from "@/app/providers/types/exchangeHistory";
import { Table } from "@mantine/core";

export function TableExchange(elements: IExchangeHistoryTableDTO) {
  const rows = elements.data.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{`${element.hour.split("-")[3]}:00`}</Table.Td>
      <Table.Td>{element.min.toFixed(4)}</Table.Td>
      <Table.Td>{element.average.toFixed(4)}</Table.Td>
      <Table.Td>{element.max.toFixed(4)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <h1>{elements.title}</h1>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Hour</Table.Th>
            <Table.Th>Min</Table.Th>
            <Table.Th>Avg</Table.Th>
            <Table.Th>Max</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
