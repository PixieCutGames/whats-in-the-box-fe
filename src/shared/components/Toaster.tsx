import { useMediaQuery } from "@uidotdev/usehooks";
import { CheckCircle2, XCircle } from "lucide-react";
import { Toaster as HotToaster } from "react-hot-toast";

function Toaster() {
  const notDesktop = useMediaQuery("only screen and (max-width : 1024px)");
  return (
    <HotToaster
      position={notDesktop ? "bottom-center" : "top-right"}
      toastOptions={{
        style: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
        success: {
          className:
            "text-success! bg-toaster-background-success! border-toaster-border-success! border! text-sm! font-medium! px-4! py-2! rounded-lg!",
          iconTheme: {
            primary: "#059669",
            secondary: "white",
          },
          icon: <CheckCircle2 className="h-5 w-5" />,
        },
        error: {
          className:
            "text-destructive! bg-toaster-background-error! border-toaster-border-error! border! text-sm! font-medium! px-4! py-2! rounded-lg!",
          iconTheme: {
            primary: "#DC2626",
            secondary: "white",
          },
          icon: <XCircle className="h-4 w-4" />,
          duration: 1000000,
        },
      }}
    />
  );
}

export default Toaster;
