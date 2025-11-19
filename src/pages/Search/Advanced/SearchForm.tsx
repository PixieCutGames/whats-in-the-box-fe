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
              className="w-full pr-10 pl-4 py-3 bg-background-surface border border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="h-4 w-4 text-text-secondary" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SearchForm;
