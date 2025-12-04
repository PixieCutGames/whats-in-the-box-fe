import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FieldHookConfig, useField } from "formik";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import {
  ClassAttributes,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";

type Option<T> = { label: string; value: T };
type AutoCompleteProps<T> = {
  options: Option<T>[];
};
function AutoComplete<T>({
  options,
  disabled,
  ...props
}: InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string> &
  AutoCompleteProps<T>) {
  const [_, { error, touched, value }, { setValue, setTouched }] = useField(
    props.name
  );
  const [selectedPerson, setSelectedPerson] = useState<Option<T> | null>(null);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const setCurrentValue = () => {
    const currentValue = options.find((opt) => opt.value === value);

    if (currentValue) {
      setSelectedPerson(currentValue);
      setQuery(currentValue.label);
    } else {
      setSelectedPerson(null);
      setQuery("");
    }
  };

  useEffect(() => {
    setCurrentValue();
  }, [value, options]);

  return (
    <Combobox
      value={selectedPerson}
      onChange={(value) => {
        setTouched(true);
        setValue(value ? value.value : undefined, true);
        setSelectedPerson(value);
      }}
      onClose={setCurrentValue}
    >
      <div className="relative">
        <ComboboxInput
          disabled={disabled}
          displayValue={(option: Option<T>) => (option ? option.label : "")}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          className={`placeholder:text-muted-foreground dark:placeholder:text-muted-dark-foreground selection:bg-primary dark:selection:bg-primary-dark selection:text-primary-foreground dark:selection:text-primary-dark-foreground dark:bg-input/5 flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-text-primary dark:text-text-dark-primary text-base bg-input-background transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:opacity-50 md:text-sm focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50 focus-visible:ring-[3px]
           ${
             error && touched
               ? "border-destructive dark:border-destructive-dark focus-visible:border-destructive dark:focus-visible:border-destructive-dark focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive-dark/20"
               : "border-border dark:border-border-dark focus-visible:border-ring dark:focus-visible:border-ring-dark focus-visible:ring-ring/50 dark:focus-visible:ring-ring-dark/50"
           } `}
        />
        {!disabled && (
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="size-4 text-text-secondary dark:text-text-dark-secondary" />
          </ComboboxButton>
        )}
      </div>
      <ComboboxOptions
        anchor="bottom"
        className="mt-2 w-(--input-width) bg-popover dark:bg-popover-dark text-popover-foreground dark:text-popover-dark-foreground border border-border dark:border-border-dark rounded-md p-1 shadow-md focus:outline-none empty:invisible"
      >
        {filteredOptions.map((option) => (
          <ComboboxOption
            key={option.label}
            value={option}
            className="group flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-start outline-hidden focus:bg-accent dark:focus:bg-accent/10 focus:text-accent-foreground dark:focus:text-accent-dark-foreground text-text-primary dark:text-text-dark-primary hover:bg-background-accent dark:hover:bg-background-accent/10 hover:text-text-primary dark:hover:text-text-dark-primary transition-colors"
          >
            <CheckIcon className="invisible size-4 group-data-selected:visible" />
            <span>{option.label}</span>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}

export default AutoComplete;
