import { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import Header from "./Header";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const { pathname } = location;

  const navigationItems = [
    { label: "Dashboard", href: "/" },
    { label: "Boxes", href: "/boxes" },
  ];

  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-background">
        <Header pathname={pathname} navigationItems={navigationItems} />
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
