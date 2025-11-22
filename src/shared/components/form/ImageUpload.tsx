import { Upload, X } from "lucide-react";
import { ClassAttributes, InputHTMLAttributes, useRef, useState } from "react";
import useMedia from "../../hooks/useMedia";
import { FieldHookConfig, useField } from "formik";
import { Maybe } from "yup";

type ImageUploadProps = {
  imageUrl?: Maybe<string>;
  setImageisLoading?: (isLoading: boolean) => void;
};
function ImageUpload({
  imageUrl,
  setImageisLoading,
  ...props
}: InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string> &
  ImageUploadProps) {
  //   const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    imageUrl ? imageUrl : null
  );
  const [isDragging, setIsDragging] = useState<boolean>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [field, _, { setValue, setError }] = useField(props.name);

  // TODO: add error handling
  const { uploadMedia, loadingUploadMedia } = useMedia();

  const handleFileChange = (file: File | null) => {
    if (file && file.size <= 2 * 1024 * 1024) {
      // 2MB limit
      //   setPhoto(file);

      setImageisLoading?.(true);
      uploadMedia(
        file,
        (publicId) => {
          setValue(publicId);
          setImageisLoading?.(false);
        },
        () => {
          console.log("Error");
          setImageisLoading?.(false);
          setPhotoPreview(null);
          setError("Failed to upload image, please try again.");
        }
      );
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("File size must be less than 2MB");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file);
    }
  };

  const handleRemovePhoto = () => {
    setValue(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="space-y-2">
      <label
        htmlFor={field.name}
        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:pointer-events-none peer-disabled:opacity-50"
      >
        Photo
      </label>
      {photoPreview ? (
        <div className="relative">
          <img
            src={photoPreview ?? ""}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          {loadingUploadMedia ? (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-sm mt-2">Uploading...</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 p-1 bg-background-surface rounded-full border border-border hover:bg-background-accent transition-colors"
            >
              <X className="h-4 w-4 text-text-primary" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary-surface"
              : "border-border bg-background-accent"
          }`}
        >
          <Upload className="h-12 w-12 text-text-secondary mx-auto mb-4" />
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-text-inverse rounded-lg transition-colors"
            >
              Upload Photo
            </button>
            <p className="text-text-secondary">or drag & drop</p>
            <p className="text-text-secondary">Max size 2MB</p>
          </div>
          <input
            ref={fileInputRef}
            {...field}
            {...props}
            value={field.value ?? ""}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
