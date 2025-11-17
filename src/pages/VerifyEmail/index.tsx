import Branding from "../../shared/components/ui/Branding";
import VerifyEmailSection from "./VerifyEmailSection";

function VerifyEmailPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background">
      <Branding />
      <VerifyEmailSection />
    </div>
  );
}

export default VerifyEmailPage;
