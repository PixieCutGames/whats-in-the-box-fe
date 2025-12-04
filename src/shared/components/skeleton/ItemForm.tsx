export default function ItemFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* PHOTO UPLOAD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-16 bg-background-accent dark:bg-background-accent/10 rounded" />

        {/* Image preview box */}
        <div className="w-full h-48 bg-background-accent dark:bg-background-accent/10 rounded-lg border border-border dark:border-border-dark" />
      </div>

      {/* NAME FIELD */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-background-accent dark:bg-background-accent/10 rounded" />
        <div className="h-9 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
      </div>

      {/* CONTAINER (LOCATION) FIELD */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-background-accent dark:bg-background-accent/10 rounded" />

        <div className="relative">
          {/* Input */}
          <div className="h-9 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />

          {/* Dropdown icon */}
          <div className="absolute inset-y-0 right-0 px-2.5 flex items-center">
            <div className="h-4 w-4 bg-background-accent/70 dark:bg-background-accent/5 rounded" />
          </div>
        </div>
      </div>

      {/* QUANTITY */}
      <div className="space-y-2">
        <div className="h-4 w-16 bg-background-accent dark:bg-background-accent/10 rounded" />
        <div className="h-9 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-background-accent dark:bg-background-accent/10 rounded" />
        <div className="min-h-16 h-16 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
      </div>

      {/* MOBILE SUBMIT BUTTON */}
      <div className="lg:hidden">
        <div className="h-12 w-full bg-background-accent dark:bg-background-accent/10 rounded-lg" />
      </div>

      {/* DESKTOP BUTTON GROUP */}
      <div className="hidden lg:flex justify-end gap-2">
        {/* Cancel */}
        <div className="h-10 w-24 bg-background-accent dark:bg-background-accent/10 rounded-lg" />

        {/* Submit */}
        <div className="h-10 w-40 bg-background-accent dark:bg-background-accent/10 rounded-lg" />
      </div>
    </div>
  );
}
