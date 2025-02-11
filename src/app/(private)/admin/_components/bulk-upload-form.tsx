"use client";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface BulkUploadFormProps {
  onSuccess: () => Promise<void>;
}

export function BulkUploadForm({ onSuccess }: BulkUploadFormProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles([...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("images", file);
        const fileName =
          file.path?.split("/")?.pop()?.split("\\")?.pop()?.split(".")[0] ||
          file.name.split(".")[0];
        formData.append(`titles`, fileName);
      });

      const response = await fetch("/api/gallery/bulk-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();

      if (result.success) {
        toast.success(
          `Successfully uploaded ${files.length} ${
            files.length > 1 ? "images" : "image"
          }`
        );
        setFiles([]);
        await onSuccess();
      } else {
        toast.error(result.error || "Failed to upload images");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary"
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag & drop images here, or click to select
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supports: JPG, PNG, WebP • Max 5MB per file
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4 ">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-h-[300px] overflow-y-auto overflow-x-hidden py-4 px-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading
                ? `Uploading ${files.length} images...`
                : `Upload ${files.length} ${
                    files.length > 1 ? "images" : "image"
                  }`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
