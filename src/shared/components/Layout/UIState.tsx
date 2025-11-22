import { Children } from "react";

type UIStateProps = {
  loading?: boolean;
  error?: boolean;
  empty?: boolean;
  children: React.ReactNode;
};
export default function UIState({
  loading,
  error,
  empty,
  children,
}: UIStateProps) {
  const map = {
    loading: "data-loading",
    error: "data-error",
    empty: "data-empty",
    data: "data-data",
  };

  let target;

  if (loading) target = map.loading;
  else if (error) target = map.error;
  else if (empty) target = map.empty;
  else target = map.data;

  const childToRender = Children.toArray(children).find((child) => {
    if (typeof child === "object" && child !== null && "props" in child) {
      return child.props[target] !== undefined;
    }
  });

  return childToRender || null;
}
