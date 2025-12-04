export default function ChangePasswordSkeleton() {
  return (
    <div className="py-6 animate-pulse space-y-6">
      {/* Top description text */}
      <div className="h-4 w-64 bg-background-accent dark:bg-background-accent/10 rounded" />

      {/* Form container */}
      <div className="space-y-4">
        {/* Current Password */}
        <div className="space-y-2">
          {/* Label */}
          <div className="h-4 w-28 bg-background-accent dark:bg-background-accent/10 rounded" />
          {/* Input */}
          <div className="h-10 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
          {/* Error placeholder */}
          <div className="h-4 w-24 bg-background-accent dark:bg-background-accent/10 rounded" />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-background-accent dark:bg-background-accent/10 rounded" />
          <div className="h-10 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
          <div className="h-4 w-20 bg-background-accent dark:bg-background-accent/10 rounded" />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <div className="h-4 w-32 bg-background-accent dark:bg-background-accent/10 rounded" />
          <div className="h-10 w-full bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark" />
          <div className="h-4 w-20 bg-background-accent dark:bg-background-accent/10 rounded" />
        </div>

        {/* Mobile Submit Button */}
        <div className="lg:hidden w-full">
          <div className="h-12 bg-background-accent dark:bg-background-accent/10 rounded-lg" />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex flex-row justify-end gap-2">
          {/* Cancel */}
          <div className="h-10 w-24 bg-background-accent dark:bg-background-accent/10 rounded-lg" />
          {/* Submit */}
          <div className="h-10 w-40 bg-background-accent dark:bg-background-accent/10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
