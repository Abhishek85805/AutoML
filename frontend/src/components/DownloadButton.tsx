import React from 'react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from '@fortawesome/free-solid-svg-icons';

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
    <div
    className={`${!blobData ? 'bg-[#757575] text-black' : 'bg-[#2B3BFF] text-[#ffff]'} font-bold hover:scale-105 transition-all duration-200 ease-linear rounded-md px-[1.5rem] py-[15px] border-none cursor-pointer text-[1.5rem] `}
    onClick={handleDownload}
    >
      <FontAwesomeIcon icon={faDownload} />
      <button className='pl-[5px]'>
        Download File
      </button>
    </div>
  );
};

export default DownloadButton;