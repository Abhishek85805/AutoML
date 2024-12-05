type NumberInputType = {
    step: number;
    state: number;
    setState: (value: number) => void;
}

function NumberInput({step, state, setState}: NumberInputType) {
  return (
    <div className="w-full">
        <input 
        type="number" 
        step={step} 
        className='bg-[#171717] rounded-md focus:outline-none border-[#212121] border-[2px] placeholder:text-sm pb-[5px] placeholder:text-[#424242] pl-[10px] w-full'
        placeholder='Enter the value'
        value={state}
        onChange={(e)=>setState(Number(e.target.value))}
        />
    </div>
  )
}

export default NumberInput