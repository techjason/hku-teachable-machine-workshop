"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface DownloadButtonProps {
  url: string;
  label: string;
}

export function DownloadButton({ url, label }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Start the download
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = url.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success toast
      toast.success("Download started successfully!", {
        description: "Your file is being downloaded.",
        duration: 3000,
      });
    } catch (error) {
      // Show error toast
      toast.error("Download failed", {
        description: "Please try again later.",
        duration: 3000,
      });
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloading} className="mb-4">
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? "Downloading..." : label}
    </Button>
  );
}
