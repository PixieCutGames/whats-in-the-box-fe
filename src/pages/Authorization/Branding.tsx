import { Download, Share2, Upload } from "lucide-react";

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
      <div className="lg:w-1/2 bg-primary p-8 lg:p-12 hidden lg:flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src="/assets/Logo.png" alt="Logo" className="h-10" />
            <h1 className="text-3xl">Whats in the box</h1>
          </div>

          <div className="space-y-8 mt-16 hidden lg:block">
            {items.map((item) => (
              <div className="flex items-start gap-4" key={item.title}>
                <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1">{item.title}</h3>
                  <p className="text-white/80">{item.subTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-white/70 hidden lg:block">
          © 2025 whats in the box. All rights reserved.
        </div>
      </div>
      <div className="lg:hidden p-8 bg-primary text-white flex justify-center">
        <div className="flex items-center gap-3">
          <img src="/assets/Logo.png" alt="Logo" className="h-10" />
          <h1 className="text-3xl">Whats in the box</h1>
        </div>
      </div>
    </>
  );
};

export default Branding;
