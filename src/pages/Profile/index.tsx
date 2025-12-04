import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/components/ui/Button";
import useUser from "../../shared/hooks/useUser";
import ChangeNameDialog from "./ChangeNameDialog";
import { useState } from "react";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { useMediaQuery } from "@uidotdev/usehooks";
import Label from "../../shared/components/form/Label";

function ProfilePage() {
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const { userDetails } = useUser();
  const navigate = useNavigate();
  const [isChangeNameOpened, setisChangeNameOpened] = useState(false);
  const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-text-primary dark:text-text-dark-primary text-2xl font-medium max-lg:hidden">
          Profile
        </h1>
      </div>
      {/* Profile Form */}
      <div className="bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg p-6 max-w-2xl">
        <div className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="flex items-center gap-2">
              <input
                id="name"
                type="text"
                value={userDetails?.user.name ?? ""}
                disabled
                className="dark:bg-input/10 bg-background-accent border-border dark:border-border-dark flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-text-primary dark:text-text-dark-primary text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] flex-1"
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
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              value={userDetails?.user.email}
              disabled
              className="dark:bg-input/10 bg-background-accent border-border dark:border-border-dark flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-text-primary dark:text-text-dark-primary text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] flex-1"
            />
          </div>

          {/* Password Section */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Button
              onClick={() => {
                if (notDesktop) navigate("/change-password");
                else setIsChangePasswordOpened(true);
              }}
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
          variant="outline-destructive"
          className="w-full sm:w-auto"
        >
          Logout
        </Button>
      </div>
      <ChangeNameDialog
        isOpen={isChangeNameOpened}
        onClose={() => setisChangeNameOpened(false)}
      />
      <ChangePasswordDialog
        isOpen={isChangePasswordOpened}
        onClose={() => setIsChangePasswordOpened(false)}
      />
    </div>
  );
}

export default ProfilePage;
