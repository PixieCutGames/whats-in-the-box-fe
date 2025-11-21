import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/Card";
import { Button } from "../../shared/components/ui/Button";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import useVerify from "../../shared/hooks/useVerify";
import { useEffect, useState } from "react";

function VerifyEmailSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const { loadingVerify, verifyError, verifyDetails } = useVerify(
    token ?? undefined
  );

  useEffect(() => {
    if (verifyDetails && redirectCountdown > 0) {
      const countdownTimer = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdownTimer);
    } else if (verifyDetails && redirectCountdown === 0) {
      // Redirect to login
      handleContinueToLogin();
    }
  }, [verifyDetails, redirectCountdown]);

  // TODO: Handle invalid token or verification error
  if (!token || !!verifyError) return <Navigate to="/login" replace />;

  const handleContinueToLogin = () => navigate("/login");
  return (
    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        <Card>
          {loadingVerify ? (
            <>
              <CardHeader className="text-center">
                {/* Spinner Container */}
                <div className="mx-auto mb-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>

                <CardTitle>Verifying your email…</CardTitle>
                <CardDescription>
                  Please wait while we confirm your identity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  This may take a few seconds.
                </p>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
                <CardTitle>Your email has been verified</CardTitle>
                <CardDescription>
                  You can now log in and start organizing your boxes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleContinueToLogin} className="w-full">
                  Continue to login
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Auto-redirecting in {redirectCountdown} seconds...
                </p>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

export default VerifyEmailSection;
