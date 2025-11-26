import { useLocalStorage } from "@uidotdev/usehooks";

function useRecentSearches() {
  const [recentSearches, setValue] = useLocalStorage<string[]>(
    `recent-search`,
    []
  );

  const addRecentSearch = (query: string) => {
    setValue((prevSearches: string[]) => {
      const updatedSearches = prevSearches.filter((search) => search !== query);
      updatedSearches.unshift(query);
      return updatedSearches.slice(0, 6); // Keep only the latest 10 searches
    });
  };
  return {
    recentSearches,
    addRecentSearch,
  };
}

export default useRecentSearches;
