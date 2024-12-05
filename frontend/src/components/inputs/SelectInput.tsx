import {useState } from "react";
import InputHeader from "./InputHeader";

type propsType = {
    selectInput: string;
    setSelectInput: (value: string) => void;
    data: string[];
    name: string;
}

function SelectInput({selectInput, setSelectInput, data, name}: propsType) {
    const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="text-[#787777] w-full">
        {/* Field Header */}
        <InputHeader name={name} state={isSelected} setState={setIsSelected}/>

        {/* Field Children */}
        <div className={`${isSelected ? "block" : "hidden"} w-full`}>
            {data.map((model, inx) => 
                <div
                key={inx}
                className={`w-full box-border flex items-center pl-[20px] py-[10px] hover:bg-[#212121] ${selectInput === model ? "bg-[#2B3BFF] hover:bg-[#2B3BFF] text-white": ""} cursor-pointer`}
                onClick={() => {
                    if(selectInput === model){
                        setSelectInput("");
                        return;
                    }
                    setSelectInput(model);
                }}
                >
                    {model}
                </div>
            )}
        </div>
    </div>
  )
}

export default SelectInput;