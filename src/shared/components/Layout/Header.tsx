import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import { ChevronDown, Menu as MenuIcon, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileSidebar from "./MobileSideBar";

type HeaderProps = {
  navigationItems: {
    label: string;
    href: string;
  }[];
  pathname: string;
};
function Header({ navigationItems, pathname }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState<boolean>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  return (
    <nav className="bg-background-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section: Mobile Menu + Logo + Nav Links */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-background-accent transition-colors"
              aria-label="Toggle menu"
            >
              <MenuIcon className="h-5 w-5 text-text-primary" />
            </button>
            <MobileSidebar
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
              navigationItems={navigationItems}
              pathname={pathname}
            />

            {/* Logo */}
            <div className="flex items-center">
              <div className="rounded-lg bg-primary flex items-center justify-center">
                <img src="/assets/Logo.png" alt="Logo" className="h-8" />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg transition-colors no-underline ${
                    pathname === item.href
                      ? "bg-primary-surface text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-background-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Right Section: Search + Profile */}
          <div className="flex items-center gap-3">
            {/* Search - Desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder:text-text-secondary"
                />
              </div>
            </div>
            {/* Search - Mobile Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-background-accent transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-text-primary" />
            </button>
            {/* Profile Dropdown */}
            <div className="relative">
              <Menu>
                <MenuButton className="flex items-center gap-2 p-2 rounded-lg hover:bg-background-accent transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary-surface flex items-center justify-center">
                    <span className="text-primary">U</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-text-secondary hidden sm:block" />
                </MenuButton>
                <MenuItems
                  anchor="bottom end"
                  className="mt-2 w-48 bg-background-surface border border-border rounded-lg shadow-lg py-1 focus:outline-none"
                >
                  <MenuItem>
                    <Link
                      className="block px-4 py-2 text-text-secondary hover:bg-background-accent hover:text-text-primary transition-colors no-underline"
                      to="/profile"
                    >
                      Your Profile
                    </Link>
                  </MenuItem>
                  <MenuSeparator className="my-1 h-px border-t border-border" />
                  <MenuItem>
                    <Link
                      className="block px-4 py-2 text-text-secondary hover:bg-background-accent hover:text-text-primary transition-colors no-underline"
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
        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder:text-text-secondary"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
