import React from 'react';
import { toast } from 'sonner';

interface DownloadButtonProps {
  blobData: Blob | null;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ blobData, fileName }) => {
  const handleDownload = () => {
    // Create a URL for the Blob data
    if(!blobData){
        toast.error("No file available for download. Please generate or upload the file first.")
        return;
    }
    const url = window.URL.createObjectURL(blobData);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Set the file name for download

    // Trigger the download
    link.click();

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} style={buttonStyles}
    className={`${!blobData ? 'bg-[#757575] text-black' : 'bg-[#2B3BFF] text-[#ffff]'} font-bold hover:scale-105 transition-all ease-linear`}>
      Download File
    </button>
  );
};

// Optional: Inline button styling
const buttonStyles: React.CSSProperties = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default DownloadButton;