import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type inputHeaderTypes = {
  name: string;
  state: boolean;
  setState: (value: boolean) => void;
}

function InputHeader({name, state, setState} : inputHeaderTypes) {
  return (
    <div
    className="border border-[#212121] p-[1rem] text-[#787777] text-[1.2rem] font-semibold flex justify-between items-center box-border"
    >
        <p>{name}</p>
        <FontAwesomeIcon
        icon={faChevronDown}
        className={`transition-transform duration-200 ${!state ? "rotate-90" : "rotate-0"} cursor-pointer`}
        onClick={()=>setState(!state)}
        />
    </div>
  )
}

export default InputHeader