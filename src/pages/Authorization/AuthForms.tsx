import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForms() {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleForms = (index: number) => {
    navigate(index === 0 ? "/login" : "/register");
  };

  return (
    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        <TabGroup
          selectedIndex={location.pathname === "/register" ? 1 : 0}
          onChange={toggleForms}
          className="flex flex-col gap-2 w-full"
        >
          <TabList className="bg-muted text-muted-foreground h-9 items-center justify-center rounded-xl p-[3px] grid-cols-2 mb-8 grid w-full">
            <Tab className="data-selected:bg-card dark:data-selected:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-selected:border-input dark:data-selected:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              Login
            </Tab>
            <Tab className="data-selected:bg-card dark:data-selected:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-selected:border-input dark:data-selected:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              Register
            </Tab>
          </TabList>

          <TabPanels>
            {/* Login Form */}
            <TabPanel className="flex-1 outline-none">
              <LoginForm />
            </TabPanel>

            {/* Register Form */}
            <TabPanel className="flex-1 outline-none">
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

export default AuthForms;
