import { createContext } from "react";

type BlobType = {
    blob: Blob | null;
    setBlob: (value:Blob) => void;
}

const BlobFileContext = createContext<null | BlobType>(null);

export default BlobFileContext;