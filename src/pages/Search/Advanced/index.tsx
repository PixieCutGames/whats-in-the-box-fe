import { useNavigate, useSearchParams } from "react-router-dom";
import useSearch from "./useSearch";
import SearchForm from "./SearchForm";
import { ChevronDownIcon } from "lucide-react";
import { Menu } from "@headlessui/react";
import ContainerListView from "../../Containers/ListView";
import ContainerGridView from "../../Containers/GridView";
import ItemsListView from "../../Items/ListView";
import ItemsGridView from "../../Items/GridView";
import usePreference from "../../../shared/hooks/usePreference";
import EmptyState from "../../../shared/components/Layout/Search/EmptyState";
import SearchSkeleton from "./SearchSkeleton";
import ErrorState from "../../../shared/components/Layout/Search/ErrorState";
import UIState from "../../../shared/components/Layout/UIState";
import { useEffect } from "react";
import useRecentSearches from "../../../shared/hooks/useRecentSearches";
import ViewToggleButtons from "../../../shared/components/Layout/ViewToggleButtons";
import MenuButton from "../../../shared/components/ui/Menu/MenuButton";
import MenuItems from "../../../shared/components/ui/Menu/MenuItems";
import MenuItemButton from "../../../shared/components/ui/Menu/MenuItemButton";

function AdvancedSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addRecentSearch } = useRecentSearches();
  const query = searchParams.get("query");
  const sort = searchParams.get("sort_by");
  const type = searchParams.get("type");
  const { data, isLoading, error, refetch } = useSearch(
    `query=${query}&sortBy=updatedAt&sortDir=${sort ?? "desc"}&type=${
      type ?? "all"
    }`
  );

  const [viewMode, setViewMode] = usePreference<"grid" | "list">(
    "AdvancedSearch",
    "view",
    "grid"
  );

  useEffect(() => {
    if (query) addRecentSearch(query);
  }, [query]);

  const handleSearchSubmit = (newQuery: string) => {
    navigate(`/search?query=${encodeURIComponent(newQuery)}`);
  };

  const handleSortChange = (newSort: "asc" | "desc") => {
    navigate(
      `/search?query=${encodeURIComponent(
        query ?? ""
      )}&sort_by=${newSort}&type=${type ?? "all"}`
    );
  };

  const handleTypeChange = (newType: "all" | "container" | "item") => {
    navigate(
      `/search?query=${encodeURIComponent(query ?? "")}&sort_by=${
        sort ?? "desc"
      }&type=${newType}`
    );
  };

  const getTypeTitle = () => {
    if (type === "container") return "Boxes";
    if (type === "item") return "Items";
    return "Type";
  };

  return (
    <div>
      <SearchForm query={query ?? ""} onSubmit={handleSearchSubmit} />
      {/* Header with View Controls */}
      <div className="flex items-center justify-between max-md:items-end gap-4 mb-6 mt-2">
        <div className="flex items-center gap-2">
          <Menu>
            <MenuButton>
              {getTypeTitle()}
              <ChevronDownIcon className="size-4 opacity-50" />
            </MenuButton>
            <MenuItems>
              <MenuItemButton
                onClick={() => handleTypeChange("all")}
                selected={!type || type === "all"}
              >
                All
              </MenuItemButton>
              <MenuItemButton
                onClick={() => handleTypeChange("container")}
                selected={type === "container"}
              >
                Boxes
              </MenuItemButton>
              <MenuItemButton
                onClick={() => handleTypeChange("item")}
                selected={type === "item"}
              >
                Items
              </MenuItemButton>
            </MenuItems>
          </Menu>
        </div>
        <div className="flex items-center gap-2 max-md:items-end max-md:flex-col-reverse">
          <div className="flex items-center gap-1">
            <p className="text-text-secondary dark:text-text-dark-secondary text-sm">
              Sort by:
            </p>
            <Menu>
              <MenuButton>
                {sort === "asc" ? "Oldest" : "Newest"}
                <ChevronDownIcon className="size-4 opacity-50" />
              </MenuButton>
              <MenuItems>
                <MenuItemButton
                  onClick={() => handleSortChange("desc")}
                  selected={sort === "desc"}
                >
                  Newest
                </MenuItemButton>
                <MenuItemButton
                  onClick={() => handleSortChange("asc")}
                  selected={sort === "asc"}
                >
                  Oldest
                </MenuItemButton>
              </MenuItems>
            </Menu>
          </div>
          {/* View Toggle Buttons */}
          <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      <div className="space-y-4">
        <UIState
          loading={isLoading}
          error={!!error}
          empty={data && !data.containers.length && !data.items.length}
        >
          <div data-loading>
            <SearchSkeleton type={type} viewMode={viewMode} />
          </div>
          <div data-error>
            <ErrorState refetch={refetch} />
          </div>
          <div data-empty>
            <EmptyState />
          </div>
          <div data-data className="space-y-4">
            {!!data && (
              <>
                {/* Boxes */}
                {data.containers.length > 0 && (
                  <div>
                    {type !== "container" && (
                      <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
                        Boxes
                      </h3>
                    )}
                    <div className="space-y-1">
                      {viewMode === "list" && (
                        <ContainerListView containers={data.containers} />
                      )}
                      {viewMode === "grid" && (
                        <ContainerGridView containers={data.containers} />
                      )}
                    </div>
                  </div>
                )}
                {/* Items */}
                {data.items.length > 0 && (
                  <div>
                    {type !== "item" && (
                      <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
                        Items
                      </h3>
                    )}
                    <div className="space-y-1">
                      {viewMode === "list" && (
                        <ItemsListView items={data.items} />
                      )}
                      {viewMode === "grid" && (
                        <ItemsGridView items={data.items} />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </UIState>
      </div>
    </div>
  );
}

export default AdvancedSearch;
