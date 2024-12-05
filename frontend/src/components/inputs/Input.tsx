import { useState } from "react";
import InputHeader from "./InputHeader";

type InputProps = {
  Tag: React.ElementType;
  name: string
}

function Input({Tag, name} : InputProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="text-[#787777] w-full">
        {/* Field Header */}
        <InputHeader name={name} state={isSelected} setState={setIsSelected}/>

        {/* Field Children */}
        <div className={`${isSelected ? "block" : "hidden"} w-full`}>
          <div className={`w-full flex box-border px-[20px] py-[10px] hover:bg-[#212121]}`}>
            <Tag/>
          </div>
        </div>
    </div>
  )
}

export default Input