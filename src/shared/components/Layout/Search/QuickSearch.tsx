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

type QuickSearchProps = {
  onClose?: () => void;
};
function QuickSearch({ onClose }: QuickSearchProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading, refetch, error } =
    useQuickSearch(debouncedSearchTerm);
  const closeDialog = () => {
    if (onClose) onClose();
  };

  const getContainersList = (containers: Container[]) => {
    return containers.length > 0 ? (
      <>
        <h3 className="text-text-secondary mb-3">Boxes</h3>
        <div className="space-y-1">
          {containers.map((result) => {
            return (
              <Link
                key={result.id}
                to={`/box/${result.id}`}
                onClick={closeDialog}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-background-accent text-text-primary no-underline`}
              >
                <Package className="h-5 w-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div>{result.name}</div>
                  {result.location && (
                    <div className="text-text-secondary">
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
        <h3 className="text-text-secondary mb-3">Items</h3>
        <div className="space-y-1">
          {items.map((result) => {
            return (
              <Link
                key={result.id}
                to={`/item/${result.id}`}
                onClick={closeDialog}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-background-accent text-text-primary no-underline`}
              >
                <Blocks className="h-5 w-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div>{result.name}</div>
                  {result.container.name && (
                    <div className="text-text-secondary">
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

  // TODO: add recent searches
  return (
    <>
      <Formik
        initialValues={{
          query: "",
        }}
        onSubmit={({ query }, { setSubmitting }) => {
          navigate(`/search?query=${query}`);
          setSubmitting(false);
          closeDialog();
        }}
      >
        {() => (
          <Form
            onChange={(e) => {
              const value = (e.target as any).value;
              if (typeof value === "string" && value.length >= 3)
                setSearchTerm(value);
            }}
          >
            <div className="my-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <Field
                name="query"
                placeholder="Search by box or item"
                id="query"
                className="w-full pl-10 pr-4 py-3 bg-background-surface border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </Form>
        )}
      </Formik>
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
    </>
  );
}

export default QuickSearch;
