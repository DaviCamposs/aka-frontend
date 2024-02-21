"use client";

import React, { createContext } from "react";
import { IExchangeSummary } from "./types/exchangeSummary";
import axios from "axios";
import {
  IExchangeDailyRecord,
  IExchangeHistory,
  IExchangeHistoryTableRow,
} from "./types/exchangeHistory";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

type ExchangeProps = {
  fetchSummary: () => Promise<IExchangeSummary | undefined>;
  fetchHistory: (acronym: string, date: Date) => Promise<IExchangeHistoryTableRow[]>;
  fetchDaily: (acronym: string, date: Date) => Promise<IExchangeDailyRecord[]>;
};

export const ExchangeContext = createContext<ExchangeProps>({} as any);

export function ExchangeProvider({ children }: { children: React.ReactNode }) {
  const fetchSummary = async (): Promise<IExchangeSummary | undefined> => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const result = await axios.get(BASE_URL + "/exchange/history", {
      params: {
        month,
        year,
      },
      validateStatus: function (status) {
        return status === 200 || status === 401 || status === 400;
      },
    });

    if (result.status === 200) {
      const exchangeResults = result.data as IExchangeSummary[];

      return exchangeResults.find((item) => item.day === `${year}-${month}-${day}`);
    }

    return undefined;
  };

  const fetchHistory = async (
    acronym: string,
    date: Date
  ): Promise<IExchangeHistoryTableRow[]> => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const result = await axios.get(BASE_URL + "/exchange/history", {
      params: {
        day,
        month,
        year,
      },
      validateStatus: function (status) {
        return status === 200 || status === 401 || status === 400;
      },
    });

    if (result.status === 200) {
      const exchangeHistory = result.data as IExchangeHistory[];

      const exchangeHistoryTableRows: IExchangeHistoryTableRow[] =
        exchangeHistory.flatMap((history) =>
          history.data
            .filter((item) => item.acronym === acronym)
            .map((item) => ({
              hour: history.hour,
              average: item.average,
              min: item.min,
              max: item.max,
            }))
        );

      return exchangeHistoryTableRows;
    }

    return [];
  };

  const fetchDaily = async (
    acronym: string,
    date: Date
  ): Promise<IExchangeDailyRecord[]> => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const result = await axios.get(BASE_URL + "/exchange/history", {
      params: {
        day,
        month,
        year,
      },
      validateStatus: function (status) {
        return status === 200 || status === 401 || status === 400;
      },
    });

    if (result.status === 200) {
      const exchangeHistory = result.data as IExchangeHistory[];

      console.log(exchangeHistory)

      const exchangeDailyRecords: IExchangeDailyRecord[] =
        exchangeHistory.flatMap((history) =>
          history.data
            .filter((item) => item.acronym === acronym)
            .map((item) => ({
              hour: history.hour,
              average: item.average,
              min: item.min,
              max: item.max,
            }))
        );

      return exchangeDailyRecords;
    }

    return [];
  };



  return (
    <ExchangeContext.Provider
      value={{
        fetchSummary,
        fetchHistory,
        fetchDaily
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
}
