import { ChangeEvent, useContext} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputContext from "@/context/InputContext";


function CsvUpload() {
    const val = useContext(InputContext);
    if(!val){
      throw new Error("File must be used within an InputContextProvider");
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(!e.target.files) return;
        console.log(e.target.files[0]);
        val.setFile(e.target.files[0]);
    }
  return (
    <div className="w-full">
        <div className="flex w-full justify-between">
          <p>
            {val.file ? val.file.name : "Choose File"}
          </p>
          <label htmlFor="file-upload" className="cursor-pointer">
            <FontAwesomeIcon icon={faPlus} />
          </label>
        </div>
        <input className="hidden" id="file-upload" type="file" accept=".csv" onChange={handleFileChange} required />
    </div>
  )
}

export default CsvUpload