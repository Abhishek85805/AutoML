type CheckboxType = {
    state: boolean;
    setState: (value: boolean) => void;
    name: string;
}
function CheckboxInput({state, setState, name}:CheckboxType) {
  return (
    <div className="w-full flex items-center">
        <label className="flex items-center space-x-2">
            <input 
                type="checkbox" 
                className="hidden peer"
                checked = {state}
                onChange={(e)=>setState(e.target.checked)}
            />
            <div className="w-5 h-5 bg-[#272727] border border-[#424242] rounded peer-checked:bg-[#2B3BFF] peer-checked:border-[#2B3BFF]"></div>
            <span>{name}</span>
        </label>
    </div>
  )
}

export default CheckboxInput