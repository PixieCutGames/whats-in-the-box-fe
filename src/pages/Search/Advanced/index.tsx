import { useNavigate, useSearchParams } from "react-router-dom";
import useSearch from "./useSearch";
import SearchForm from "./SearchForm";
import { CheckIcon, ChevronDownIcon, Grid3x3, List } from "lucide-react";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ContainerListView from "../../Containers/ListView";
import ContainerGridView from "../../Containers/GridView";
import ItemsListView from "../../Items/ListView";
import ItemsGridView from "../../Items/GridView";

function AdvancedSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const sort = searchParams.get("sort_by");
  const type = searchParams.get("type");
  const { data, isLoading } = useSearch(
    `query=${query}&sortBy=updatedAt&sortDir=${sort ?? "desc"}&type=${
      type ?? "all"
    }`
  );

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
            <MenuButton className="w-24 lg:w-32 bg-background-surface border-border data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2">
              {getTypeTitle()}
              <ChevronDownIcon className="size-4 opacity-50" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="bg-popover text-popover-foreground relative z-50 mt-1 p-1 w-(--button-width) overflow-x-hidden overflow-y-auto rounded-md border border-border shadow-md"
            >
              <MenuItem>
                <button
                  onClick={() => handleTypeChange("all")}
                  className="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative w-full cursor-default rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2 data-focus:bg-blue-100"
                >
                  All
                  {!type ||
                    (type === "all" && <CheckIcon className="size-4" />)}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => handleTypeChange("container")}
                  className="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative w-full cursor-default rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2 data-focus:bg-blue-100"
                >
                  Boxes
                  {type === "container" && <CheckIcon className="size-4" />}
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => handleTypeChange("item")}
                  className="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative w-full cursor-default rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2 data-focus:bg-blue-100"
                >
                  Items
                  {type === "item" && <CheckIcon className="size-4" />}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div className="flex items-center gap-2 max-md:items-end max-md:flex-col-reverse">
          <div className="flex items-center gap-1">
            <p className="text-text-secondary text-sm">Sort by:</p>
            <Menu>
              <MenuButton className="w-24 lg:w-32 bg-background-surface border-border data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2">
                {sort === "asc" ? "Oldest" : "Newest"}
                <ChevronDownIcon className="size-4 opacity-50" />
              </MenuButton>
              <MenuItems
                anchor="bottom"
                className="bg-popover text-popover-foreground relative z-50 mt-1 p-1 w-(--button-width) overflow-x-hidden overflow-y-auto rounded-md border border-border shadow-md"
              >
                <MenuItem>
                  <button
                    onClick={() => handleSortChange("desc")}
                    className="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative w-full cursor-default rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2 data-focus:bg-blue-100"
                  >
                    Newest
                    {sort === "desc" && <CheckIcon className="size-4" />}
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => handleSortChange("asc")}
                    className="focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative w-full cursor-default rounded-sm py-1.5 px-2 text-sm outline-hidden select-none flex items-center justify-between gap-2 data-focus:bg-blue-100"
                  >
                    Oldest
                    {sort === "asc" && <CheckIcon className="size-4" />}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          {/* View Toggle Buttons */}
          <div className="flex items-center gap-1 bg-background-surface border border-border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-primary-surface text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-accent"
              }`}
              aria-label="Grid view"
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-primary-surface text-primary"
                  : "text-text-secondary hover:text-text-primary hover:bg-background-accent"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {/* TODO: handle loading */}
      {/* TODO: handle errors */}
      <div className="space-y-4">
        {!isLoading && data && (
          <>
            {!data.containers.length && !data.items.length ? (
              <div className="text-center py-8">
                <p className="text-text-secondary">No results found</p>
              </div>
            ) : (
              <>
                {/* Boxes */}
                {data.containers.length > 0 && (
                  <>
                    {type !== "container" && (
                      <h3 className="text-text-secondary mb-3">Boxes</h3>
                    )}
                    <div className="space-y-1">
                      {viewMode === "list" && (
                        <ContainerListView containers={data.containers} />
                      )}
                      {viewMode === "grid" && (
                        <ContainerGridView containers={data.containers} />
                      )}
                    </div>
                  </>
                )}
                {/* Items */}
                {data.items.length > 0 && (
                  <div>
                    {type !== "item" && (
                      <h3 className="text-text-secondary mb-3">Items</h3>
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
          </>
        )}
      </div>
    </div>
  );
}

export default AdvancedSearch;
