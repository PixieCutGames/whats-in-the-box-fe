import { Home, Package, Search } from "lucide-react";
import { Button } from "../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[120px] leading-none opacity-10 select-none text-primary dark:text-primary-dark">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-primary dark:text-primary-dark" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-neutral-900 dark:text-neutral-100">
            Page Not Found
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button onClick={() => navigate("/")} className="gap-2">
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
          <Button
            onClick={() => navigate("/boxes")}
            variant="outline"
            className="gap-2"
          >
            <Package className="w-4 h-4" />
            View All Boxes
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-8">
          <p className="text-sm text-neutral-500 dark:text-neutral-500">
            If you believe this is an error, please check the URL or use the
            navigation above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
