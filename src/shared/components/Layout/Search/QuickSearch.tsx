import { useDebounce } from "@uidotdev/usehooks";
import { Field, Form, Formik } from "formik";
import { Blocks, Package, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useQuickSearch from "../../../hooks/useQuickSearch";
import QuickSearchResultsSkeleton from "../../skeleton/QuickSearchResultsSkeleton";
import EmptyState from "./EmptyState";

type QuickSearchProps = {
  onClose?: () => void;
};
function QuickSearch({ onClose }: QuickSearchProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, isLoading, refetch } = useQuickSearch(debouncedSearchTerm);
  const closeDialog = () => {
    if (onClose) onClose();
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
      {/* TODO: handle errors */}
      {isLoading ? (
        <QuickSearchResultsSkeleton />
      ) : (
        <div className="space-y-4">
          {data && (
            <>
              {!data.containers.length && !data.items.length ? (
                <EmptyState quickSearch />
              ) : (
                <>
                  {/* Boxes */}
                  {data.containers.length > 0 && (
                    <>
                      <h3 className="text-text-secondary mb-3">Boxes</h3>
                      <div className="space-y-1">
                        {data.containers.map((result) => {
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
                  )}

                  {/* Items */}
                  {data.items.length > 0 && (
                    <div>
                      <h3 className="text-text-secondary mb-3">Items</h3>
                      <div className="space-y-1">
                        {data.items.map((result) => {
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
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default QuickSearch;
