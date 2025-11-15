import { PropsWithChildren, useState } from "react";
import { useLocation } from "react-router";
import Header from "./Header";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const { pathname } = location;

  const [pageTitle, setPageTitle] = useState<string>("Dashboard");

  const navigationItems = [
    { label: "Dashboard", href: "/", pageTitle: "Dashboard" },
    { label: "Boxes", href: "/boxes", pageTitle: "Boxes" },
  ];
  console.log(location.pathname, location.pathname === navigationItems[0].href);
  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-background">
        <Header pathname={pathname} navigationItems={navigationItems} />
        {/* Page Title */}
        {pageTitle && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-border">
            <h1 className="text-text-primary text-2xl font-medium">
              {pageTitle}
            </h1>
          </div>
        )}
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
