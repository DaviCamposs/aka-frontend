"use client";

import { useContext, useEffect, useState } from "react";
import { ExchangeContext } from "../providers/exchangeContext";
import {
  IExchangeSummaryItem,
} from "../providers/types/exchangeSummary";
import ExchangeCardList from "./components/exchange-card-list";

export default function HomePage() {
  const { fetchSummary } = useContext(ExchangeContext);
  const [exchangeSummary, setExchangeSummary] = useState<
    IExchangeSummaryItem[]
  >([]);

  useEffect(() => {
    fetchSummaryHandler();
  }, []);

  async function fetchSummaryHandler() {
    try {
      const results = await fetchSummary();

      if (results !== undefined) setExchangeSummary(results.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ExchangeCardList data={exchangeSummary} />
    </>
  );
}
