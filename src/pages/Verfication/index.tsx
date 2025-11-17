import Branding from "../../shared/components/ui/Branding";
import VerificationSection from "./VerificationSection";

function VerficationPage() {
  return (
    <div className="min-h-screen lg:flex lg:flex-row bg-background">
      <Branding />
      <VerificationSection />
    </div>
  );
}

export default VerficationPage;
