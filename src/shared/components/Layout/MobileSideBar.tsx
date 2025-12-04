import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import Logo from "/assets/Logo.png";
import WhiteLogo from "/assets/white-logo.png";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: {
    label: string;
    href: string;
  }[];
  pathname: string;
}

export default function MobileSidebar({
  navigationItems,
  pathname,
  isOpen,
  onClose,
}: MobileSidebarProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        {/* PANEL (Sidebar) */}
        <div className="fixed inset-0 flex">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-300"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="relative w-72 bg-background-surface dark:bg-background-dark-surface shadow-lg gap-4 flex flex-col border-r border-border dark:border-border-dark">
              {/* HEADER */}
              <div className="flex justify-between gap-1.5 p-4">
                <div className="rounded-lg bg-primary dark:bg-transparent flex items-center justify-center">
                  <Link to="/" onClick={onClose}>
                    <img src={Logo} alt="Logo" className="h-8 dark:hidden" />
                    <img
                      src={WhiteLogo}
                      alt="Logo"
                      className="h-8 dark:block hidden"
                    />
                  </Link>
                </div>
                <button
                  onClick={onClose}
                  className="text-foreground dark:text-foreground-dark rounded-xs opacity-70 transition-opacity hover:opacity-100 ring-offset-background dark:ring-offset-background-dark focus:ring-ring dark:focus:ring-ring-dark focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                >
                  <XIcon className="size-4" />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              {/* LINKS */}
              <nav className="flex flex-col gap-2 mt-6">
                {navigationItems.map((item) => (
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`px-4 py-3 rounded-lg transition-colors no-underline ${
                      pathname === item.href
                        ? "bg-primary-surface dark:bg-primary-dark-foreground/10 text-primary dark:text-primary-dark-foreground"
                        : "text-text-secondary dark:text-text-dark-secondary hover:text-text-primary dark:hover:text-text-dark-primary hover:bg-background-accent dark:hover:bg-background-accent/10"
                    }`}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
