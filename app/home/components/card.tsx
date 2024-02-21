"use client";
import { Card, Image, Text, Badge, Button, Group, Paper } from "@mantine/core";

const getImageUrl = (i: string): string => `card-img/${i}.png`

interface CardExchangeInfoProps {
  code_source: string
  code_destination: string
  acronym: string
  max: number;
  min: number;
  avg: number;
}

export default function CardExchangeInfo(input: CardExchangeInfoProps) {
  return (
    <Paper p="md" style={{ maxWidth: 400, margin: "auto" }}>
      <Card padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={getImageUrl(input.acronym)}
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group  justify="space-between" mt="md" mb="xs" >
          <Text ta="start" fw={500}>{`${input.code_source} => ${input.code_destination}`}</Text>
          {/* <Badge color="green">Favorite</Badge> */}
        </Group>

        {/* Table-like section */}
        <div  style={{ marginTop: "20px" , textAlign:'center' }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ color: "orange" }}>Min: {input.min.toFixed(3)}</span>
            <span style={{ color: "blue" }}>Avg: {input.avg.toFixed(3)}</span>
            <span style={{ color: "green" }}>Max: {input.max.toFixed(3)}</span>
          </div>
        </div>
      </Card>
    </Paper>
  );
}
