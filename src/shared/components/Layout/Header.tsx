import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { ArrowLeft, ChevronDown, Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import MobileSidebar from "./MobileSideBar";
import { useMediaQuery } from "@uidotdev/usehooks";

import Logo from "/assets/Logo.png";
import WhiteLogo from "/assets/white-logo.png";
import SearchButton from "./SearchButton";
import useUser from "../../hooks/useUser";
import DarkModeButton from "./DarkModeButton";

export const NESTED_ROUTES = [
  { path: "/box/new", title: "Create New Box" },
  { path: "/box/edit", title: "Edit Box" },
  { path: "/item/new", title: "Create New Item" },
  { path: "/item/edit", title: "Edit Item" },
  { path: "/quick", title: "Search" },
  { path: "/profile", title: "Profile" },
  { path: "/change-password", title: "Change Password" },
];

type HeaderProps = {
  navigationItems: {
    label: string;
    href: string;
  }[];
  pathname: string;
};
function Header({ navigationItems, pathname }: HeaderProps) {
  const { userDetails } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const location = useLocation();
  const navigate = useNavigate();
  const nestedRoute = NESTED_ROUTES.find((r) => r.path === location.pathname);

  if (notDesktop && nestedRoute) {
    return (
      <div className="bg-background-surface dark:bg-background-dark-surface border-b border-border dark:border-border-dark px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-background-accent dark:hover:bg-background-accent/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-text-primary dark:text-text-dark-primary" />
          </button>
          <h1 className="text-text-primary dark:text-text-dark-primary">
            {nestedRoute.title}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-background-surface dark:bg-background-dark-surface border-b border-border dark:border-border-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Mobile Menu + Logo + Nav Links */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-background-accent dark:hover:bg-background-accent/10 transition-colors"
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-5 w-5 text-text-primary dark:text-text-dark-primary" />
            </button>
            <MobileSidebar
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              navigationItems={navigationItems}
              pathname={pathname}
            />

            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="rounded-lg bg-primary dark:bg-transparent flex items-center justify-center"
              >
                <img src={Logo} alt="Logo" className="h-8 dark:hidden" />
                <img
                  src={WhiteLogo}
                  alt="Logo"
                  className="h-8 dark:block hidden"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg transition-colors no-underline ${
                    pathname === item.href
                      ? "bg-primary-surface dark:bg-primary-dark-foreground/10 text-primary dark:text-primary-dark-foreground"
                      : "text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-accent dark:hover:bg-background-accent/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Right Section: Search + Profile */}
          <div className="flex items-center gap-3">
            {/* Search  */}
            <SearchButton />
            {/* Dark Mode Toggle */}
            <DarkModeButton />
            {/* Profile Dropdown */}
            <div className="relative">
              <Menu>
                <MenuButton className="flex items-center gap-2 p-2 rounded-lg hover:bg-background-accent dark:hover:bg-background-accent/10 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary-surface dark:bg-primary-dark-foreground/10 flex items-center justify-center">
                    <span className="text-primary dark:text-primary-dark-foreground uppercase">
                      {(
                        userDetails?.user.name ?? userDetails?.user.email
                      )?.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-text-secondary dark:text-text-dark-secondary hidden sm:block" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="mt-2 w-48 bg-background-surface dark:bg-background-dark-surface border border-border dark:border-border-dark rounded-lg shadow-lg py-1 focus:outline-none"
                >
                  <MenuItem>
                    <Link
                      className="block px-4 py-2 text-text-secondary dark:text-text-dark-secondary hover:bg-background-accent dark:hover:bg-background-accent/10 hover:text-text-primary dark:hover:text-text-dark-primary transition-colors no-underline"
                      to="/profile"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuSeparator className="my-1 h-px border-t border-border dark:border-border-dark" />
                  <MenuItem>
                    <Link
                      className="block px-4 py-2 text-text-secondary dark:text-text-dark-secondary hover:bg-background-accent dark:hover:bg-background-accent/10 hover:text-text-primary dark:hover:text-text-dark-primary transition-colors no-underline"
                      to="/logout"
                    >
                      Sign out
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
