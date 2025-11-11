import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useLocation, useNavigate } from "react-router";
import LoginForm from "./LoginForm";

function AuthForms() {
  const location = useLocation();
  const navigate = useNavigate();

  const toggleForms = (index: number) => {
    console.log(location.pathname);
    console.log(index);

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
              {/* <Card
                title="Create an account"
                description="Start sharing files securely in minutes"
              ></Card> */}
              {/* <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Start sharing files securely in minutes
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create account"}
                  </Button>
                </CardFooter>
              </form>
            </Card> */}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}

export default AuthForms;
