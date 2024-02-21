import { IExchangeSummaryItem } from "@/app/providers/types/exchangeSummary";
import { Grid } from "@mantine/core";
import ExchangeCard from "./exchange-card";

interface Props {
    data: IExchangeSummaryItem[]
}

export default function ExchangeCardList(props: Props) {
    return (
        <Grid>
        {props.data.map((summary, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 4 }}>
            <ExchangeCard
              code_destination={summary.code_destination}
              acronym={summary.acronym}
              code_source={summary.code_source}
              max={summary.max}
              min={summary.min}
              avg={summary.average}
            />
          </Grid.Col>
        ))}
      </Grid>
    )
}