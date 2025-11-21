import { useMediaQuery } from "@uidotdev/usehooks";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { NESTED_ROUTES } from "../Layout/Header";

export default function HeaderSkeleton() {
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  const location = useLocation();
  const navigate = useNavigate();
  const nestedRoute = NESTED_ROUTES.find((r) => r.path === location.pathname);

  if (notDesktop && nestedRoute) {
    return (
      <div className="bg-background-surface border-b border-border px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-background-accent rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-text-primary" />
          </button>
          <h1 className="text-text-primary">{nestedRoute.title}</h1>
        </div>
      </div>
    );
  }
  return (
    <nav className="bg-background-surface border-b border-border sticky top-0 z-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu */}
            <div className="lg:hidden p-2 rounded-lg bg-background-accent h-9 w-9" />

            {/* Logo */}
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-primary/40" />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              <div className="h-8 w-16 rounded-lg bg-background-accent" />
              <div className="h-8 w-16 rounded-lg bg-background-accent" />
              <div className="h-8 w-16 rounded-lg bg-background-accent" />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="p-2 rounded-lg bg-background-accent h-9 w-9" />

            {/* Profile */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-background-accent">
              <div className="h-8 w-8 rounded-full bg-primary/30" />
              <div className="hidden sm:block h-4 w-4 rounded bg-background-accent/70" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
