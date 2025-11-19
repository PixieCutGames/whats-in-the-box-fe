import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/ui/Button";
import useUser from "../../shared/hooks/useUser";
import ChangeNameDialog from "./ChangeNameDialog";
import { useState } from "react";

function ProfilePage() {
  const { userDetails } = useUser();
  const navigate = useNavigate();
  const [isChangeNameOpened, setisChangeNameOpened] = useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary text-2xl font-medium max-lg:hidden">
          Profile
        </h1>
      </div>
      {/* Profile Form */}
      <div className="bg-background-surface border border-border rounded-lg p-6 max-w-2xl">
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
            >
              Name
            </label>
            <div className="flex items-center gap-2">
              <input
                id="name"
                type="text"
                value={userDetails?.user.name ?? ""}
                disabled
                className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] flex-1 bg-background-accent text-text-primary"
              />
              <Button
                onClick={() => setisChangeNameOpened(true)}
                variant="outline"
                className="whitespace-nowrap"
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Email Field (Read-only) */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={userDetails?.user.email}
              disabled
              className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] flex-1 bg-background-accent text-text-primary"
            />
          </div>

          {/* Password Section */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
            >
              Password
            </label>
            <Button
              //   onClick={() => setChangePasswordOpen(true)}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
      {/* Logout Button */}
      <div className="max-w-2xl">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full sm:w-auto border-error text-error hover:bg-error hover:text-text-inverse"
        >
          Logout
        </Button>
      </div>
      <ChangeNameDialog
        isOpen={isChangeNameOpened}
        onClose={() => setisChangeNameOpened(false)}
      />
    </div>
  );
}

export default ProfilePage;
