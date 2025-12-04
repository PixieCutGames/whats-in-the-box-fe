import { Field, Form, Formik } from "formik";
import { Search } from "lucide-react";

type SearchFormProps = {
  query: string;
  onSubmit: (query: string) => void;
};
function SearchForm({ query, onSubmit }: SearchFormProps) {
  return (
    <Formik
      initialValues={{
        query,
      }}
      enableReinitialize
      onSubmit={({ query }, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit(query);
      }}
    >
      {() => (
        <Form>
          <div className="my-4 relative">
            <Field
              name="query"
              placeholder="Search by box, item, location"
              id="query"
              className="w-full pr-10 pl-4 py-3 bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg text-text-primary dark:text-text-dark-primary placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4 text-text-secondary dark:text-text-dark-secondary" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SearchForm;
