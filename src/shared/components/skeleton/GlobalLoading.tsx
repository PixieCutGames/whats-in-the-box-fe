export default function GlobalLoading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background dark:bg-background-dark">
      <div className="h-10 w-10 border-4 border-primary dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
