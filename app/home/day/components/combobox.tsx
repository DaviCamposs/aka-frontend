import { Combobox, InputBase, useCombobox } from "@mantine/core";

interface Props {
  value: string;
  changeValue: (value: string) => void;
}

const optionsExchange = [
  "BRL-USD",
  "USD-BRL",
  "EUR-BRL",
  "BRL-EUR",
  "BRL-ARS",
  "ARS-BRL",
  "JPY-BRL",
  "BRL-JPY",
];

export function ComboboxExchange({ value, changeValue }: Props) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = optionsExchange.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        changeValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
