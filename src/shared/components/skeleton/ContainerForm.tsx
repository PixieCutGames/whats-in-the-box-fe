export default function ContainerFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* PHOTO UPLOAD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-16 bg-background-accent dark:bg-background-accent/10 rounded" />

        {/* Photo preview area */}
        <div className="w-full h-48 bg-background-accent dark:bg-background-accent/10 rounded-lg border border-border dark:border-border-dark" />
      </div>

      {/* NAME FIELD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-24 bg-background-accent dark:bg-background-accent/10 rounded" />

        {/* Input */}
        <div className="h-9 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-32 bg-background-accent dark:bg-background-accent/10 rounded" />

        {/* Textarea */}
        <div className="min-h-16 h-16 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
      </div>

      {/* LOCATION FIELD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-40 bg-background-accent dark:bg-background-accent/10 rounded" />

        {/* Input */}
        <div className="h-9 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
      </div>

      {/* MOBILE SUBMIT BUTTON */}
      <div className="lg:hidden">
        <div className="h-12 w-full bg-background-accent dark:bg-background-accent/10 rounded-lg" />
      </div>

      {/* DESKTOP BUTTON GROUP */}
      <div className="hidden lg:flex justify-end gap-2">
        {/* Cancel Button */}
        <div className="h-10 w-24 bg-background-accent dark:bg-background-accent/10 rounded-lg" />

        {/* Submit Button */}
        <div className="h-10 w-40 bg-background-accent dark:bg-background-accent/10 rounded-lg" />
      </div>
    </div>
  );
}
