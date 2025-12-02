import { Download, Share2, Upload } from "lucide-react";
import Logo from "/assets/white-logo.png";

const Branding = () => {
  const items = [
    {
      icon: <Upload className="w-6 h-6" />,
      title: "Easy Upload",
      subTitle: "Drag and drop your files or browse to upload instantly",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Quick Sharing",
      subTitle: "Share files with anyone using secure links",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Fast Downloads",
      subTitle: "Download your files anytime, anywhere",
    },
  ];
  return (
    <>
      <div className="lg:w-1/2 bg-primary dark:bg-background-dark-surface p-8 lg:p-12 hidden lg:flex flex-col justify-between text-primary-foreground dark:text-text-dark-primary">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src={Logo} alt="Logo" className="h-10" />
            <h1 className="text-3xl">Whats in the box</h1>
          </div>

          <div className="space-y-8 mt-16 hidden lg:block">
            {items.map((item) => (
              <div className="flex items-start gap-4" key={item.title}>
                <div className="bg-primary-foreground/10 dark:bg-primary-dark-foreground/10 p-3 rounded-lg backdrop-blur-sm border border-primary-foreground/20 dark:border-primary-dark-foreground/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1">{item.title}</h3>
                  <p className="text-primary-foreground/80 dark:text-primary-dark-foreground/80">
                    {item.subTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-primary-foreground/70 dark:text-text-dark-primary/70 hidden lg:block">
          © 2025 whats in the box. All rights reserved.
        </div>
      </div>
      <div className="lg:hidden p-8 bg-primary dark:bg-background-dark-surface text-primary-foreground dark:text-text-dark-primary flex justify-center">
        <div className="flex items-center gap-3">
          <img src="/assets/Logo.png" alt="Logo" className="h-10" />
          <h1 className="text-3xl">Whats in the box</h1>
        </div>
      </div>
    </>
  );
};

export default Branding;
