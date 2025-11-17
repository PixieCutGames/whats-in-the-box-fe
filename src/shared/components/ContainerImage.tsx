import { Package } from "lucide-react";
import { Maybe } from "yup";

type ContainerImageProps = {
  imageUrl: Maybe<string>;
  name: string;
};
function ContainerImage({ imageUrl, name }: ContainerImageProps) {
  if (imageUrl)
    return (
      <div className="w-full aspect-square rounded-lg overflow-hidden border border-border">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  return (
    <div className="w-full aspect-square rounded-lg bg-background-accent border border-border flex items-center justify-center">
      <Package className="h-16 w-16 text-text-secondary" />
    </div>
  );
}

export default ContainerImage;
