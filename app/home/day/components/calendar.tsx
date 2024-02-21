import dayjs from 'dayjs';
import { DateInput } from '@mantine/dates';

interface Props {
    date: Date
    setDate: (value: any) => void
}

export default function CalendarExchange(props: Props) {
  return (
    <DateInput
      value={props.date}
      onChange={props.setDate}
      maxDate={dayjs(new Date()).toDate()}
    />
  );
}