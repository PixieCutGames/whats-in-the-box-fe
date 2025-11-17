import { useLocation, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shared/components/ui/Card";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { Button } from "../../shared/components/ui/Button";
import { useEffect, useState } from "react";
import { tokenManager } from "../../lib/tokenManager";
import useVerify from "../../shared/hooks/useVerify";

function VerificationSection() {
  const { loadingResend, resendVerification, resendData, resendError } =
    useVerify();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const verificationEmail = location.state.email;
  const prevPath = location.state.prevPath;

  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    tokenManager.clear();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleResendVerification = () => {
    resendVerification(
      { email: verificationEmail },
      () => setResendCooldown(30),
      () => setResendCooldown(30)
    );
  };

  const getHandleResendVerificationText = () => {
    if (resendCooldown > 0) return `Resend in ${resendCooldown}s`;
    if (loadingResend) return "Resending verification email...";
    return "Resend verification email";
  };

  return (
    <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <CardTitle>
              {prevPath
                ? "Verify your email to continue"
                : "Please verify your email"}
            </CardTitle>
            <CardDescription>
              {!!prevPath ? (
                <>
                  We've sent a verification link to
                  <span className="text-foreground">{verificationEmail}</span>.
                  Please check your inbox and click the link to activate your
                  account.
                </>
              ) : (
                <>
                  Your account is created, but your email isn't verified yet.{" "}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {resendCooldown > 0 && !!resendData && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-2 text-success mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="font-medium">
                    Verification email sent again!
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Check your inbox. The link is on its way.
                </p>
              </div>
            )}
            {resendCooldown > 0 && !!resendError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">{resendError.message}</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Please wait 30 seconds before requesting another email.
                </p>
              </div>
            )}
            <Button
              onClick={handleResendVerification}
              disabled={resendCooldown > 0 || loadingResend}
              variant="outline"
              className={`w-full ${loadingResend && "disabled:opacity-100"}`}
            >
              {getHandleResendVerificationText()}
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="outline"
              className="w-full"
            >
              Change email
            </Button>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="ghost"
              className="w-full"
            >
              Back to login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default VerificationSection;
