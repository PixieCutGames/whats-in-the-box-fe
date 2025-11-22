import { useLocalStorage } from "@uidotdev/usehooks";

function usePreference<T>(
  page: string,
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useLocalStorage(`${page}-${key}`, defaultValue);
  return [value, setValue];
}

export default usePreference;
