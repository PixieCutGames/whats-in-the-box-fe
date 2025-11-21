export default function ContainerFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* PHOTO UPLOAD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-16 bg-background-accent rounded" />

        {/* Photo preview area */}
        <div className="w-full h-48 bg-background-accent rounded-lg border border-border" />
      </div>

      {/* NAME FIELD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-24 bg-background-accent rounded" />

        {/* Input */}
        <div className="h-9 w-full bg-background-accent rounded-md border border-border" />
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-32 bg-background-accent rounded" />

        {/* Textarea */}
        <div className="min-h-16 h-16 w-full bg-background-accent rounded-md border border-border" />
      </div>

      {/* LOCATION FIELD */}
      <div className="space-y-2">
        {/* Label */}
        <div className="h-4 w-40 bg-background-accent rounded" />

        {/* Input */}
        <div className="h-9 w-full bg-background-accent rounded-md border border-border" />
      </div>

      {/* MOBILE SUBMIT BUTTON */}
      <div className="lg:hidden">
        <div className="h-12 w-full bg-background-accent rounded-lg" />
      </div>

      {/* DESKTOP BUTTON GROUP */}
      <div className="hidden lg:flex justify-end gap-2">
        {/* Cancel Button */}
        <div className="h-10 w-24 bg-background-accent rounded-lg" />

        {/* Submit Button */}
        <div className="h-10 w-40 bg-background-accent rounded-lg" />
      </div>
    </div>
  );
}
