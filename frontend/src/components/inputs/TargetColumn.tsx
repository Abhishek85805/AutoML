import InputContext from '@/context/InputContext';
import { useContext} from 'react'

function TargetColumn() {
    const val = useContext(InputContext)

    if (!val) {
      throw new Error("TargetColumn must be used within an InputContextProvider");
    }

  return (
    <div className='w-full'>
        <input type="text" 
        className='bg-[#171717] rounded-md focus:outline-none border-[#212121] border-[2px] placeholder:text-sm pb-[5px] placeholder:text-[#424242] pl-[10px] w-full'
        placeholder='Write the name of target column'
        value={val.targetColumn}
        onChange={(e) => val.setTargetColumn(e.target.value)}
        />
    </div>
  )
}

export default TargetColumn