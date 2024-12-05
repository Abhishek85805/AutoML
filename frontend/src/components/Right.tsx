import BlobFileContext from "@/context/BlobFileContext";
import DownloadButton from "./DownloadButton";
import { useContext } from "react";

function Right(){
  const val = useContext(BlobFileContext);
  if(!val) return;

  const blob = val.blob;
    return (
      <div className="w-[75vw] h-full bg-[#212121] flex justify-center items-center">
        <DownloadButton blobData={blob} fileName={"file.pkl"}/>
      </div>
    )
}

export default Right;