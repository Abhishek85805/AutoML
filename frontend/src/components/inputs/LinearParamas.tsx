import InputContext from "@/context/InputContext"
import CheckboxInput from "./CheckboxInput"
import Input from "./Input"
import {useContext} from 'react'

function LinearParamas() {
    const val = useContext(InputContext);
    if(!val) return;

    const fitIntercept = val.fitIntercept;
    const setFitIntercept = val.setFitIntercept;
    const copyX = val.copyX;
    const setCopyX = val.setCopyX;
  return (
    <div>
        <Input name="Fit Intercept" Tag={() => <CheckboxInput state={fitIntercept} setState={setFitIntercept} name={"fit_intercept"}/>}/>
        <Input name="Copy X" Tag={() => <CheckboxInput state={copyX} setState={setCopyX} name={"copy_X"}/>}/>
    </div>
  )
}

export default LinearParamas