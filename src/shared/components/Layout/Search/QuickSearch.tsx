import { useDebounce } from "@uidotdev/usehooks";
import { Field, Form, Formik } from "formik";
import { Blocks, Package, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQuickSearch from "../../../hooks/useQuickSearch";
import QuickSearchResultsSkeleton from "../../skeleton/QuickSearchResultsSkeleton";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import { Container, Item } from "../../../../types";
import UIState from "../UIState";
import useRecentSearches from "../../../hooks/useRecentSearches";

type QuickSearchProps = {
  onClose?: () => void;
};
function QuickSearch({ onClose }: QuickSearchProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchFieldEmpty, setSearchFieldEmpty] = useState<boolean>(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { recentSearches } = useRecentSearches();
  const { data, isLoading, refetch, error } =
    useQuickSearch(debouncedSearchTerm);
  const closeDialog = () => {
    if (onClose) onClose();
  };

  const getContainersList = (containers: Container[]) => {
    return containers.length > 0 ? (
      <>
        <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
          Boxes
        </h3>
        <div className="space-y-1">
          {containers.map((result) => {
            return (
              <Link
                key={result.id}
                to={`/box/${result.id}`}
                onClick={closeDialog}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-background-accent dark:hover:bg-background-accent/10 text-text-primary dark:text-text-dark-primary no-underline`}
              >
                <Package className="h-5 w-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div>{result.name}</div>
                  {result.location && (
                    <div className="text-text-secondary dark:text-text-dark-secondary">
                      (in {result.location})
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </>
    ) : null;
  };

  const getItemsList = (items: Item[]) => {
    return items.length > 0 ? (
      <div>
        <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
          Items
        </h3>
        <div className="space-y-1">
          {items.map((result) => {
            return (
              <Link
                key={result.id}
                to={`/item/${result.id}`}
                onClick={closeDialog}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-background-accent dark:hover:bg-background-accent/10 text-text-primary dark:text-text-dark-primary no-underline`}
              >
                <Blocks className="h-5 w-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div>{result.name}</div>
                  {result.container.name && (
                    <div className="text-text-secondary dark:text-text-dark-secondary">
                      (in {result.container.name})
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    ) : null;
  };

  return (
    <>
      <Formik
        initialValues={{
          query: "",
        }}
        onSubmit={({ query }, { setSubmitting }) => {
          // TODO: prevent submitting empty or short queries
          navigate(`/search?query=${query}`);
          setSubmitting(false);
          closeDialog();
        }}
      >
        {() => (
          <Form
            onChange={(e) => {
              const value = (e.target as any).value;
              if (value === "") setSearchFieldEmpty(true);
              if (typeof value === "string" && value.length >= 3) {
                setSearchTerm(value);
                setSearchFieldEmpty(false);
              }
            }}
          >
            <div className="my-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary dark:text-text-dark-secondary" />
              <Field
                name="query"
                placeholder="Search by box or item"
                id="query"
                className="w-full pl-10 pr-4 py-3 bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg text-text-primary dark:text-text-dark-primary placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
              />
            </div>
          </Form>
        )}
      </Formik>
      {searchFieldEmpty && recentSearches.length ? (
        <div>
          <h3 className="text-text-secondary dark:text-text-dark-secondary mb-3">
            Recent searches:
          </h3>
          <div className="space-y-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => {
                  setSearchTerm(search);
                  setSearchFieldEmpty(false);
                }}
                className="block w-full text-left px-3 py-2 text-text-primary dark:text-text-dark-primary hover:bg-background-accent dark:hover:bg-background-accent/10 rounded-lg transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <UIState
          loading={isLoading}
          error={!!error}
          empty={data && !data.containers.length && !data.items.length}
        >
          <div data-loading>
            <QuickSearchResultsSkeleton />
          </div>
          <div data-error>
            <ErrorState refetch={refetch} />
          </div>
          <div data-empty className="space-y-4">
            <EmptyState />
          </div>
          <div data-data className="space-y-4">
            {!!data && (
              <>
                {/* Boxes */}
                {getContainersList(data.containers)}

                {/* Items */}
                {getItemsList(data.items)}
              </>
            )}
          </div>
        </UIState>
      )}
    </>
  );
}

export default QuickSearch;
