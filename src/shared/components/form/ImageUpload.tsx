import { Upload, X } from "lucide-react";
import { ClassAttributes, InputHTMLAttributes, useRef, useState } from "react";
import useMedia from "../../hooks/useMedia";
import { FieldHookConfig, useField } from "formik";
import { Maybe } from "yup";
import imageCompression from "browser-image-compression";
import Label from "./Label";
import { Button } from "../ui/Button";

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

  const { uploadMedia, loadingUploadMedia } = useMedia();

  const handleFileChange = async (file: File | null) => {
    if (file && file.size <= 20 * 1024 * 1024) {
      // 2MB limit
      setImageisLoading?.(true);

      const options = {
        maxSizeMB: 1, // compress to ~1 MB
        maxWidthOrHeight: 1500, // resize large photos
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);

        // Use this for uploading
        uploadMedia(
          compressedFile,
          (publicId) => {
            setValue(publicId);
            setImageisLoading?.(false);
          },
          () => {
            setImageisLoading?.(false);
            setPhotoPreview(null);
            setError("Failed to upload image, please try again.");
          }
        );

        // Use this for showing a preview
        // const preview = URL.createObjectURL(compressedFile);
        // setPhotoPreview(preview);
      } catch (error) {
        console.error("Compression error:", error);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("File size must be less than 20MB");
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
      <Label htmlFor={field.name}>Photo</Label>
      {photoPreview ? (
        <div className="relative">
          <img
            src={photoPreview ?? ""}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg border border-border dark:border-border-dark"
          />
          {loadingUploadMedia ? (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg">
              <div className="h-8 w-8 border-4 border-primary dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-sm mt-2">Uploading...</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 p-1 bg-background-surface rounded-full border border-border dark:border-border-dark hover:bg-background-accent transition-colors"
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
              ? "border-primary dark:border-primary-dark bg-primary-surface dark:bg-primary-dark-surface"
              : "border-border dark:border-border-dark bg-background-accent dark:bg-input/5"
          }`}
        >
          <Upload className="h-12 w-12 text-text-secondary dark:text-text-dark-secondary mx-auto mb-4" />
          <div className="space-y-2">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="hover:bg-primary-hover"
            >
              Upload Photo
            </Button>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              or drag & drop
            </p>
            <p className="text-text-secondary dark:text-text-dark-secondary">
              Max size 20MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            {...field}
            {...props}
            value={field.value ?? ""}
            type="file"
            accept="image/*"
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFileChange(e.target.files?.[0] || null);
            }}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
