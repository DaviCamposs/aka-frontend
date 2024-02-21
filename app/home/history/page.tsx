"use client";

import { Container, Flex, Grid } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { TableExchange } from "../components/table";
import { IExchangeHistoryTableRow } from "@/app/providers/types/exchangeHistory";
import { ExchangeContext } from "@/app/providers/exchangeContext";
import { ComboboxExchange } from "../components/combobox";
import CalendarExchange from "../components/calendar";


export default function HistoryPage() {
  const [exchangeHistory, setExchangeHistory] = useState<
    IExchangeHistoryTableRow[]
  >([]);
  const [acronym, setAcronym] = useState<string>("BRL-USD");
  const [ date , setDate ] = useState<Date>(new Date())

  const { fetchHistory } = useContext(ExchangeContext);

  useEffect(() => {
    fetchHistoryHandler();
  }, [acronym, date]);

  async function fetchHistoryHandler() {
    try {
      const results = await fetchHistory(acronym,date);

      if (results !== undefined) {
        setExchangeHistory(results);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Grid>
        <Grid.Col span={9}>
          <ComboboxExchange value={acronym} changeValue={setAcronym} />
        </Grid.Col>
        <Grid.Col span={3}>
          <CalendarExchange date={date} setDate={setDate} />
        </Grid.Col>
      </Grid>
      <TableExchange title={acronym} data={exchangeHistory} />
    </Container>
  );
}
