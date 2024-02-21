"use client";

import { useRef, useEffect, useState, useContext } from "react";
import { Chart, registerables } from "chart.js/auto";
import { ComboboxExchange } from "../components/combobox";
import { Container, Grid } from "@mantine/core";
import CalendarExchange from "../components/calendar";
import { IExchangeDailyRecord } from "@/app/providers/types/exchangeHistory";
import { ExchangeContext } from "@/app/providers/exchangeContext";

Chart.register(...registerables);

export default function DailyPage() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [acronym, setAcronym] = useState<string>("BRL-USD");
  const [date, setDate] = useState<Date>(new Date());
  const [dailyData, setDailyData] = useState<IExchangeDailyRecord[]>([]);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const { fetchDaily } = useContext(ExchangeContext);

  useEffect(() => {
    fetchDailyHandler();
  }, [acronym, date]);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    if (dailyData.length > 0 && chartRef.current) {
      const context = chartRef.current.getContext("2d");
      if (context) {
        const newChart = new Chart(context, {
          type: "line",
          data: {
            labels: [
              "00:00",
              "01:00",
              "02:00",
              "03:00",
              "04:00",
              "05:00",
              "06:00",
              "07:00",
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
              "24:00",
            ],
            datasets: [
              {
                label: acronym,
                data: dailyData.map((record) => record.average),
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "category",
              },
            },
          },
        });
        setChartInstance(newChart);
      }
    }
  }, [dailyData, acronym, date]);

  async function fetchDailyHandler() {
    try {
      const results = await fetchDaily(acronym, date);
      if (results !== undefined) {
        setDailyData(results);
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
      <canvas ref={chartRef} />
    </Container>
  );
}
