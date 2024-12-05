import Right from "@/components/Right";
import Lefty from "@/components/Lefty";
import BlobFileContext from "@/context/BlobFileContext";
import { useState } from "react";

function Dashboard() {
  const [blob, setBlob] = useState<Blob | null>(null);
  return (
    <div className="h-screen flex">
      <BlobFileContext.Provider value={{blob, setBlob}}>
        <Lefty/>
        <Right/>
      </BlobFileContext.Provider>
    </div>
  );
}

export default Dashboard;
