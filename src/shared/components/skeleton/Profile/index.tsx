function Profile() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* PAGE TITLE */}
      <div>
        <div className="h-8 w-28 bg-background-accent dark:bg-background-accent/10 rounded max-lg:hidden" />
      </div>

      {/* PROFILE FORM CARD */}
      <div className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-6 max-w-2xl">
        <div className="space-y-6">
          {/* NAME FIELD */}
          <div className="space-y-2">
            {/* Label */}
            <div className="h-4 w-16 bg-background-accent dark:bg-background-accent/10 rounded" />

            {/* Input + Button */}
            <div className="flex items-center gap-2">
              {/* Input */}
              <div className="h-9 bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark flex-1" />

              {/* Edit Button */}
              <div className="h-9 w-16 bg-background-accent dark:bg-background-accent/10 rounded-md" />
            </div>
          </div>

          {/* EMAIL FIELD */}
          <div className="space-y-2">
            {/* Label */}
            <div className="h-4 w-16 bg-background-accent dark:bg-background-accent/10 rounded" />

            {/* Input */}
            <div className="h-9 bg-background-accent dark:bg-background-accent/10 rounded-md border border-border dark:border-border-dark w-full" />
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-2">
            {/* Label */}
            <div className="h-4 w-20 bg-background-accent dark:bg-background-accent/10 rounded" />

            {/* Button */}
            <div className="h-9 w-40 bg-background-accent dark:bg-background-accent/10 rounded-md" />
          </div>
        </div>
      </div>

      {/* LOGOUT BUTTON */}
      <div className="max-w-2xl">
        <div className="h-9 w-28 bg-background-accent dark:bg-background-accent/10 rounded-md" />
      </div>
    </div>
  );
}

export default Profile;
